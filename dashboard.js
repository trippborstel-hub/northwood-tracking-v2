// dashboard.js — Emissions-focused portfolio + detail rendering
import { PORTCOS, FACILITIES, TRAJECTORY, SCOPE1_SOURCES, INITIATIVES } from './data.js';

const SCOPE1_COLOR = '#e8724c';
const SCOPE2_COLOR = '#58a6ff';
const TARGET_COLOR = '#5bb8a4';

let portfolioChart = null;
let detailChart = null;
let sourceChart = null;

// ─── Helpers ───

function annualize(quarters) {
  // Sum the most recent 4 actual quarters
  const actuals = quarters.filter(q => q.actual);
  const recent = actuals.slice(-4);
  return recent.reduce((s, q) => s + q.scope1 + q.scope2, 0);
}

function latestActual(quarters) {
  const actuals = quarters.filter(q => q.actual);
  return actuals[actuals.length - 1];
}

function targetQuarterly(baseTotal, targetTotal, quarters) {
  // Linear interpolation from base year to target year
  const baseQ = baseTotal / 4;
  const targetQ = targetTotal / 4;
  const totalQs = quarters.length;
  return quarters.map((_, i) => baseQ + (targetQ - baseQ) * (i / (totalQs - 1)));
}

function ragForTrajectory(slug) {
  const t = TRAJECTORY[slug];
  const p = PORTCOS[slug];
  const ltm = annualize(t.quarters);
  const targetAnnual = t.target2030;
  const baseAnnual = t.baseYearTotal;
  // How far along the reduction path should we be? (linear, proportional to time elapsed)
  const yearsElapsed = 1.5; // mid-2025 relative to 2024 base
  const totalYears = p.targetYear - p.baseYear;
  const expectedReduction = (baseAnnual - targetAnnual) * (yearsElapsed / totalYears);
  const expectedNow = baseAnnual - expectedReduction;
  const variance = (ltm - expectedNow) / expectedNow;
  if (variance <= 0.02) return 'green';
  if (variance <= 0.08) return 'yellow';
  return 'red';
}

// ─── Portfolio View ───

