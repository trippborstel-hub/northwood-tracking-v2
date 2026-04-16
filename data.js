// data.js — Northwood Capital Partners: Full Portfolio Climate Tracker
// 10 active portcos, quarterly emissions, risk scores, ESG composite, reduction initiatives
// Canonical data sourced from Kith Climate engagement deliverables

export const PORTCOS = {
  meridian: {
    name: "Meridian Business Solutions",
    slug: "meridian",
    sector: "BPO / Staffing",
    fund: "Fund I",
    status: "Exit Prep",
    revenue: 225,
    ebitda: 38.3,
    margin: 17.0,
    leverage: 1.1,
    moic: 3.0,
    facilities: 16,
    employees: 620,
    dataGrade: "A",
    dataNote: "75% utility bill, 25% accounting export",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#58a6ff"
  },
  sterling: {
    name: "Sterling Precision Manufacturing",
    slug: "sterling",
    sector: "Aerospace & Defense",
    fund: "Fund I",
    status: "Strong",
    revenue: 168,
    ebitda: 30.2,
    margin: 18.0,
    leverage: 1.1,
    moic: 2.9,
    facilities: 3,
    employees: 420,
    dataGrade: "A",
    dataNote: "100% utility bill data",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#e8724c"
  },
  novacare: {
    name: "NovaCare Health Partners",
    slug: "novacare",
    sector: "PT / Rehabilitation",
    fund: "Fund I",
    status: "Steady",
    revenue: 175,
    ebitda: 28.0,
    margin: 16.0,
    leverage: 1.4,
    moic: 2.7,
    facilities: 30,
    employees: 850,
    dataGrade: "B",
    dataNote: "60% utility bill, 40% estimated from sq ft",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#a78bfa"
  },
  trident: {
    name: "Trident IT Solutions",
    slug: "trident",
    sector: "IT / Cybersecurity",
    fund: "Fund I",
    status: "Above Plan",
    revenue: 142,
    ebitda: 24.9,
    margin: 17.5,
    leverage: 1.1,
    moic: 2.8,
    facilities: 8,
    employees: 380,
    dataGrade: "B",
    dataNote: "70% utility bill, 30% landlord estimates",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#38bdf8"
  },
  clearview: {
    name: "Clearview Environmental",
    slug: "clearview",
    sector: "Remediation / Testing",
    fund: "Fund II",
    status: "On Plan",
    revenue: 195,
    ebitda: 31.2,
    margin: 16.0,
    leverage: 2.5,
    moic: 1.6,
    facilities: 12,
    employees: 510,
    dataGrade: "A",
    dataNote: "85% utility bill, 15% fleet GPS logs",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#4ade80"
  },
  patriot: {
    name: "Patriot Staffing Solutions",
    slug: "patriot",
    sector: "Light Industrial Staffing",
    fund: "Fund II",
    status: "Below Plan",
    revenue: 310,
    ebitda: 23.8,
    margin: 7.7,
    leverage: 2.6,
    moic: 1.3,
    facilities: 26,
    employees: 290,
    dataGrade: "C",
    dataNote: "40% utility bill, 60% spend-based estimates",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#f97316"
  },
  keystone: {
    name: "Keystone Behavioral Health",
    slug: "keystone",
    sector: "ABA Therapy",
    fund: "Fund II",
    status: "100-Day",
    revenue: 138,
    ebitda: 24.2,
    margin: 17.5,
    leverage: 3.1,
    moic: 1.4,
    facilities: 28,
    employees: 720,
    dataGrade: "C",
    dataNote: "35% utility bill, 65% estimated from lease data",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#fb7185"
  },
  pinnacle: {
    name: "Pinnacle Testing & Inspection",
    slug: "pinnacle",
    sector: "NDT / Inspection",
    fund: "Fund II",
    status: "Integration",
    revenue: 115,
    ebitda: 20.1,
    margin: 17.5,
    leverage: 2.9,
    moic: 1.2,
    facilities: 10,
    employees: 340,
    dataGrade: "B",
    dataNote: "65% utility bill, 35% fleet estimates",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#fbbf24"
  },
  harvest: {
    name: "Harvest Ridge Foods",
    slug: "harvest",
    sector: "Food Co-Packing",
    fund: "Fund II",
    status: "100-Day",
    revenue: 152,
    ebitda: 22.8,
    margin: 15.0,
    leverage: 2.9,
    moic: 1.2,
    facilities: 5,
    employees: 480,
    dataGrade: "A",
    dataNote: "100% utility bill data",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#5bb8a4"
  },
  ridgeline: {
    name: "Ridgeline Property Services",
    slug: "ridgeline",
    sector: "Property Management",
    fund: "Fund II",
    status: "100-Day",
    revenue: 95,
    ebitda: 17.4,
    margin: 18.3,
    leverage: 3.0,
    moic: 1.2,
    facilities: 6,
    employees: 415,
    dataGrade: "B",
    dataNote: "55% utility bill, 45% managed-portfolio estimates",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#c084fc"
  }
};

// ─────────────────────────────────────────────
// RISK SUMMARY — Physical + Transition per portco
// Physical: WRI Aqueduct 4.0 (water), CMIP6 (heat)
// Transition: 5-vector financial materiality framework
// ─────────────────────────────────────────────

