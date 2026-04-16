// agent.js — Claude API call for emissions analysis
// API key is stored in the user's browser (localStorage), never in the code
import { PORTCOS, TRAJECTORY, FACILITIES, SCOPE1_SOURCES, INITIATIVES } from './data.js';

const API_URL = 'https://api.anthropic.com/v1/messages';
const STORAGE_KEY = 'northwood_api_key';

function getApiKey() { return localStorage.getItem(STORAGE_KEY); }
function saveApiKey(key) { localStorage.setItem(STORAGE_KEY, key.trim()); }
function clearApiKey() { localStorage.removeItem(STORAGE_KEY); }

function promptForKey() {
  return new Promise((resolve) => {
    document.getElementById('keyModal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'keyModal';
    modal.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:1000;display:flex;align-items:center;justify-content:center">
        <div style="background:#1a1d27;border:1px solid #2e3345;border-radius:12px;padding:32px;max-width:480px;width:90%">
          <h3 style="color:#fff;font-size:16px;margin-bottom:8px">Connect to Claude</h3>
          <p style="color:#8b8fa3;font-size:13px;line-height:1.6;margin-bottom:20px">
            The Analyze button uses the Claude API to generate an emissions analysis.
            Paste your Anthropic API key below — it's saved in your browser only, never sent to GitHub.
          </p>
          <p style="color:#5a5e72;font-size:11px;margin-bottom:16px">
            Get a key at <a href="https://console.anthropic.com" target="_blank" style="color:#5bb8a4">console.anthropic.com</a> &rarr; API Keys &rarr; Create Key
          </p>
          <input type="password" id="keyInput" placeholder="sk-ant-..." style="
            width:100%;padding:10px 14px;background:#0f1117;border:1px solid #2e3345;border-radius:8px;
            color:#e2e4ea;font-family:monospace;font-size:13px;margin-bottom:16px;" />
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button id="keyCancelBtn" style="background:none;border:1px solid #2e3345;color:#8b8fa3;padding:8px 20px;border-radius:6px;font-size:13px;font-family:inherit;cursor:pointer;">Cancel</button>
            <button id="keySaveBtn" style="background:#5bb8a4;color:#0f1117;border:none;padding:8px 20px;border-radius:6px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">Save & Analyze</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const input = document.getElementById('keyInput');
    input.focus();
    document.getElementById('keySaveBtn').onclick = () => {
      const val = input.value.trim();
      if (val) { saveApiKey(val); modal.remove(); resolve(val); }
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { const val = input.value.trim(); if (val) { saveApiKey(val); modal.remove(); resolve(val); } }
    });
    document.getElementById('keyCancelBtn').onclick = () => { modal.remove(); resolve(null); };
  });
}

export async function analyze(slug) {
  const btn = document.getElementById('analyzeBtn');
  const output = document.getElementById('analysisOutput');
  const content = document.getElementById('analysisContent');

  if (!slug) return;

  let apiKey = getApiKey();
  if (!apiKey) {
    apiKey = await promptForKey();
    if (!apiKey) return;
  }

  const p = PORTCOS[slug];
  const t = TRAJECTORY[slug];
  const facs = FACILITIES[slug];
  const sources = SCOPE1_SOURCES[slug];
  const inits = INITIATIVES[slug];
  if (!p || !t) return;

  // Compute key metrics
  const actuals = t.quarters.filter(q => q.actual);
  const ltm = actuals.slice(-4).reduce((s, q) => s + q.scope1 + q.scope2, 0);
  const latest = actuals[actuals.length - 1];
  const baseYear = t.baseYearTotal;
  const target = t.target2030;
  const pctFromBase = ((baseYear - ltm) / baseYear * 100).toFixed(1);
  const intensity = (ltm / p.revenue).toFixed(1);

  // Build facility summary
  const facSummary = facs.sort((a, b) => b.total - a.total).slice(0, 5)
    .map(f => `  ${f.name} (${f.city}, ${f.state}): ${f.total} tCO2e — ${f.topSource}`)
    .join('\n');

  // Build initiative summary
  const initSummary = inits.map(i =>
    `  [${i.status.replace('_', ' ').toUpperCase()}] ${i.name}: -${i.estReduction} tCO2e, ${i.category}, ${i.startDate}${i.capex ? `, $${i.capex}K capex` : ''}`
  ).join('\n');

  // Source breakdown
  const sourceSummary = sources.map(s => `  ${s.source}: ${s.tco2e} tCO2e (${s.pct}%)`).join('\n');

  // Quarterly trend
  const trendSummary = actuals.map(q =>
    `  ${q.q}: Scope 1 = ${q.scope1}, Scope 2 = ${q.scope2}, Total = ${q.scope1 + q.scope2}`
  ).join('\n');

  btn.disabled = true;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><style>@keyframes spin{to{transform:rotate(360deg)}}</style><path d="M12 2a10 10 0 1 0 10 10"/></svg> Analyzing...`;
  output.classList.add('visible');
  content.innerHTML = '<p style="color:#8b8fa3;font-style:italic">Analyzing emissions trajectory and reduction plan...</p>';

  const prompt = `You are a climate-focused PE analyst at Kith Consulting, writing an emissions analysis for the investment committee at Northwood Capital Partners.

Company: ${p.name}
Sector: ${p.sector} | Fund: ${p.fund} | Status: ${p.status}
Facilities: ${p.facilities} | Data Grade: ${p.dataGrade} (${p.dataNote})
Revenue: $${p.revenue}M LTM

EMISSIONS OVERVIEW:
- Base year (${p.baseYear}) total: ${baseYear.toLocaleString()} tCO2e
- LTM actual: ${ltm.toLocaleString()} tCO2e
- Change from base year: ${pctFromBase}%
- 2030 target: ${target.toLocaleString()} tCO2e (${p.targetReduction}% reduction, SBTi 1.5C-guided)
- Emissions intensity: ${intensity} tCO2e per $M revenue
- Latest quarter (${latest.q}): Scope 1 = ${latest.scope1}, Scope 2 = ${latest.scope2}

QUARTERLY TREND:
${trendSummary}

SCOPE 1 SOURCES:
${sourceSummary}

TOP FACILITIES BY EMISSIONS:
${facSummary}

REDUCTION INITIATIVES:
${initSummary}

Write a concise emissions analysis (3-4 paragraphs) for Sarah Mitchell, Northwood's COO. She is not a climate expert but understands PE operating metrics.

Structure:
1. Trajectory assessment — is this company on track to hit its 2030 target? What does the trend show? Lead with the answer.
2. What's driving emissions — which facilities, scopes, and sources are the biggest contributors? What's moving the needle (up or down)?
3. Reduction plan assessment — are the planned initiatives sufficient to close the gap to target? What's working, what's stalled, what's missing?
4. Recommendation — one or two specific actions to flag for the IC. Be direct. Connect to value (cost savings, exit positioning, risk reduction).

Tone: Direct, analytical, no hedging. Use plain English, not ESG jargon. Reference specific numbers from the data.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      if (response.status === 401) {
        clearApiKey();
        throw new Error('Invalid API key. Click Analyze again to re-enter your key.');
      }
      throw new Error(err.error?.message || `API returned ${response.status}`);
    }

    const result = await response.json();
    const text = result.content?.[0]?.text || 'No analysis returned.';
    content.innerHTML = text
      .split('\n\n')
      .map(p => `<p>${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`)
      .join('');
  } catch (err) {
    content.innerHTML = `<p style="color:var(--red)">${err.message}</p>`;
  }

  btn.disabled = false;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg> Analyze Emissions`;
}