export function renderPortfolio() {
  // Aggregate portfolio totals
  let totalScope1 = 0, totalScope2 = 0, totalBase = 0, totalTarget = 0;
  const slugs = Object.keys(PORTCOS);

  for (const slug of slugs) {
    const t = TRAJECTORY[slug];
    const latest = latestActual(t.quarters);
    totalScope1 += latest.scope1;
    totalScope2 += latest.scope2;
    totalBase += t.baseYearTotal;
    totalTarget += t.target2030;
  }

  const totalLTM = slugs.reduce((s, slug) => s + annualize(TRAJECTORY[slug].quarters), 0);
  const totalInitiatives = slugs.reduce((s, slug) => s + INITIATIVES[slug].length, 0);
  const inProgress = slugs.reduce((s, slug) => s + INITIATIVES[slug].filter(i => i.status === 'in_progress').length, 0);
  const pctReduction = ((totalBase - totalLTM) / totalBase * 100);

  // Hero cards
  document.getElementById('heroRow').innerHTML = `
    <div class="hero-card">
      <div class="hero-label">Portfolio Emissions (LTM)</div>
      <div class="hero-value">${totalLTM.toLocaleString()}</div>
      <div class="hero-sub">tCO2e &middot; Scope 1 + 2</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">vs. Base Year</div>
      <div class="hero-value" style="color:${pctReduction > 0 ? 'var(--green)' : 'var(--red)'}">${pctReduction > 0 ? '' : '+'}${pctReduction.toFixed(1)}%</div>
      <div class="hero-sub">${totalBase.toLocaleString()} tCO2e (${PORTCOS.meridian.baseYear})</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">2030 Target</div>
      <div class="hero-value">${totalTarget.toLocaleString()}</div>
      <div class="hero-sub">tCO2e &middot; 42% reduction</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">Active Initiatives</div>
      <div class="hero-value">${inProgress} <span style="font-size:14px;color:var(--text-muted)">/ ${totalInitiatives}</span></div>
      <div class="hero-sub">${inProgress} in progress</div>
    </div>
  `;

  // Portfolio gap chart
  renderPortfolioGapChart(slugs);

  // Portco cards
  const grid = document.getElementById('portcoGrid');
  grid.innerHTML = slugs.map(slug => {
    const p = PORTCOS[slug];
    const t = TRAJECTORY[slug];
    const ltm = annualize(t.quarters);
    const latest = latestActual(t.quarters);
    const rag = ragForTrajectory(slug);
    const ragLabel = rag === 'green' ? 'On Track' : rag === 'yellow' ? 'Watch' : 'Off Track';
    const s1Pct = latest.scope1 / (latest.scope1 + latest.scope2) * 100;
    const pctDone = ((t.baseYearTotal - ltm) / (t.baseYearTotal - t.target2030) * 100);
    const intensity = (ltm / p.revenue).toFixed(1);

    return `
    <div class="portco-card" onclick="showDetail('${slug}')">
      <div class="card-top">
        <div>
          <div class="card-name">${p.name}</div>
          <div class="card-sector">${p.sector} &middot; ${p.status}</div>
        </div>
        <span class="card-badge badge-${rag}">${ragLabel}</span>
      </div>
      <div class="card-emissions">
        <div>
          <div class="card-metric-label">LTM Emissions</div>
          <div class="card-metric-value">${ltm.toLocaleString()}</div>
        </div>
        <div>
          <div class="card-metric-label">Intensity</div>
          <div class="card-metric-value">${intensity} <span style="font-size:11px;color:var(--text-muted)">tCO2e/$M</span></div>
        </div>
        <div>
          <div class="card-metric-label scope1-color">Scope 1</div>
          <div class="card-metric-value scope1-color">${(latest.scope1 * 4).toLocaleString()}</div>
        </div>
        <div>
          <div class="card-metric-label scope2-color">Scope 2</div>
          <div class="card-metric-value scope2-color">${(latest.scope2 * 4).toLocaleString()}</div>
        </div>
      </div>
      <div class="card-bar">
        <div class="card-bar-label">
          <span>Scope 1 / Scope 2 split</span>
          <span>${s1Pct.toFixed(0)}% / ${(100 - s1Pct).toFixed(0)}%</span>
        </div>
        <div class="card-bar-track">
          <div class="card-bar-s1" style="width:${s1Pct}%"></div>
          <div class="card-bar-s2" style="width:${100 - s1Pct}%"></div>
        </div>
      </div>
      <div class="card-target">
        <div class="card-target-dot" style="background:var(--${rag})"></div>
        ${pctDone > 0 ? `${pctDone.toFixed(0)}% toward 2030 target` : 'Emissions above base year'}
      </div>
    </div>`;
  }).join('');
}

function renderPortfolioGapChart(slugs) {
  const canvas = document.getElementById('portfolioGapChart');
  if (portfolioChart) portfolioChart.destroy();

  // Aggregate all portco quarters
  const allQuarters = TRAJECTORY[slugs[0]].quarters.map(q => q.q);
  const s1Actuals = [], s2Actuals = [], s1Forecasts = [], s2Forecasts = [], targets = [];

  const totalBase = slugs.reduce((s, slug) => s + TRAJECTORY[slug].baseYearTotal, 0);
  const totalTarget = slugs.reduce((s, slug) => s + TRAJECTORY[slug].target2030, 0);
  const targetLine = targetQuarterly(totalBase, totalTarget, allQuarters);

  allQuarters.forEach((q, i) => {
    let s1 = 0, s2 = 0;
    let isActual = true;
    slugs.forEach(slug => {
      const qd = TRAJECTORY[slug].quarters[i];
      s1 += qd.scope1;
      s2 += qd.scope2;
      if (!qd.actual) isActual = false;
    });
    if (isActual) {
      s1Actuals.push(s1); s2Actuals.push(s2);
      s1Forecasts.push(null); s2Forecasts.push(null);
    } else {
      // Bridge: repeat last actual in forecast for continuity
      if (s1Actuals.length > 0 && s1Forecasts.filter(v => v !== null).length === 0) {
        s1Forecasts[s1Actuals.length - 1] = s1Actuals[s1Actuals.length - 1];
        s2Forecasts[s2Actuals.length - 1] = s2Actuals[s2Actuals.length - 1];
      }
      s1Actuals.push(null); s2Actuals.push(null);
      s1Forecasts.push(s1); s2Forecasts.push(s2);
    }
    targets.push(targetLine[i]);
  });

  portfolioChart = new Chart(canvas, gapChartConfig(allQuarters, s1Actuals, s2Actuals, s1Forecasts, s2Forecasts, targets));
}