export const RISK_SUMMARY = {
  meridian: {
    physical: { level: "Medium", waterScore: 55, heatScore: 30.6, evAtRisk: 8.2 },
    transition: {
      overall: "Critical",
      vectors: { customerESG: 4, inputSupply: 1, capexCycle: 1, regulatory: 2, exitRefi: 5 },
      topRisk: "Exit diligence — public acquirers will require climate disclosure readiness"
    }
  },
  sterling: {
    physical: { level: "Medium", waterScore: 50, heatScore: 60.8, evAtRisk: 12.4 },
    transition: {
      overall: "High",
      vectors: { customerESG: 5, inputSupply: 4, capexCycle: 4, regulatory: 3, exitRefi: 3 },
      topRisk: "Defense customer ESG mandates — DoD supplier sustainability requirements tightening"
    }
  },
  novacare: {
    physical: { level: "Medium", waterScore: 51.3, heatScore: 22.4, evAtRisk: 5.1 },
    transition: {
      overall: "Low",
      vectors: { customerESG: 1, inputSupply: 2, capexCycle: 2, regulatory: 2, exitRefi: 3 },
      topRisk: "OSHA heat stress standards for clinic operations"
    }
  },
  trident: {
    physical: { level: "Medium", waterScore: 57.5, heatScore: 31.2, evAtRisk: 4.8 },
    transition: {
      overall: "Moderate",
      vectors: { customerESG: 3, inputSupply: 1, capexCycle: 1, regulatory: 2, exitRefi: 3 },
      topRisk: "Federal contractor sustainability reporting requirements expanding"
    }
  },
  clearview: {
    physical: { level: "Medium", waterScore: 56.7, heatScore: 31.3, evAtRisk: 7.6 },
    transition: {
      overall: "Tailwind",
      vectors: { customerESG: 2, inputSupply: 2, capexCycle: 3, regulatory: 1, exitRefi: 2 },
      topRisk: "Remediation demand accelerating — regulatory tailwind, not risk"
    }
  },
  patriot: {
    physical: { level: "Low", waterScore: 34.6, heatScore: 18.6, evAtRisk: 3.2 },
    transition: {
      overall: "Moderate",
      vectors: { customerESG: 3, inputSupply: 2, capexCycle: 1, regulatory: 2, exitRefi: 4 },
      topRisk: "Exit positioning — buyers increasingly screening for ESG readiness"
    }
  },
  keystone: {
    physical: { level: "Medium", waterScore: 54.3, heatScore: 35.7, evAtRisk: 4.9 },
    transition: {
      overall: "Low",
      vectors: { customerESG: 1, inputSupply: 1, capexCycle: 1, regulatory: 2, exitRefi: 1 },
      topRisk: "Minimal transition exposure — healthcare services shielded"
    }
  },
  pinnacle: {
    physical: { level: "Medium", waterScore: 40, heatScore: 40.1, evAtRisk: 6.8 },
    transition: {
      overall: "High",
      vectors: { customerESG: 4, inputSupply: 2, capexCycle: 2, regulatory: 2, exitRefi: 2 },
      topRisk: "Industrial customer ESG requirements — NDT clients mandating supplier disclosures"
    }
  },
  harvest: {
    physical: { level: "Medium", waterScore: 46, heatScore: 27.1, evAtRisk: 9.3 },
    transition: {
      overall: "Critical",
      vectors: { customerESG: 5, inputSupply: 4, capexCycle: 3, regulatory: 2, exitRefi: 3 },
      topRisk: "CPG customer ESG pressure — major retailers requiring Scope 3 supplier data"
    }
  },
  ridgeline: {
    physical: { level: "High", waterScore: 66.7, heatScore: 68.5, evAtRisk: 14.2 },
    transition: {
      overall: "High",
      vectors: { customerESG: 4, inputSupply: 2, capexCycle: 3, regulatory: 4, exitRefi: 2 },
      topRisk: "Building performance standards — CA/NYC/Denver mandates directly impact managed portfolio"
    }
  }
};

// ─────────────────────────────────────────────
// ESG SCORECARD — McKinsey 8-dimension framework
// E1: Physical Climate Risk, E2: Transition Risk, E3: Environmental Liability
// S1: Labor & Safety, S2: Workforce, S3: Community
// G1: Board Oversight, G2: Data & Cyber
// Weights: E1=10%, E2=15%, E3=10%, S1=15%, S2=15%, S3=10%, G1=15%, G2=10%
// ─────────────────────────────────────────────

export const ESG_SCORES = {
  meridian:  { e1: 2, e2: 1, e3: 1, s1: 1, s2: 3, s3: 1, g1: 3, g2: 3, composite: 1.8, riskLevel: "Low" },
  sterling:  { e1: 1, e2: 5, e3: 4, s1: 3, s2: 2, s3: 1, g1: 3, g2: 2, composite: 3.1, riskLevel: "Moderate" },
  novacare:  { e1: 3, e2: 2, e3: 2, s1: 2, s2: 3, s3: 2, g1: 3, g2: 3, composite: 2.4, riskLevel: "Low" },
  trident:   { e1: 1, e2: 3, e3: 1, s1: 1, s2: 3, s3: 1, g1: 2, g2: 1, composite: 1.7, riskLevel: "Low" },
  clearview: { e1: 2, e2: 4, e3: 3, s1: 3, s2: 2, s3: 3, g1: 4, g2: 3, composite: 3.0, riskLevel: "Moderate" },
  patriot:   { e1: 4, e2: 2, e3: 1, s1: 4, s2: 4, s3: 3, g1: 4, g2: 3, composite: 3.2, riskLevel: "Moderate" },
  keystone:  { e1: 3, e2: 1, e3: 1, s1: 2, s2: 3, s3: 3, g1: 4, g2: 4, composite: 2.6, riskLevel: "Low" },
  pinnacle:  { e1: 5, e2: 5, e3: 3, s1: 4, s2: 3, s3: 2, g1: 4, g2: 2, composite: 3.7, riskLevel: "Elevated" },
  harvest:   { e1: 3, e2: 4, e3: 3, s1: 3, s2: 3, s3: 2, g1: 4, g2: 1, composite: 3.0, riskLevel: "Moderate" },
  ridgeline: { e1: 4, e2: 4, e3: 1, s1: 2, s2: 2, s3: 2, g1: 4, g2: 2, composite: 2.8, riskLevel: "Low" }
};

