// agent.js — Claude API call for variance analysis
// API key is stored in the user's browser (localStorage), never in the code
import { PORTCOS, KPI_DEFS, QUARTERLY_DATA } from './data.js';

const API_URL = 'https://api.anthropic.com/v1/messages';
const STORAGE_KEY = 'northwood_api_key';

function getApiKey() {
  return localStorage.getItem(STORAGE_KEY);
}

function saveApiKey(key) {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

function clearApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

// Show the key input modal
function promptForKey() {
  return new Promise((resolve) => {
    // Remove existing modal if any
    document.getElementById('keyModal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'keyModal';
    modal.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:1000;display:flex;align-items:center;justify-content:center">
        <div style="background:#1a1d27;border:1px solid #2e3345;border-radius:12px;padding:32px;max-width:480px;width:90%">
          <h3 style="color:#fff;font-size:16px;margin-bottom:8px">Connect to Claude</h3>
          <p style="color:#8b8fa3;font-size:13px;line-height:1.6;margin-bottom:20px">
            The Analyze button uses the Claude API to generate variance narratives.
            Paste your Anthropic API key below — it's saved in your browser only, never sent to GitHub.
          </p>
          <p style="color:#5a5e72;font-size:11px;margin-bottom:16px">
            Get a key at <a href="https://console.anthropic.com" target="_blank" style="color:#5bb8a4">console.anthropic.com</a> &rarr; API Keys &rarr; Create Key
          </p>
          <input type="password" id="keyInput" placeholder="sk-ant-..." style="
            width:100%;padding:10px 14px;background:#0f1117;border:1px solid #2e3345;border-radius:8px;
            color:#e2e4ea;font-family:monospace;font-size:13px;margin-bottom:16px;
          " />
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button id="keyCancelBtn" style="
              background:none;border:1px solid #2e3345;color:#8b8fa3;padding:8px 20px;border-radius:6px;
              font-size:13px;font-family:inherit;cursor:pointer;
            ">Cancel</button>
            <button id="keySaveBtn" style="
              background:#5bb8a4;color:#0f1117;border:none;padding:8px 20px;border-radius:6px;
              font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;
            ">Save & Analyze</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('keyInput');
    input.focus();

    document.getElementById('keySaveBtn').onclick = () => {
      const val = input.value.trim();
      if (val) {
        saveApiKey(val);
        modal.remove();
        resolve(val);
      }
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) {
          saveApiKey(val);
          modal.remove();
          resolve(val);
        }
      }
    });

    document.getElementById('keyCancelBtn').onclick = () => {
      modal.remove();
      resolve(null);
    };
  });
}

export async function analyze(slug, quarter) {
  const btn = document.getElementById('analyzeBtn');
  const output = document.getElementById('analysisOutput');
  const content = document.getElementById('analysisContent');

  if (!slug || !quarter) return;

  // Check for API key — prompt if missing
  let apiKey = getApiKey();
  if (!apiKey) {
    apiKey = await promptForKey();
    if (!apiKey) return; // user cancelled
  }

  const portco = PORTCOS[slug];
  const data = QUARTERLY_DATA[slug]?.[quarter];
  if (!portco || !data) return;

  // Show loading state
  btn.disabled = true;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><style>@keyframes spin{to{transform:rotate(360deg)}}</style><path d="M12 2a10 10 0 1 0 10 10"/></svg> Analyzing...`;
  output.classList.add('visible');
  content.innerHTML = '<p class="loading">Running variance analysis across financial and climate KPIs...</p>';

  // Build context for the prompt
  const kpiSummary = Object.entries(data).map(([key, d]) => {
    const def = KPI_DEFS[key];
    if (!def) return null;
    const varPct = d.budget ? (((d.actual - d.budget) / Math.abs(d.budget)) * 100).toFixed(1) : 'N/A';
    const yoy = d.prior ? (((d.actual - d.prior) / Math.abs(d.prior)) * 100).toFixed(1) : 'N/A';
    return `${def.label} (${def.unit}): Actual=${d.actual}, Budget=${d.budget}, Var=${varPct}%, YoY=${yoy}%, Direction=${def.direction}`;
  }).filter(Boolean).join('\n');

  const prompt = `You are a climate-focused PE analyst at Kith Consulting, writing a variance analysis for the investment committee at Northwood Capital Partners.

Company: ${portco.name}
Sector: ${portco.sector}
Fund: ${portco.fund}
Status: ${portco.status}
Quarter: ${quarter}
Facilities: ${portco.facilities}
Total Annual Emissions: ${portco.totalEmissions} tCO2e
Emissions Context: ${portco.emissionsNote}

KPI Performance This Quarter:
${kpiSummary}

Write a concise variance analysis (3-4 paragraphs) for Sarah Mitchell, Northwood's COO. She is not a climate expert but understands PE operating metrics.

Structure:
1. Executive summary — what's the headline? Is this portco on track, drifting, or off track? Lead with the answer.
2. Financial variance — what's driving the numbers? Be specific about which metrics are concerning or encouraging.
3. Climate variance — are emissions tracking to target? What's driving the variance? Connect it to operational drivers Sarah would understand (e.g., production volume, facility utilization, energy costs).
4. What to flag for the IC — one or two things the investment committee should know. Be direct.

Tone: Direct, analytical, no hedging. Use plain English, not ESG jargon. Numbers are in the data — reference them specifically.`;

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
      const msg = err.error?.message || `API returned ${response.status}`;
      // If auth failed, clear the saved key so they can re-enter
      if (response.status === 401) {
        clearApiKey();
        throw new Error('Invalid API key. Click Analyze again to re-enter your key.');
      }
      throw new Error(msg);
    }

    const result = await response.json();
    const text = result.content?.[0]?.text || 'No analysis returned.';

    // Simple markdown-ish rendering
    content.innerHTML = text
      .split('\n\n')
      .map(p => `<p>${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`)
      .join('');

  } catch (err) {
    content.innerHTML = `<p style="color:var(--red)">${err.message}</p>`;
  }

  // Reset button
  btn.disabled = false;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg> Analyze Variance`;
}