// ─── Detail View ───

export function renderDetail(slug) {
  const p = PORTCOS[slug];
  const t = TRAJECTORY[slug];
  const facs = FACILITIES[slug];
  const sources = SCOPE1_SOURCES[slug];
  const inits = INITIATIVES[slug];

  const ltm = annualize(t.quarters);
  const latest = latestActual(t.quarters);
  const rag = ragForTrajectory(slug);
  const pctFromBase = ((t.baseYearTotal - ltm) / t.baseYearTotal * 100);
  const intensity = (ltm / p.revenue).toFixed(1);
  const pctToTarget = ((t.baseYearTotal - ltm) / (t.baseYearTotal - t.target2030) * 100);
  const plannedReduction = inits.reduce((s, i) => s + i.estReduction, 0);

  document.getElementById('detailTitle').textContent = p.name;
  document.getElementById('detailMeta').textContent =
    `${p.sector} · ${p.fund} · ${p.facilities} facilities · Data Grade ${p.dataGrade} (${p.dataNote})`;
  document.getElementById('detailChartSub').textContent =
    `Base year ${p.baseYear}: ${t.baseYearTotal.toLocaleString()} tCO2e → Target ${p.targetYear}: ${t.target2030.toLocaleString()} tCO2e (${p.targetReduction}% reduction)`;

  // Hero
  document.getElementById('detailHero').innerHTML = `
    <div class="hero-card">
      <div class="hero-label">LTM Emissions</div>
      <div class="hero-value">${ltm.toLocaleString()}</div>
      <div class="hero-sub">tCO2e &middot; Scope 1 + 2</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">vs. Base Year</div>
      <div class="hero-value" style="color:${pctFromBase > 0 ? 'var(--green)' : 'var(--red)'}">${pctFromBase > 0 ? '' : '+'}${pctFromBase.toFixed(1)}%</div>
      <div class="hero-sub">${t.baseYearTotal.toLocaleString()} tCO2e (${p.baseYear})</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">Intensity</div>
      <div class="hero-value">${intensity}</div>
      <div class="hero-sub">tCO2e per $M revenue</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">Planned Reductions</div>
      <div class="hero-value">${plannedReduction.toLocaleString()}</div>
      <div class="hero-sub">tCO2e from ${inits.length} initiatives</div>
    </div>
  `;

  // Gap chart
  renderDetailGapChart(slug);

  // Source breakdown
  renderSourceChart(slug, sources);

  // Facility table
  const totalFac = facs.reduce((s, f) => s + f.total, 0);
  document.getElementById('facilityTable').innerHTML = `
    <thead><tr>
      <th>Facility</th><th>Location</th><th class="r">Scope 1</th><th class="r">Scope 2</th><th class="r">Total</th><th class="r">Share</th>
    </tr></thead>
    <tbody>${facs.sort((a, b) => b.total - a.total).map(f => {
      const share = (f.total / totalFac * 100);
      return `<tr>
        <td><strong>${f.name}</strong><br><span style="font-size:10px;color:var(--text-dim)">${f.type}</span></td>
        <td>${f.city}, ${f.state}</td>
        <td class="r scope1-color">${f.scope1.toLocaleString()}</td>
        <td class="r scope2-color">${f.scope2.toLocaleString()}</td>
        <td class="r"><strong>${f.total.toLocaleString()}</strong></td>
        <td class="r"><span class="pct-bar" style="width:${share}px;background:var(--accent)"></span>${share.toFixed(0)}%</td>
      </tr>`;
    }).join('')}</tbody>
  `;

  // Initiatives
  const statusOrder = { in_progress: 0, planned: 1, complete: 2 };
  const sorted = [...inits].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  document.getElementById('initList').innerHTML = sorted.map(i => `
    <div class="init-row">
      <span class="init-status status-${i.status}">${i.status.replace('_', ' ')}</span>
      <span class="init-name">${i.name}</span>
      <span class="init-meta">${i.category} &middot; ${i.startDate}${i.capex ? ` · $${i.capex}K` : ''}</span>
      <span class="init-reduction">-${i.estReduction} tCO2e</span>
    </div>
  `).join('');
}