// ─────────────────────────────────────────────
// FACILITY-LEVEL EMISSIONS (detailed for priority companies)
// ─────────────────────────────────────────────

export const FACILITIES = {
  meridian: [
    { id: "MBS-001", name: "Corporate HQ", city: "Chicago", state: "IL", type: "Corporate HQ", scope1: 139, scope2: 142, total: 281, topSource: "Natural gas (heating)" },
    { id: "MBS-002", name: "Minneapolis Office", city: "Minneapolis", state: "MN", type: "Regional Office", scope1: 75, scope2: 67, total: 142, topSource: "Natural gas (cold climate)" },
    { id: "MBS-003", name: "Detroit Office", city: "Detroit", state: "MI", type: "Regional Office", scope1: 73, scope2: 78, total: 151, topSource: "Electricity (MI grid)" },
    { id: "MBS-004", name: "St. Louis Office", city: "St. Louis", state: "MO", type: "Regional Office", scope1: 51, scope2: 79, total: 130, topSource: "Electricity (MO grid)" },
    { id: "MBS-005", name: "New York Office", city: "New York", state: "NY", type: "Regional Office", scope1: 61, scope2: 39, total: 100, topSource: "Natural gas" },
    { id: "MBS-006", name: "Boston Office", city: "Boston", state: "MA", type: "Regional Office", scope1: 70, scope2: 31, total: 101, topSource: "Natural gas" },
    { id: "MBS-007", name: "Philadelphia Office", city: "Philadelphia", state: "PA", type: "Regional Office", scope1: 55, scope2: 40, total: 95, topSource: "Natural gas" },
    { id: "MBS-008", name: "Atlanta Office", city: "Atlanta", state: "GA", type: "Regional Office", scope1: 32, scope2: 53, total: 85, topSource: "Electricity" },
    { id: "MBS-009", name: "Charlotte Office", city: "Charlotte", state: "NC", type: "Regional Office", scope1: 36, scope2: 35, total: 71, topSource: "Natural gas" },
    { id: "MBS-010", name: "Miami Office", city: "Miami", state: "FL", type: "Regional Office", scope1: 0, scope2: 62, total: 62, topSource: "Electricity (cooling)" },
    { id: "MBS-011", name: "Denver Office", city: "Denver", state: "CO", type: "Regional Office", scope1: 49, scope2: 54, total: 103, topSource: "Electricity (CO grid)" },
    { id: "MBS-012", name: "Phoenix Office", city: "Phoenix", state: "AZ", type: "Regional Office", scope1: 0, scope2: 66, total: 66, topSource: "Electricity (cooling)" },
    { id: "MBS-013", name: "Jacksonville Center", city: "Jacksonville", state: "FL", type: "Delivery Center", scope1: 7, scope2: 88, total: 95, topSource: "Electricity" },
    { id: "MBS-014", name: "San Antonio Center", city: "San Antonio", state: "TX", type: "Delivery Center", scope1: 0, scope2: 82, total: 82, topSource: "Electricity" },
    { id: "MBS-015", name: "Dallas Office", city: "Dallas", state: "TX", type: "Regional Office", scope1: 24, scope2: 62, total: 86, topSource: "Electricity" },
    { id: "MBS-016", name: "Seattle Office", city: "Seattle", state: "WA", type: "Regional Office", scope1: 45, scope2: 8, total: 53, topSource: "Natural gas (WA clean grid)" },
  ],
  sterling: [
    { id: "SPM-001", name: "Akron Primary Plant", city: "Akron", state: "OH", type: "Manufacturing HQ", scope1: 2520, scope2: 1860, total: 4380, topSource: "Natural gas (heat-treat) + R-22 chillers" },
    { id: "SPM-002", name: "Elyria Machining", city: "Elyria", state: "OH", type: "Manufacturing", scope1: 1380, scope2: 980, total: 2360, topSource: "Natural gas + electricity (CNC)" },
    { id: "SPM-003", name: "Canton Distribution", city: "Canton", state: "OH", type: "Warehouse", scope1: 300, scope2: 260, total: 560, topSource: "Fleet diesel (8 trucks)" },
  ],
  harvest: [
    { id: "HRF-001", name: "Nashville Plant (HQ)", city: "Nashville", state: "TN", type: "Production HQ", scope1: 1130, scope2: 1178, total: 2308, topSource: "Boilers 18hr/day (185K therms)" },
    { id: "HRF-002", name: "Murfreesboro Plant", city: "Murfreesboro", state: "TN", type: "Production", scope1: 399, scope2: 534, total: 933, topSource: "Natural gas (dressings/condiments)" },
    { id: "HRF-003", name: "Bowling Green Plant", city: "Bowling Green", state: "KY", type: "Production (Organic)", scope1: 397, scope2: 618, total: 1015, topSource: "Electricity + natural gas" },
    { id: "HRF-004", name: "Chattanooga Plant", city: "Chattanooga", state: "TN", type: "Production (Cold-Fill)", scope1: 15, scope2: 773, total: 788, topSource: "All-electric process heat" },
    { id: "HRF-005", name: "Nashville HQ / R&D", city: "Nashville", state: "TN", type: "Office / Lab", scope1: 47, scope2: 35, total: 82, topSource: "Fleet gasoline + natural gas" },
  ],
  clearview: [
    { id: "CVE-001", name: "Denver HQ", city: "Denver", state: "CO", type: "Corporate HQ", scope1: 85, scope2: 120, total: 205, topSource: "Natural gas" },
    { id: "CVE-002", name: "Houston Field Ops", city: "Houston", state: "TX", type: "Field Office", scope1: 680, scope2: 210, total: 890, topSource: "Fleet diesel (remediation vehicles)" },
    { id: "CVE-003", name: "Phoenix Lab", city: "Phoenix", state: "AZ", type: "Testing Lab", scope1: 420, scope2: 380, total: 800, topSource: "Lab equipment + fleet" },
    { id: "CVE-004", name: "Atlanta Field Ops", city: "Atlanta", state: "GA", type: "Field Office", scope1: 510, scope2: 190, total: 700, topSource: "Fleet diesel" },
    { id: "CVE-005", name: "Tampa Lab", city: "Tampa", state: "FL", type: "Testing Lab", scope1: 380, scope2: 280, total: 660, topSource: "Lab equipment" },
  ],
  novacare: [
    { id: "NCH-001", name: "Regional HQ", city: "Philadelphia", state: "PA", type: "Corporate HQ", scope1: 95, scope2: 180, total: 275, topSource: "Natural gas" },
    { id: "NCH-002", name: "Clinic Cluster — Southeast", city: "Various", state: "SE", type: "Clinics (12)", scope1: 240, scope2: 410, total: 650, topSource: "Electricity (HVAC)" },
    { id: "NCH-003", name: "Clinic Cluster — Northeast", city: "Various", state: "NE", type: "Clinics (10)", scope1: 210, scope2: 320, total: 530, topSource: "Natural gas (heating)" },
    { id: "NCH-004", name: "Clinic Cluster — Midwest", city: "Various", state: "MW", type: "Clinics (8)", scope1: 135, scope2: 210, total: 345, topSource: "Natural gas" },
  ],
  trident: [
    { id: "TIT-001", name: "Tysons HQ", city: "Tysons", state: "VA", type: "Corporate HQ", scope1: 45, scope2: 420, total: 465, topSource: "Electricity (data center)" },
    { id: "TIT-002", name: "Austin SOC", city: "Austin", state: "TX", type: "Security Ops", scope1: 60, scope2: 510, total: 570, topSource: "Electricity (24/7 ops)" },
    { id: "TIT-003", name: "Tampa Office", city: "Tampa", state: "FL", type: "Regional Office", scope1: 35, scope2: 280, total: 315, topSource: "Electricity (cooling)" },
    { id: "TIT-004", name: "Denver Office", city: "Denver", state: "CO", type: "Regional Office", scope1: 55, scope2: 210, total: 265, topSource: "Natural gas" },
    { id: "TIT-005", name: "Satellite Offices (4)", city: "Various", state: "US", type: "Offices", scope1: 125, scope2: 230, total: 355, topSource: "Mixed" },
  ],
  keystone: [
    { id: "KBH-001", name: "Corporate HQ", city: "Nashville", state: "TN", type: "Corporate HQ", scope1: 65, scope2: 110, total: 175, topSource: "Natural gas" },
    { id: "KBH-002", name: "Clinic Cluster — Southeast", city: "Various", state: "SE", type: "Clinics (14)", scope1: 380, scope2: 520, total: 900, topSource: "Electricity (HVAC)" },
    { id: "KBH-003", name: "Clinic Cluster — Mid-Atlantic", city: "Various", state: "MA", type: "Clinics (8)", scope1: 290, scope2: 410, total: 700, topSource: "Natural gas + electricity" },
    { id: "KBH-004", name: "Clinic Cluster — Midwest", city: "Various", state: "MW", type: "Clinics (6)", scope1: 165, scope2: 310, total: 475, topSource: "Natural gas" },
  ],
  pinnacle: [
    { id: "PTI-001", name: "Houston HQ", city: "Houston", state: "TX", type: "Corporate HQ", scope1: 120, scope2: 180, total: 300, topSource: "Natural gas + fleet" },
    { id: "PTI-002", name: "Gulf Coast Field Ops", city: "Corpus Christi", state: "TX", type: "Field Office", scope1: 580, scope2: 290, total: 870, topSource: "Fleet diesel (inspection trucks)" },
    { id: "PTI-003", name: "Midwest Field Ops", city: "Tulsa", state: "OK", type: "Field Office", scope1: 440, scope2: 260, total: 700, topSource: "Fleet diesel" },
    { id: "PTI-004", name: "Appalachian Field Ops", city: "Charleston", state: "WV", type: "Field Office", scope1: 310, scope2: 240, total: 550, topSource: "Fleet diesel" },
    { id: "PTI-005", name: "Satellite Labs (3)", city: "Various", state: "US", type: "Testing Labs", scope1: 150, scope2: 230, total: 380, topSource: "Lab equipment" },
  ],
  patriot: [
    { id: "PSS-001", name: "Corporate HQ", city: "Indianapolis", state: "IN", type: "Corporate HQ", scope1: 40, scope2: 95, total: 135, topSource: "Natural gas" },
    { id: "PSS-002", name: "Branch Offices — Midwest (10)", city: "Various", state: "MW", type: "Branch Offices", scope1: 180, scope2: 340, total: 520, topSource: "Electricity + fleet" },
    { id: "PSS-003", name: "Branch Offices — Southeast (8)", city: "Various", state: "SE", type: "Branch Offices", scope1: 140, scope2: 260, total: 400, topSource: "Electricity" },
    { id: "PSS-004", name: "Branch Offices — Northeast (8)", city: "Various", state: "NE", type: "Branch Offices", scope1: 160, scope2: 285, total: 445, topSource: "Natural gas + electricity" },
  ],
  ridgeline: {
    note: "Scope 2 includes managed portfolio energy attributed under operational control",
    facilities: [
      { id: "RPS-001", name: "Corporate HQ", city: "Denver", state: "CO", type: "Corporate HQ", scope1: 35, scope2: 85, total: 120, topSource: "Natural gas" },
      { id: "RPS-002", name: "Managed Portfolio — CO", city: "Denver", state: "CO", type: "Managed Properties", scope1: 120, scope2: 680, total: 800, topSource: "Electricity (HVAC, common areas)" },
      { id: "RPS-003", name: "Managed Portfolio — CA", city: "Various", state: "CA", type: "Managed Properties", scope1: 95, scope2: 520, total: 615, topSource: "Electricity (cooling)" },
      { id: "RPS-004", name: "Managed Portfolio — NYC", city: "New York", state: "NY", type: "Managed Properties", scope1: 140, scope2: 350, total: 490, topSource: "Natural gas (heating)" },
      { id: "RPS-005", name: "Regional Offices (2)", city: "Various", state: "US", type: "Offices", scope1: 60, scope2: 165, total: 225, topSource: "Mixed" },
    ]
  }
};

