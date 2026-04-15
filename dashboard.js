// dashboard.js — Portfolio overview + portco detail rendering
import { PORTCOS, KPI_DEFS, QUARTERLY_DATA } from './data.js';

// --- Helpers ---

function fmt(value, format) {
  if (value == null) return '—';
  switch (format) {
    case 'money': return `$${value.toFixed(1)}`;
    case 'pct':   return `${value.toFixed(1)}%`;
    case 'int':   return value.toLocaleString();
    case 'dec1':  return value.toFixed(1);
    default:      return String(value);
  }
}

function variance(actual, budget) {
  if (!budget || budget === 0) return 0;
  return ((actual - budget) / Math.abs(budget)) * 100;
}

function ragStatus(varPct, direction) {
  // For "down" direction metrics (emissions, cost), negative variance = good
  const effective = direction === 'down' ? -varPct : varPct;
  if (effective >= 1) return 'green';
  if (effective >= -3) return 'yellow';
  return 'red';
}

function ragLabel(status) {
  return status === 'green' ? 'On Track' : status === 'yellow' ? 'Watch' : 'Off Track';
}

function varArrow(varPct, direction) {
  const effective = direction === 'down' ? -varPct : varPct;
  if (effective > 0.5) return '&#9650;'; // up triangle
  if (effective < -0.5) return '&#9660;'; // down triangle
  return '&#9644;'; // flat
}

// --- Portfolio Overview ---

export function renderPortfolio(quarter) {
  const container = document.getElementById('portfolioView');
  const slugs = Object.keys(PORTCOS);

  let html = '<div class="portfolio-grid">';

  for (const slug of slugs) {
    const p = PORTCOS[slug];
    const q = QUARTERLY_DATA[slug]?.[quarter];
    if (!q) continue;

    const fundClass = p.fund === 'Fund I' ? 'fund-i' : 'fund-ii';

    // Summary KPIs for card
    const revVar = variance(q.revenue.actual, q.revenue.budget);
    const ebitdaVar = variance(q.adj_ebitda.actual, q.adj_ebitda.budget);
    const emVar = variance(q.total_emissions.actual, q.total_emissions.budget);
    const intVar = variance(q.emissions_intensity.actual, q.emissions_intensity.budget);

    const revRag = ragStatus(revVar, 'up');
    const ebitdaRag = ragStatus(ebitdaVar, 'up');
    const emRag = ragStatus(emVar, 'down');
    const intRag = ragStatus(intVar, 'down');

    // Overall RAG — worst of the four
    const rags = [revRag, ebitdaRag, emRag, intRag];
    const overallRag = rags.includes('red') ? 'red' : rags.includes('yellow') ? 'yellow' : 'green';

    html += `
    <div class="portco-card" onclick="showDetail('${slug}')">
      <div class="card-header">
        <div>
          <div class="card-name">${p.name}</div>
          <div class="card-sector">${p.sector} &middot; ${p.status}</div>
        </div>
        <span class="card-fund ${fundClass}">${p.fund}</span>
      </div>
      <div class="card-kpis">
        <div>
          <div class="card-kpi-label">Revenue</div>
          <div class="card-kpi-value">$${q.revenue.actual.toFixed(1)}M</div>
          <div class="card-kpi-var rag-${revRag}">${varArrow(revVar, 'up')} ${revVar >= 0 ? '+' : ''}${revVar.toFixed(1)}% vs budget</div>
        </div>
        <div>
          <div class="card-kpi-label">Adj. EBITDA</div>
          <div class="card-kpi-value">$${q.adj_ebitda.actual.toFixed(1)}M</div>
          <div class="card-kpi-var rag-${ebitdaRag}">${varArrow(ebitdaVar, 'up')} ${ebitdaVar >= 0 ? '+' : ''}${ebitdaVar.toFixed(1)}% vs budget</div>
        </div>
        <div>
          <div class="card-kpi-label">Emissions</div>
          <div class="card-kpi-value">${q.total_emissions.actual.toLocaleString()}</div>
          <div class="card-kpi-var rag-${emRag}">${varArrow(emVar, 'down')} ${emVar >= 0 ? '+' : ''}${emVar.toFixed(1)}% vs budget</div>
        </div>
        <div>
          <div class="card-kpi-label">Intensity</div>
          <div class="card-kpi-value">${q.emissions_intensity.actual.toFixed(1)}</div>
          <div class="card-kpi-var rag-${intRag}">${varArrow(intVar, 'down')} ${intVar >= 0 ? '+' : ''}${intVar.toFixed(1)}% vs budget</div>
        </div>
      </div>
      <div class="rag-strip">
        <div class="rag-dot dot-${overallRag}"></div>
        <span class="rag-label rag-${overallRag}">${ragLabel(overallRag)}</span>
      </div>
    </div>`;
  }

  html += '</div>';
  container.innerHTML = html;
}