function renderDetailGapChart(slug) {
  const canvas = document.getElementById('detailGapChart');
  if (detailChart) detailChart.destroy();

  const t = TRAJECTORY[slug];
  const quarters = t.quarters.map(q => q.q);
  const targetLine = targetQuarterly(t.baseYearTotal, t.target2030, quarters);

  const s1A = [], s2A = [], s1F = [], s2F = [], tgt = [];
  t.quarters.forEach((q, i) => {
    if (q.actual) {
      s1A.push(q.scope1); s2A.push(q.scope2);
      s1F.push(null); s2F.push(null);
    } else {
      if (s1A.length > 0 && s1F.filter(v => v !== null).length === 0) {
        s1F[s1A.length - 1] = s1A[s1A.length - 1];
        s2F[s2A.length - 1] = s2A[s2A.length - 1];
      }
      s1A.push(null); s2A.push(null);
      s1F.push(q.scope1); s2F.push(q.scope2);
    }
    tgt.push(targetLine[i]);
  });

  detailChart = new Chart(canvas, gapChartConfig(quarters, s1A, s2A, s1F, s2F, tgt));
}

function renderSourceChart(slug, sources) {
  const canvas = document.getElementById('sourceChart');
  if (sourceChart) sourceChart.destroy();

  const colors = ['#e8724c', '#f4a261', '#e9c46a', '#2a9d8f', '#264653', '#e76f51', '#606c38'];

  sourceChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: sources.map(s => s.source),
      datasets: [{
        data: sources.map(s => s.tco2e),
        backgroundColor: colors.slice(0, sources.length),
        borderWidth: 0,
        borderRadius: 2,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#8b8fa3', font: { size: 11 }, padding: 10, boxWidth: 12, boxHeight: 8 }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.raw.toLocaleString()} tCO2e (${sources[ctx.dataIndex].pct}%)`
          }
        }
      }
    }
  });
}

// ─── Gap Chart Config ───

function gapChartConfig(labels, s1Act, s2Act, s1Fore, s2Fore, targetLine) {
  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Scope 1 (Actual)',
          data: s1Act,
          backgroundColor: SCOPE1_COLOR,
          stack: 'actual',
          borderRadius: 2,
          barPercentage: 0.7,
        },
        {
          label: 'Scope 2 (Actual)',
          data: s2Act,
          backgroundColor: SCOPE2_COLOR,
          stack: 'actual',
          borderRadius: 2,
          barPercentage: 0.7,
        },
        {
          label: 'Scope 1 (Forecast)',
          data: s1Fore,
          backgroundColor: SCOPE1_COLOR + '55',
          stack: 'forecast',
          borderRadius: 2,
          barPercentage: 0.7,
        },
        {
          label: 'Scope 2 (Forecast)',
          data: s2Fore,
          backgroundColor: SCOPE2_COLOR + '55',
          stack: 'forecast',
          borderRadius: 2,
          barPercentage: 0.7,
        },
        {
          label: 'Target Pathway',
          data: targetLine,
          type: 'line',
          borderColor: TARGET_COLOR,
          borderWidth: 2,
          borderDash: [6, 4],
          pointRadius: 0,
          fill: false,
          tension: 0.3,
          order: 0,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: {
          stacked: true,
          ticks: { color: '#5a5e72', font: { size: 10 } },
          grid: { display: false },
        },
        y: {
          stacked: true,
          ticks: {
            color: '#5a5e72',
            font: { size: 10 },
            callback: v => v.toLocaleString()
          },
          grid: { color: '#2e334522' },
          title: { display: true, text: 'tCO2e', color: '#5a5e72', font: { size: 10 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1d27',
          borderColor: '#2e3345',
          borderWidth: 1,
          titleColor: '#e2e4ea',
          bodyColor: '#8b8fa3',
          callbacks: {
            label: (ctx) => {
              if (ctx.raw === null) return null;
              return `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} tCO2e`;
            }
          }
        }
      }
    }
  };
}