// Normalize ridgeline facilities (nested differently due to note field)
if (FACILITIES.ridgeline.facilities) {
  const rl = FACILITIES.ridgeline.facilities;
  FACILITIES.ridgeline = rl;
}

// ─────────────────────────────────────────────
// QUARTERLY EMISSIONS TRAJECTORY
// Base year (2024) through current + forecast
// Actuals through Q4 2025, forecast from Q1 2026
// ─────────────────────────────────────────────

export const TRAJECTORY = {
  meridian: {
    baseYearTotal: 2600,
    target2030: 1508,
    quarters: [
      { q: "Q1-2024", scope1: 200, scope2: 480, actual: true },
      { q: "Q2-2024", scope1: 175, scope2: 445, actual: true },
      { q: "Q3-2024", scope1: 170, scope2: 470, actual: true },
      { q: "Q4-2024", scope1: 205, scope2: 455, actual: true },
      { q: "Q1-2025", scope1: 195, scope2: 465, actual: true },
      { q: "Q2-2025", scope1: 170, scope2: 430, actual: true },
      { q: "Q3-2025", scope1: 165, scope2: 445, actual: true },
      { q: "Q4-2025", scope1: 185, scope2: 440, actual: true },
      { q: "Q1-2026", scope1: 180, scope2: 425, actual: false },
      { q: "Q2-2026", scope1: 160, scope2: 400, actual: false },
      { q: "Q3-2026", scope1: 155, scope2: 415, actual: false },
      { q: "Q4-2026", scope1: 175, scope2: 430, actual: false },
    ]
  },
  sterling: {
    baseYearTotal: 7300,
    target2030: 4234,
    quarters: [
      { q: "Q1-2024", scope1: 1100, scope2: 810, actual: true },
      { q: "Q2-2024", scope1: 1020, scope2: 740, actual: true },
      { q: "Q3-2024", scope1: 1050, scope2: 770, actual: true },
      { q: "Q4-2024", scope1: 1030, scope2: 780, actual: true },
      { q: "Q1-2025", scope1: 1080, scope2: 790, actual: true },
      { q: "Q2-2025", scope1: 1010, scope2: 720, actual: true },
      { q: "Q3-2025", scope1: 1040, scope2: 750, actual: true },
      { q: "Q4-2025", scope1: 1000, scope2: 760, actual: true },
      { q: "Q1-2026", scope1: 980, scope2: 740, actual: false },
      { q: "Q2-2026", scope1: 960, scope2: 710, actual: false },
      { q: "Q3-2026", scope1: 970, scope2: 720, actual: false },
      { q: "Q4-2026", scope1: 990, scope2: 750, actual: false },
    ]
  },
  novacare: {
    baseYearTotal: 1800,
    target2030: 1044,
    quarters: [
      { q: "Q1-2024", scope1: 180, scope2: 290, actual: true },
      { q: "Q2-2024", scope1: 160, scope2: 270, actual: true },
      { q: "Q3-2024", scope1: 165, scope2: 285, actual: true },
      { q: "Q4-2024", scope1: 175, scope2: 275, actual: true },
      { q: "Q1-2025", scope1: 172, scope2: 282, actual: true },
      { q: "Q2-2025", scope1: 158, scope2: 265, actual: true },
      { q: "Q3-2025", scope1: 162, scope2: 278, actual: true },
      { q: "Q4-2025", scope1: 168, scope2: 270, actual: true },
      { q: "Q1-2026", scope1: 165, scope2: 268, actual: false },
      { q: "Q2-2026", scope1: 155, scope2: 258, actual: false },
      { q: "Q3-2026", scope1: 158, scope2: 265, actual: false },
      { q: "Q4-2026", scope1: 162, scope2: 270, actual: false },
    ]
  },
  trident: {
    baseYearTotal: 1970,
    target2030: 1143,
    quarters: [
      { q: "Q1-2024", scope1: 82, scope2: 420, actual: true },
      { q: "Q2-2024", scope1: 78, scope2: 405, actual: true },
      { q: "Q3-2024", scope1: 80, scope2: 415, actual: true },
      { q: "Q4-2024", scope1: 80, scope2: 410, actual: true },
      { q: "Q1-2025", scope1: 78, scope2: 408, actual: true },
      { q: "Q2-2025", scope1: 75, scope2: 395, actual: true },
      { q: "Q3-2025", scope1: 76, scope2: 400, actual: true },
      { q: "Q4-2025", scope1: 74, scope2: 392, actual: true },
      { q: "Q1-2026", scope1: 72, scope2: 385, actual: false },
      { q: "Q2-2026", scope1: 70, scope2: 375, actual: false },
      { q: "Q3-2026", scope1: 71, scope2: 380, actual: false },
      { q: "Q4-2026", scope1: 73, scope2: 388, actual: false },
    ]
  },
  clearview: {
    baseYearTotal: 4200,
    target2030: 2436,
    quarters: [
      { q: "Q1-2024", scope1: 720, scope2: 360, actual: true },
      { q: "Q2-2024", scope1: 690, scope2: 340, actual: true },
      { q: "Q3-2024", scope1: 710, scope2: 355, actual: true },
      { q: "Q4-2024", scope1: 680, scope2: 345, actual: true },
      { q: "Q1-2025", scope1: 700, scope2: 350, actual: true },
      { q: "Q2-2025", scope1: 670, scope2: 330, actual: true },
      { q: "Q3-2025", scope1: 685, scope2: 340, actual: true },
      { q: "Q4-2025", scope1: 660, scope2: 325, actual: true },
      { q: "Q1-2026", scope1: 650, scope2: 320, actual: false },
      { q: "Q2-2026", scope1: 635, scope2: 310, actual: false },
      { q: "Q3-2026", scope1: 645, scope2: 315, actual: false },
      { q: "Q4-2026", scope1: 655, scope2: 325, actual: false },
    ]
  },
  patriot: {
    baseYearTotal: 1500,
    target2030: 870,
    quarters: [
      { q: "Q1-2024", scope1: 132, scope2: 248, actual: true },
      { q: "Q2-2024", scope1: 128, scope2: 240, actual: true },
      { q: "Q3-2024", scope1: 130, scope2: 245, actual: true },
      { q: "Q4-2024", scope1: 130, scope2: 247, actual: true },
      { q: "Q1-2025", scope1: 134, scope2: 252, actual: true },
      { q: "Q2-2025", scope1: 132, scope2: 248, actual: true },
      { q: "Q3-2025", scope1: 135, scope2: 255, actual: true },
      { q: "Q4-2025", scope1: 138, scope2: 258, actual: true },
      { q: "Q1-2026", scope1: 136, scope2: 254, actual: false },
      { q: "Q2-2026", scope1: 133, scope2: 250, actual: false },
      { q: "Q3-2026", scope1: 135, scope2: 252, actual: false },
      { q: "Q4-2026", scope1: 137, scope2: 256, actual: false },
    ]
  },
  keystone: {
    baseYearTotal: 2250,
    target2030: 1305,
    quarters: [
      { q: "Q1-2024", scope1: 230, scope2: 345, actual: true },
      { q: "Q2-2024", scope1: 220, scope2: 330, actual: true },
      { q: "Q3-2024", scope1: 225, scope2: 340, actual: true },
      { q: "Q4-2024", scope1: 225, scope2: 335, actual: true },
      { q: "Q1-2025", scope1: 222, scope2: 338, actual: true },
      { q: "Q2-2025", scope1: 218, scope2: 328, actual: true },
      { q: "Q3-2025", scope1: 220, scope2: 332, actual: true },
      { q: "Q4-2025", scope1: 215, scope2: 325, actual: true },
      { q: "Q1-2026", scope1: 212, scope2: 320, actual: false },
      { q: "Q2-2026", scope1: 208, scope2: 315, actual: false },
      { q: "Q3-2026", scope1: 210, scope2: 318, actual: false },
      { q: "Q4-2026", scope1: 214, scope2: 322, actual: false },
    ]
  },
  pinnacle: {
    baseYearTotal: 2800,
    target2030: 1624,
    quarters: [
      { q: "Q1-2024", scope1: 410, scope2: 300, actual: true },
      { q: "Q2-2024", scope1: 395, scope2: 290, actual: true },
      { q: "Q3-2024", scope1: 400, scope2: 295, actual: true },
      { q: "Q4-2024", scope1: 395, scope2: 315, actual: true },
      { q: "Q1-2025", scope1: 405, scope2: 305, actual: true },
      { q: "Q2-2025", scope1: 390, scope2: 288, actual: true },
      { q: "Q3-2025", scope1: 398, scope2: 295, actual: true },
      { q: "Q4-2025", scope1: 385, scope2: 290, actual: true },
      { q: "Q1-2026", scope1: 380, scope2: 285, actual: false },
      { q: "Q2-2026", scope1: 370, scope2: 275, actual: false },
      { q: "Q3-2026", scope1: 375, scope2: 280, actual: false },
      { q: "Q4-2026", scope1: 382, scope2: 288, actual: false },
    ]
  },
  harvest: {
    baseYearTotal: 4700,
    target2030: 2726,
    quarters: [
      { q: "Q1-2024", scope1: 620, scope2: 545, actual: true },
      { q: "Q2-2024", scope1: 600, scope2: 530, actual: true },
      { q: "Q3-2024", scope1: 640, scope2: 560, actual: true },
      { q: "Q4-2024", scope1: 650, scope2: 555, actual: true },
      { q: "Q1-2025", scope1: 660, scope2: 565, actual: true },
      { q: "Q2-2025", scope1: 635, scope2: 545, actual: true },
      { q: "Q3-2025", scope1: 655, scope2: 560, actual: true },
      { q: "Q4-2025", scope1: 670, scope2: 575, actual: true },
      { q: "Q1-2026", scope1: 675, scope2: 580, actual: false },
      { q: "Q2-2026", scope1: 650, scope2: 555, actual: false },
      { q: "Q3-2026", scope1: 660, scope2: 565, actual: false },
      { q: "Q4-2026", scope1: 672, scope2: 578, actual: false },
    ]
  },
  ridgeline: {
    baseYearTotal: 2250,
    target2030: 1305,
    quarters: [
      { q: "Q1-2024", scope1: 115, scope2: 455, actual: true },
      { q: "Q2-2024", scope1: 108, scope2: 440, actual: true },
      { q: "Q3-2024", scope1: 112, scope2: 460, actual: true },
      { q: "Q4-2024", scope1: 115, scope2: 445, actual: true },
      { q: "Q1-2025", scope1: 118, scope2: 460, actual: true },
      { q: "Q2-2025", scope1: 110, scope2: 445, actual: true },
      { q: "Q3-2025", scope1: 114, scope2: 458, actual: true },
      { q: "Q4-2025", scope1: 120, scope2: 465, actual: true },
      { q: "Q1-2026", scope1: 122, scope2: 468, actual: false },
      { q: "Q2-2026", scope1: 115, scope2: 450, actual: false },
      { q: "Q3-2026", scope1: 118, scope2: 455, actual: false },
      { q: "Q4-2026", scope1: 124, scope2: 470, actual: false },
    ]
  }
};