// --- Detail View ---

export function renderDetail(slug, quarter) {
  const p = PORTCOS[slug];
  const q = QUARTERLY_DATA[slug]?.[quarter];
  if (!p || !q) return;

  // Header
  document.getElementById('detailTitle').textContent = p.name;
  document.getElementById('detailMeta').textContent =
    `${p.sector} · ${p.fund} · ${p.status} · ${p.facilities} facilities · ${p.headcount} employees`;

  // Render financial KPIs
  const financialKeys = Object.keys(KPI_DEFS).filter(k => KPI_DEFS[k].category === 'financial');
  document.getElementById('financialKpis').innerHTML = financialKeys.map(k => kpiTile(k, q[k], quarter, slug)).join('');

  // Render climate KPIs
  const climateKeys = Object.keys(KPI_DEFS).filter(k => KPI_DEFS[k].category === 'climate');
  document.getElementById('climateKpis').innerHTML = climateKeys.map(k => kpiTile(k, q[k], quarter, slug)).join('');
}

function kpiTile(key, data, quarter, slug) {
  if (!data) return '';
  const def = KPI_DEFS[key];
  const varPct = variance(data.actual, data.budget);
  const rag = ragStatus(varPct, def.direction);
  const yoyPct = data.prior ? variance(data.actual, data.prior) : null;

  // Trend bars — show both quarters if available
  const quarters = ['Q3-2025', 'Q4-2025'];
  const trendVals = quarters.map(q => {
    const d = QUARTERLY_DATA[slug]?.[q]?.[key];
    return d ? d.actual : null;
  }).filter(v => v !== null);

  const maxTrend = Math.max(...trendVals, 1);
  const trendBars = trendVals.map((v, i) => {
    const h = Math.max(4, (v / maxTrend) * 24);
    const isLatest = i === trendVals.length - 1;
    return `<div class="trend-bar" style="height:${h}px; background:${isLatest ? 'var(--accent)' : 'var(--surface2)'}"></div>`;
  }).join('');

  // Variance bar — show actual vs budget as a proportion
  const barPct = data.budget ? Math.min(120, Math.max(20, (data.actual / data.budget) * 100)) : 100;
  const barColor = `var(--${rag})`;

  return `
  <div class="kpi-tile">
    <div class="kpi-tile-label">${def.label}</div>
    <div class="kpi-tile-value">${fmt(data.actual, def.format)}<span style="font-size:12px;color:var(--text-muted);margin-left:4px">${def.unit}</span></div>
    <div class="kpi-tile-budget">Budget: ${fmt(data.budget, def.format)} ${def.unit}</div>
    <div class="var-bar-wrap">
      <div class="var-bar-track">
        <div class="var-bar-fill fill-${rag}" style="width:${Math.min(barPct, 100)}%"></div>
      </div>
      <div class="var-bar-labels">
        <span>0</span>
        <span>Budget</span>
      </div>
    </div>
    <span class="kpi-tile-var bg-${rag}">
      ${varArrow(varPct, def.direction)} ${varPct >= 0 ? '+' : ''}${varPct.toFixed(1)}% vs budget
    </span>
    ${yoyPct !== null ? `<div style="font-size:11px;color:var(--text-dim);margin-top:4px">YoY: ${yoyPct >= 0 ? '+' : ''}${yoyPct.toFixed(1)}%</div>` : ''}
    <div class="trend">${trendBars}</div>
  </div>`;
}

export function showPortfolio() {
  window.showPortfolio();
}
