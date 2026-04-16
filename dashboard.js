// dashboard.js — Full portfolio tracker with emissions, risk, ESG, and initiatives
import { PORTCOS, FACILITIES, TRAJECTORY, SCOPE1_SOURCES, INITIATIVES, RISK_SUMMARY, ESG_SCORES } from './data.js';

const SCOPE1_COLOR = '#e8724c';
const SCOPE2_COLOR = '#58a6ff';
const TARGET_COLOR = '#5bb8a4';

let portfolioChart = null;
let detailChart = null;
let sourceChart = null;

// ─── Helpers ───

function annualize(quarters) {
  const actuals = quarters.filter(q => q.actual);
  const recent = actuals.slice(-4);
  return recent.reduce((s, q) => s + q.scope1 + q.scope2, 0);
}

function latestActual(quarters) {
  const actuals = quarters.filter(q => q.actual);
  return actuals[actuals.length - 1];
}

function targetQuarterly(baseTotal, targetTotal, quarters) {
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
  const yearsElapsed = 1.5;
  const totalYears = p.targetYear - p.baseYear;
  const expectedReduction = (baseAnnual - targetAnnual) * (yearsElapsed / totalYears);
  const expectedNow = baseAnnual - expectedReduction;
  const variance = (ltm - expectedNow) / expectedNow;
  if (variance <= 0.02) return 'green';
  if (variance <= 0.08) return 'yellow';
  return 'red';
}

function riskColor(level) {
  const map = { 'Critical': 'red', 'High': 'red', 'Elevated': 'yellow', 'Moderate': 'yellow', 'Low': 'green', 'Tailwind': 'green' };
  return map[level] || 'yellow';
}

function physicalRiskColor(level) {
  const map = { 'High': 'red', 'Medium': 'yellow', 'Low': 'green' };
  return map[level] || 'yellow';
}

function esgColor(composite) {
  if (composite <= 2.0) return 'green';
  if (composite <= 3.0) return 'yellow';
  return 'red';
}

function gradeColor(grade) {
  if (grade === 'A') return 'green';
  if (grade === 'B') return 'yellow';
  return 'red';
}

// ─── Portfolio View ───