// ─────────────────────────────────────────────
// SCOPE 1 SOURCE BREAKDOWN (annual)
// ─────────────────────────────────────────────

export const SCOPE1_SOURCES = {
  meridian: [
    { source: "Natural Gas", tco2e: 610, pct: 81.3 },
    { source: "Fleet Gasoline", tco2e: 95, pct: 12.7 },
    { source: "Fleet Diesel", tco2e: 45, pct: 6.0 },
  ],
  sterling: [
    { source: "Natural Gas", tco2e: 3150, pct: 75.0 },
    { source: "Diesel (Stationary)", tco2e: 420, pct: 10.0 },
    { source: "Fleet Diesel", tco2e: 294, pct: 7.0 },
    { source: "R-22 Refrigerant", tco2e: 168, pct: 4.0 },
    { source: "Fleet Gasoline", tco2e: 84, pct: 2.0 },
    { source: "Propane", tco2e: 84, pct: 2.0 },
  ],
  novacare: [
    { source: "Natural Gas", tco2e: 476, pct: 70.0 },
    { source: "Fleet Gasoline", tco2e: 136, pct: 20.0 },
    { source: "Propane", tco2e: 68, pct: 10.0 },
  ],
  trident: [
    { source: "Natural Gas", tco2e: 192, pct: 60.0 },
    { source: "Diesel (Backup Gen)", tco2e: 96, pct: 30.0 },
    { source: "Fleet Gasoline", tco2e: 32, pct: 10.0 },
  ],
  clearview: [
    { source: "Fleet Diesel", tco2e: 1400, pct: 50.0 },
    { source: "Fleet Gasoline", tco2e: 560, pct: 20.0 },
    { source: "Natural Gas", tco2e: 560, pct: 20.0 },
    { source: "Diesel (Stationary)", tco2e: 280, pct: 10.0 },
  ],
  patriot: [
    { source: "Natural Gas", tco2e: 286, pct: 55.0 },
    { source: "Fleet Gasoline", tco2e: 156, pct: 30.0 },
    { source: "Fleet Diesel", tco2e: 78, pct: 15.0 },
  ],
  keystone: [
    { source: "Natural Gas", tco2e: 585, pct: 65.0 },
    { source: "Fleet Gasoline", tco2e: 180, pct: 20.0 },
    { source: "Propane", tco2e: 90, pct: 10.0 },
    { source: "Fleet Diesel", tco2e: 45, pct: 5.0 },
  ],
  pinnacle: [
    { source: "Fleet Diesel", tco2e: 800, pct: 50.0 },
    { source: "Fleet Gasoline", tco2e: 320, pct: 20.0 },
    { source: "Natural Gas", tco2e: 320, pct: 20.0 },
    { source: "Diesel (Stationary)", tco2e: 160, pct: 10.0 },
  ],
  harvest: [
    { source: "Natural Gas", tco2e: 2125, pct: 85.0 },
    { source: "Diesel (Stationary)", tco2e: 175, pct: 7.0 },
    { source: "Fleet Diesel", tco2e: 100, pct: 4.0 },
    { source: "Fleet Gasoline", tco2e: 50, pct: 2.0 },
    { source: "Propane", tco2e: 50, pct: 2.0 },
  ],
  ridgeline: [
    { source: "Natural Gas", tco2e: 315, pct: 70.0 },
    { source: "Fleet Gasoline", tco2e: 68, pct: 15.0 },
    { source: "Fleet Diesel", tco2e: 45, pct: 10.0 },
    { source: "Propane", tco2e: 22, pct: 5.0 },
  ]
};

// ─────────────────────────────────────────────
// REDUCTION INITIATIVES (key projects per portco)
// ─────────────────────────────────────────────

export const INITIATIVES = {
  meridian: [
    { id: 1, name: "LED retrofit — Chicago HQ + 4 offices", status: "complete", estReduction: 42, capex: 85, startDate: "Q2-2025", category: "Energy Efficiency" },
    { id: 2, name: "Green electricity contract — 6 Southern offices", status: "in_progress", estReduction: 180, capex: 0, startDate: "Q1-2026", category: "Renewable Energy" },
    { id: 3, name: "HVAC upgrade — Minneapolis, Detroit", status: "planned", estReduction: 65, capex: 320, startDate: "Q3-2026", category: "Energy Efficiency" },
    { id: 4, name: "Fleet EV transition — 5 management vehicles", status: "planned", estReduction: 18, capex: 210, startDate: "Q1-2027", category: "Fleet" },
  ],
  sterling: [
    { id: 1, name: "R-22 chiller replacement — Akron", status: "in_progress", estReduction: 70, capex: 60, startDate: "Q4-2025", category: "Refrigerant" },
    { id: 2, name: "Compressed air VFDs — all plants", status: "complete", estReduction: 220, capex: 150, startDate: "Q3-2025", category: "Energy Efficiency" },
    { id: 3, name: "LED retrofit — Akron + Elyria", status: "complete", estReduction: 180, capex: 220, startDate: "Q2-2025", category: "Energy Efficiency" },
    { id: 4, name: "VPPA / Green tariff — Akron rooftop", status: "planned", estReduction: 2400, capex: 0, startDate: "Q2-2026", category: "Renewable Energy" },
    { id: 5, name: "Heat pump space heating", status: "planned", estReduction: 520, capex: 850, startDate: "Q1-2027", category: "Process Optimization" },
    { id: 6, name: "Electric induction heat treat", status: "planned", estReduction: 640, capex: 1100, startDate: "Q3-2027", category: "Process Optimization" },
  ],
  novacare: [
    { id: 1, name: "LED + smart thermostats — 30 clinics", status: "in_progress", estReduction: 85, capex: 120, startDate: "Q1-2026", category: "Energy Efficiency" },
    { id: 2, name: "Green electricity contract — SE clinics", status: "planned", estReduction: 165, capex: 0, startDate: "Q3-2026", category: "Renewable Energy" },
    { id: 3, name: "Fleet optimization — PT vehicle routes", status: "planned", estReduction: 40, capex: 0, startDate: "Q2-2026", category: "Fleet" },
  ],
  trident: [
    { id: 1, name: "Data center efficiency — Austin SOC", status: "in_progress", estReduction: 95, capex: 180, startDate: "Q4-2025", category: "Energy Efficiency" },
    { id: 2, name: "Green electricity contract — Tysons HQ", status: "complete", estReduction: 210, capex: 0, startDate: "Q3-2025", category: "Renewable Energy" },
    { id: 3, name: "Remote work policy expansion", status: "planned", estReduction: 45, capex: 0, startDate: "Q1-2026", category: "Operational" },
  ],
  clearview: [
    { id: 1, name: "Fleet diesel-to-hybrid transition — Phase 1", status: "in_progress", estReduction: 280, capex: 420, startDate: "Q1-2026", category: "Fleet" },
    { id: 2, name: "Lab equipment upgrade — Phoenix", status: "complete", estReduction: 120, capex: 95, startDate: "Q3-2025", category: "Energy Efficiency" },
    { id: 3, name: "Route optimization software", status: "in_progress", estReduction: 140, capex: 35, startDate: "Q4-2025", category: "Fleet" },
    { id: 4, name: "Solar PPA — Denver HQ", status: "planned", estReduction: 60, capex: 0, startDate: "Q3-2026", category: "Renewable Energy" },
  ],
  patriot: [
    { id: 1, name: "LED retrofit — 10 branch offices", status: "planned", estReduction: 35, capex: 65, startDate: "Q2-2026", category: "Energy Efficiency" },
    { id: 2, name: "Fleet consolidation — Midwest routes", status: "planned", estReduction: 25, capex: 0, startDate: "Q3-2026", category: "Fleet" },
    { id: 3, name: "HVAC scheduling optimization", status: "planned", estReduction: 20, capex: 12, startDate: "Q4-2026", category: "Energy Efficiency" },
  ],
  keystone: [
    { id: 1, name: "Smart HVAC controls — 14 SE clinics", status: "in_progress", estReduction: 75, capex: 95, startDate: "Q1-2026", category: "Energy Efficiency" },
    { id: 2, name: "LED retrofit — all clinics", status: "planned", estReduction: 55, capex: 80, startDate: "Q3-2026", category: "Energy Efficiency" },
    { id: 3, name: "Green electricity contract — Nashville HQ", status: "planned", estReduction: 45, capex: 0, startDate: "Q1-2027", category: "Renewable Energy" },
  ],
  pinnacle: [
    { id: 1, name: "Fleet GPS + route optimization", status: "in_progress", estReduction: 110, capex: 45, startDate: "Q4-2025", category: "Fleet" },
    { id: 2, name: "Fleet diesel-to-hybrid — 8 inspection trucks", status: "planned", estReduction: 200, capex: 560, startDate: "Q2-2026", category: "Fleet" },
    { id: 3, name: "Lab energy audit + upgrades", status: "planned", estReduction: 65, capex: 90, startDate: "Q3-2026", category: "Energy Efficiency" },
  ],
  harvest: [
    { id: 1, name: "Boiler efficiency / economizer — Nashville", status: "in_progress", estReduction: 240, capex: 180, startDate: "Q4-2025", category: "Process Optimization" },
    { id: 2, name: "Refrigeration optimization — Bowling Green", status: "planned", estReduction: 160, capex: 120, startDate: "Q3-2026", category: "Energy Efficiency" },
    { id: 3, name: "VFDs on pumps/fans — all plants", status: "planned", estReduction: 175, capex: 160, startDate: "Q2-2026", category: "Energy Efficiency" },
    { id: 4, name: "VPPA / Green tariff — Murfreesboro", status: "planned", estReduction: 2100, capex: 0, startDate: "Q1-2027", category: "Renewable Energy" },
    { id: 5, name: "Waste heat recovery — Nashville", status: "planned", estReduction: 210, capex: 280, startDate: "Q4-2026", category: "Process Optimization" },
    { id: 6, name: "Steam trap maintenance program", status: "complete", estReduction: 40, capex: 15, startDate: "Q3-2025", category: "Process Optimization" },
  ],
  ridgeline: [
    { id: 1, name: "Building energy benchmarking — managed portfolio", status: "in_progress", estReduction: 0, capex: 35, startDate: "Q1-2026", category: "Measurement" },
    { id: 2, name: "LED + controls — CO managed properties", status: "planned", estReduction: 95, capex: 180, startDate: "Q3-2026", category: "Energy Efficiency" },
    { id: 3, name: "Green lease clauses — new tenants", status: "planned", estReduction: 120, capex: 0, startDate: "Q2-2026", category: "Operational" },
    { id: 4, name: "HVAC upgrades — NYC portfolio (BPS compliance)", status: "planned", estReduction: 85, capex: 1800, startDate: "Q1-2027", category: "Regulatory" },
  ]
};