export function renderPortfolio() {
  const slugs = Object.keys(PORTCOS);
  let totalBase = 0, totalTarget = 0, totalLTM = 0;
  let totalRevenue = 0, totalEbitda = 0;
  let totalInits = 0, inProgress = 0;

  for (const slug of slugs) {
    const t = TRAJECTORY[slug];
    const p = PORTCOS[slug];
    totalBase += t.baseYearTotal;
    totalTarget += t.target2030;
    totalLTM += annualize(t.quarters);
    totalRevenue += p.revenue;
    totalEbitda += p.ebitda;
    totalInits += INITIATIVES[slug].length;
    inProgress += INITIATIVES[slug].filter(i => i.status === 'in_progress').length;
  }

  const pctReduction = ((totalBase - totalLTM) / totalBase * 100);
  const portfolioIntensity = (totalLTM / totalRevenue).toFixed(1);

  // Count risk levels
  const criticalHigh = slugs.filter(s => ['Critical', 'High'].includes(RISK_SUMMARY[s].transition.overall)).length;
  const avgESG = (slugs.reduce((s, slug) => s + ESG_SCORES[slug].composite, 0) / slugs.length).toFixed(1);

  // Hero cards
  document.getElementById('heroRow').innerHTML = `
    <div class="hero-card">
      <div class="hero-label">Portfolio Emissions (LTM)</div>
      <div class="hero-value">${totalLTM.toLocaleString()}</div>
      <div class="hero-sub">tCO2e · Scope 1 + 2 · ${slugs.length} companies</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">vs. Base Year</div>
      <div class="hero-value" style="color:${pctReduction > 0 ? 'var(--green)' : 'var(--red)'}">${pctReduction > 0 ? '' : '+'}${pctReduction.toFixed(1)}%</div>
      <div class="hero-sub">${totalBase.toLocaleString()} tCO2e (2024) · ${portfolioIntensity} tCO2e/$M</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">Transition Risk</div>
      <div class="hero-value" style="color:${criticalHigh > 2 ? 'var(--red)' : 'var(--yellow)'}">${criticalHigh}</div>
      <div class="hero-sub">companies at Critical / High risk</div>
    </div>
    <div class="hero-card">
      <div class="hero-label">ESG Composite</div>
      <div class="hero-value" style="color:var(--${esgColor(parseFloat(avgESG))})">${avgESG}</div>
      <div class="hero-sub">portfolio avg · ${inProgress} initiatives in progress</div>
    </div>
  `;

  // Portfolio gap chart
  renderPortfolioGapChart(slugs);

  // Portco cards
  const grid = document.getElementById('portcoGrid');
  grid.innerHTML = slugs.map(slug => {
    const p = PORTCOS[slug];
    const t = TRAJECTORY[slug];
    const risk = RISK_SUMMARY[slug];
    const esg = ESG_SCORES[slug];
    const ltm = annualize(t.quarters);
    const latest = latestActual(t.quarters);
    const rag = ragForTrajectory(slug);
    const ragLabel = rag === 'green' ? 'On Track' : rag === 'yellow' ? 'Watch' : 'Off Track';
    const s1Pct = latest.scope1 / (latest.scope1 + latest.scope2) * 100;
    const intensity = (ltm / p.revenue).toFixed(1);

    return `
    <div class="portco-card" onclick="showDetail('${slug}')">
      <div class="card-top">
        <div>
          <div class="card-name">${p.name}</div>
          <div class="card-sector">${p.sector} · ${p.fund} · ${p.status}</div>
        </div>
        <span class="card-badge badge-${rag}">${ragLabel}</span>
      </div>
      <div class="card-metrics-row">
        <div class="card-metric">
          <div class="card-metric-label">LTM</div>
          <div class="card-metric-value">${ltm.toLocaleString()}</div>
        </div>
        <div class="card-metric">
          <div class="card-metric-label">Intensity</div>
          <div class="card-metric-value">${intensity}</div>
        </div>
        <div class="card-metric">
          <div class="card-metric-label">ESG</div>
          <div class="card-metric-value" style="color:var(--${esgColor(esg.composite)})">${esg.composite}</div>
        </div>
        <div class="card-metric">
          <div class="card-metric-label">Data</div>
          <div class="card-metric-value" style="color:var(--${gradeColor(p.dataGrade)})">${p.dataGrade}</div>
        </div>
      </div>
      <div class="card-risk-row">
        <span class="risk-pill pill-${physicalRiskColor(risk.physical.level)}">Phys: ${risk.physical.level}</span>
        <span class="risk-pill pill-${riskColor(risk.transition.overall)}">Trans: ${risk.transition.overall}</span>
      </div>
      <div class="card-bar">
        <div class="card-bar-label">
          <span>S1 / S2</span>
          <span>${s1Pct.toFixed(0)}% / ${(100 - s1Pct).toFixed(0)}%</span>
        </div>
        <div class="card-bar-track">
          <div class="card-bar-s1" style="width:${s1Pct}%"></div>
          <div class="card-bar-s2" style="width:${100 - s1Pct}%"></div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderPortfolioGapChart(slugs) {
  const canvas = document.getElementById('portfolioGapChart');
  if (portfolioChart) portfolioChart.destroy();

  const allQuarters = TRAJECTORY[slugs[0]].quarters.map(q => q.q);
  const s1Actuals = [], s2Actuals = [], s1Forecasts = [], s2Forecasts = [], targets = [];

  const totalBase = slugs.reduce((s, slug) => s + TRAJECTORY[slug].baseYearTotal, 0);
  const totalTarget = slugs.reduce((s, slug) => s + TRAJECTORY[slug].target2030, 0);
  const targetLine = targetQuarterly(totalBase, totalTarget, allQuarters);

  allQuarters.forEach((q, i) => {
    let s1 = 0, s2 = 0, isActual = true;
    slugs.forEach(slug => {
      const qd = TRAJECTORY[slug].quarters[i];
      s1 += qd.scope1; s2 += qd.scope2;
      if (!qd.actual) isActual = false;
    });
    if (isActual) {
      s1Actuals.push(s1); s2Actuals.push(s2);
      s1Forecasts.push(null); s2Forecasts.push(null);
    } else {
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
  const facs = FACILITIES[slug] || [];
  const sources = SCOPE1_SOURCES[slug];
  const inits = INITIATIVES[slug];
  const risk = RISK_SUMMARY[slug];
  const esg = ESG_SCORES[slug];

  const ltm = annualize(t.quarters);
  const pctFromBase = ((t.baseYearTotal - ltm) / t.baseYearTotal * 100);
  const intensity = (ltm / p.revenue).toFixed(1);
  const plannedReduction = inits.reduce((s, i) => s + i.estReduction, 0);

  document.getElementById('detailTitle').textContent = p.name;
  document.getElementById('detailMeta').innerHTML =
    `${p.sector} · ${p.fund} · ${p.status} · ${p.facilities} facilities · $${p.revenue}M rev · $${p.ebitda}M EBITDA · ${p.moic}x MOIC` +
    `<span class="grade-badge grade-${p.dataGrade.toLowerCase()}">Grade ${p.dataGrade}</span>` +
    `<span class="grade-note">${p.dataNote}</span>`;
  document.getElementById('detailChartSub').textContent =
    `Base year ${p.baseYear}: ${t.baseYearTotal.toLocaleString()} tCO2e → Target ${p.targetYear}: ${t.target2030.toLocaleString()} tCO2e (${p.targetReduction}% reduction)`;

  // Hero
  document.getElementById('detailHero').innerHTML = `
    <div class="hero-card">
      <div class="hero-label">LTM Emissions</div>
      <div class="hero-value">${ltm.toLocaleString()}</div>
      <div class="hero-sub">tCO2e · Scope 1 + 2</div>
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

  // Risk + ESG summary panel
  const riskPanel = document.getElementById('riskEsgPanel');
  if (riskPanel) {
    const vectors = risk.transition.vectors;
    const vectorLabels = { customerESG: 'Customer ESG', inputSupply: 'Input / Supply', capexCycle: 'Capex Cycle', regulatory: 'Regulatory', exitRefi: 'Exit / Refi' };
    const esgLabels = { e1: 'Physical Risk', e2: 'Transition Risk', e3: 'Env. Liability', s1: 'Labor & Safety', s2: 'Workforce', s3: 'Community', g1: 'Board Oversight', g2: 'Data & Cyber' };

    riskPanel.innerHTML = `
      <div class="risk-esg-grid">
        <div class="risk-panel">
          <h4>Risk Profile</h4>
          <div class="risk-summary-row">
            <div class="risk-summary-item">
              <div class="risk-summary-label">Physical Risk</div>
              <span class="risk-pill pill-${physicalRiskColor(risk.physical.level)}">${risk.physical.level}</span>
              <div class="risk-detail-line">Water: ${risk.physical.waterScore} · Heat: ${risk.physical.heatScore} · EV@Risk: $${risk.physical.evAtRisk}M</div>
            </div>
            <div class="risk-summary-item">
              <div class="risk-summary-label">Transition Risk</div>
              <span class="risk-pill pill-${riskColor(risk.transition.overall)}">${risk.transition.overall}</span>
              <div class="risk-detail-line">${risk.transition.topRisk}</div>
            </div>
          </div>
          <div class="vector-bars">
            ${Object.entries(vectors).map(([key, val]) => `
              <div class="vector-bar-row">
                <span class="vector-label">${vectorLabels[key]}</span>
                <div class="vector-bar-track">
                  <div class="vector-bar-fill" style="width:${val * 20}%;background:var(--${val >= 4 ? 'red' : val >= 3 ? 'yellow' : 'green'})"></div>
                </div>
                <span class="vector-score">${val}/5</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="esg-panel">
          <h4>ESG Scorecard</h4>
          <div class="esg-composite">
            <span class="esg-composite-value" style="color:var(--${esgColor(esg.composite)})">${esg.composite}</span>
            <span class="esg-composite-label">${esg.riskLevel} Risk</span>
          </div>
          <div class="esg-dimension-grid">
            ${Object.entries(esgLabels).map(([key, label]) => {
              const val = esg[key];
              const c = val >= 4 ? 'red' : val >= 3 ? 'yellow' : 'green';
              return `<div class="esg-dim"><span class="esg-dim-label">${label}</span><span class="esg-dim-score" style="color:var(--${c})">${val}</span></div>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Gap chart
  renderDetailGapChart(slug);

  // Source breakdown
  renderSourceChart(slug, sources);

  // Facility table
  const totalFac = facs.reduce((s, f) => s + f.total, 0);
  document.getElementById('facilityTable').innerHTML = totalFac > 0 ? `
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
  ` : `<tbody><tr><td colspan="6" style="padding:20px;color:var(--text-dim);text-align:center">Facility-level data available in full climate dashboard</td></tr></tbody>`;

  // Initiatives
  const statusOrder = { in_progress: 0, planned: 1, complete: 2 };
  const sorted = [...inits].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  document.getElementById('initList').innerHTML = sorted.map(i => {
    const abatementCost = i.capex > 0 && i.estReduction > 0 ? `$${Math.round(i.capex * 1000 / i.estReduction)}/tCO2e` : i.capex === 0 ? '$0/tCO2e' : '';
    return `
    <div class="init-row">
      <span class="init-status status-${i.status}">${i.status.replace('_', ' ')}</span>
      <span class="init-name">${i.name}</span>
      <span class="init-meta">${i.category} · ${i.startDate}${i.capex ? ` · $${i.capex}K` : ''}${abatementCost ? ` · ${abatementCost}` : ''}</span>
      <span class="init-reduction">-${i.estReduction} tCO2e</span>
    </div>`;
  }).join('');
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
        { label: 'Scope 1 (Actual)', data: s1Act, backgroundColor: SCOPE1_COLOR, stack: 'actual', borderRadius: 2, barPercentage: 0.7 },
        { label: 'Scope 2 (Actual)', data: s2Act, backgroundColor: SCOPE2_COLOR, stack: 'actual', borderRadius: 2, barPercentage: 0.7 },
        { label: 'Scope 1 (Forecast)', data: s1Fore, backgroundColor: SCOPE1_COLOR + '55', stack: 'forecast', borderRadius: 2, barPercentage: 0.7 },
        { label: 'Scope 2 (Forecast)', data: s2Fore, backgroundColor: SCOPE2_COLOR + '55', stack: 'forecast', borderRadius: 2, barPercentage: 0.7 },
        { label: 'Target Pathway', data: targetLine, type: 'line', borderColor: TARGET_COLOR, borderWidth: 2, borderDash: [6, 4], pointRadius: 0, fill: false, tension: 0.3, order: 0 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { stacked: true, ticks: { color: '#5a5e72', font: { size: 10 } }, grid: { display: false } },
        y: {
          stacked: true,
          ticks: { color: '#5a5e72', font: { size: 10 }, callback: v => v.toLocaleString() },
          grid: { color: '#2e334522' },
          title: { display: true, text: 'tCO2e', color: '#5a5e72', font: { size: 10 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1d27', borderColor: '#2e3345', borderWidth: 1,
          titleColor: '#e2e4ea', bodyColor: '#8b8fa3',
          callbacks: { label: (ctx) => ctx.raw === null ? null : `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} tCO2e` }
        }
      }
    }
  };
}
