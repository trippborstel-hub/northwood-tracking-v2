// data.js — Northwood Capital Partners: Emissions Management Dataset
// 3 priority portcos, quarterly emissions tracking, reduction targets & initiatives
// Seeded from actual carbon inventory data (GHG Protocol methodology, EPA factors, eGRID)

export const PORTCOS = {
  meridian: {
    name: "Meridian Business Solutions",
    slug: "meridian",
    sector: "Business Services",
    fund: "Fund I",
    status: "Exit Prep",
    revenue: 225, // $M LTM
    facilities: 16,
    dataGrade: "A",
    dataNote: "75% utility bill, 25% accounting export",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42, // % below base year (SBTi-guided 1.5C pathway)
    color: "#58a6ff"
  },
  sterling: {
    name: "Sterling Precision Manufacturing",
    slug: "sterling",
    sector: "Industrial Technology",
    fund: "Fund I",
    status: "Strong",
    revenue: 168,
    facilities: 3,
    dataGrade: "A",
    dataNote: "100% utility bill data",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#e8724c"
  },
  harvest: {
    name: "Harvest Ridge Foods",
    slug: "harvest",
    sector: "Food & Agriculture",
    fund: "Fund II",
    status: "100-Day Plan",
    revenue: 152,
    facilities: 5,
    dataGrade: "A",
    dataNote: "100% utility bill data",
    baseYear: 2024,
    targetYear: 2030,
    targetReduction: 42,
    color: "#5bb8a4"
  }
};

// ─────────────────────────────────────────────
// FACILITY-LEVEL EMISSIONS (from carbon inventory)
// Scope 1: natural gas, diesel, gasoline, propane, refrigerants, fleet
// Scope 2: purchased electricity (eGRID location-based factors)
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
    { id: "SPM-001", name: "Akron Primary Plant", city: "Akron", state: "OH", type: "Manufacturing HQ", scope1: 1088, scope2: 1703, total: 2791, topSource: "Natural gas (heat-treat) + R-22 chillers" },
    { id: "SPM-002", name: "Elyria Machining", city: "Elyria", state: "OH", type: "Manufacturing", scope1: 714, scope2: 1145, total: 1859, topSource: "Natural gas + electricity (CNC)" },
    { id: "SPM-003", name: "Canton Distribution", city: "Canton", state: "OH", type: "Warehouse", scope1: 294, scope2: 140, total: 434, topSource: "Fleet diesel (8 trucks)" },
  ],
  harvest: [
    { id: "HRF-001", name: "Nashville Plant (HQ)", city: "Nashville", state: "TN", type: "Production HQ", scope1: 1130, scope2: 1178, total: 2308, topSource: "Boilers 18hr/day (185K therms)" },
    { id: "HRF-002", name: "Murfreesboro Plant", city: "Murfreesboro", state: "TN", type: "Production", scope1: 399, scope2: 534, total: 933, topSource: "Natural gas (dressings/condiments)" },
    { id: "HRF-003", name: "Bowling Green Plant", city: "Bowling Green", state: "KY", type: "Production (Organic)", scope1: 397, scope2: 618, total: 1015, topSource: "Electricity + natural gas" },
    { id: "HRF-004", name: "Chattanooga Plant", city: "Chattanooga", state: "TN", type: "Production (Cold-Fill)", scope1: 15, scope2: 773, total: 788, topSource: "All-electric process heat" },
    { id: "HRF-005", name: "Nashville HQ / R&D", city: "Nashville", state: "TN", type: "Office / Lab", scope1: 47, scope2: 35, total: 82, topSource: "Fleet gasoline + natural gas" },
  ]
};

// ─────────────────────────────────────────────
// QUARTERLY EMISSIONS TRAJECTORY
// Base year (2024) through current + forecast
// actuals through Q4 2025, forecast from Q1 2026
// ─────────────────────────────────────────────

export const TRAJECTORY = {
  meridian: {
    baseYearTotal: 1803, // 2024 annual total (tCO2e)
    target2030: 1046,    // 42% reduction
    quarters: [
      // 2024 actuals (base year)
      { q: "Q1-2024", scope1: 122, scope2: 347, actual: true },
      { q: "Q2-2024", scope1: 100, scope2: 315, actual: true },
      { q: "Q3-2024", scope1: 95,  scope2: 340, actual: true },
      { q: "Q4-2024", scope1: 118, scope2: 366, actual: true },
      // 2025 actuals
      { q: "Q1-2025", scope1: 118, scope2: 338, actual: true },
      { q: "Q2-2025", scope1: 96,  scope2: 308, actual: true },
      { q: "Q3-2025", scope1: 92,  scope2: 325, actual: true },
      { q: "Q4-2025", scope1: 110, scope2: 348, actual: true },
      // 2026 forecast
      { q: "Q1-2026", scope1: 112, scope2: 320, actual: false },
      { q: "Q2-2026", scope1: 91,  scope2: 292, actual: false },
      { q: "Q3-2026", scope1: 87,  scope2: 308, actual: false },
      { q: "Q4-2026", scope1: 104, scope2: 330, actual: false },
    ]
  },
  sterling: {
    baseYearTotal: 5284,
    target2030: 3065,
    quarters: [
      { q: "Q1-2024", scope1: 548, scope2: 802, actual: true },
      { q: "Q2-2024", scope1: 510, scope2: 720, actual: true },
      { q: "Q3-2024", scope1: 525, scope2: 745, actual: true },
      { q: "Q4-2024", scope1: 540, scope2: 893, actual: true },
      { q: "Q1-2025", scope1: 535, scope2: 790, actual: true },
      { q: "Q2-2025", scope1: 505, scope2: 710, actual: true },
      { q: "Q3-2025", scope1: 518, scope2: 827, actual: true },
      { q: "Q4-2025", scope1: 502, scope2: 808, actual: true },
      { q: "Q1-2026", scope1: 490, scope2: 760, actual: false },
      { q: "Q2-2026", scope1: 475, scope2: 690, actual: false },
      { q: "Q3-2026", scope1: 485, scope2: 715, actual: false },
      { q: "Q4-2026", scope1: 498, scope2: 780, actual: false },
    ]
  },
  harvest: {
    baseYearTotal: 6115,
    target2030: 3547,
    quarters: [
      { q: "Q1-2024", scope1: 480, scope2: 780, actual: true },
      { q: "Q2-2024", scope1: 465, scope2: 750, actual: true },
      { q: "Q3-2024", scope1: 500, scope2: 810, actual: true },
      { q: "Q4-2024", scope1: 520, scope2: 810, actual: true },
      { q: "Q1-2025", scope1: 530, scope2: 820, actual: true },
      { q: "Q2-2025", scope1: 510, scope2: 790, actual: true },
      { q: "Q3-2025", scope1: 545, scope2: 835, actual: true },
      { q: "Q4-2025", scope1: 558, scope2: 848, actual: true },
      { q: "Q1-2026", scope1: 565, scope2: 855, actual: false },
      { q: "Q2-2026", scope1: 540, scope2: 820, actual: false },
      { q: "Q3-2026", scope1: 555, scope2: 845, actual: false },
      { q: "Q4-2026", scope1: 570, scope2: 860, actual: false },
    ]
  }
};

// ─────────────────────────────────────────────
// SCOPE 1 SOURCE BREAKDOWN (annual, from carbon inventory)
// Used for the "by source" donut/bar chart
// ─────────────────────────────────────────────

export const SCOPE1_SOURCES = {
  meridian: [
    { source: "Natural Gas", tco2e: 689, pct: 79.3 },
    { source: "Fleet Gasoline", tco2e: 28, pct: 3.2 },
    { source: "Other", tco2e: 0, pct: 0 },
  ],
  sterling: [
    { source: "Natural Gas", tco2e: 1590, pct: 75.8 },
    { source: "Diesel (Stationary)", tco2e: 143, pct: 6.8 },
    { source: "Fleet Diesel", tco2e: 122, pct: 5.8 },
    { source: "R-22 Refrigerant", tco2e: 41, pct: 2.0 },
    { source: "Fleet Gasoline", tco2e: 40, pct: 1.9 },
    { source: "Propane", tco2e: 30, pct: 1.4 },
    { source: "R-410A Refrigerant", tco2e: 14, pct: 0.7 },
  ],
  harvest: [
    { source: "Natural Gas", tco2e: 1748, pct: 87.8 },
    { source: "Fleet Diesel", tco2e: 69, pct: 3.5 },
    { source: "Diesel (Stationary)", tco2e: 163, pct: 8.2 },
    { source: "Fleet Gasoline", tco2e: 53, pct: 2.7 },
    { source: "Propane", tco2e: 23, pct: 1.2 },
  ]
};

// ─────────────────────────────────────────────
// REDUCTION INITIATIVES
// Planned and in-progress decarbonization projects
// ─────────────────────────────────────────────

export const INITIATIVES = {
  meridian: [
    { id: 1, name: "LED retrofit — Chicago HQ + 4 offices", status: "complete", estReduction: 42, capex: 85, startDate: "Q2-2025", category: "Energy Efficiency" },
    { id: 2, name: "Green electricity contract — 6 Southern offices", status: "in_progress", estReduction: 180, capex: 0, startDate: "Q1-2026", category: "Renewable Energy" },
    { id: 3, name: "HVAC upgrade — Minneapolis, Detroit", status: "planned", estReduction: 65, capex: 320, startDate: "Q3-2026", category: "Energy Efficiency" },
    { id: 4, name: "Fleet EV transition — 5 management vehicles", status: "planned", estReduction: 18, capex: 210, startDate: "Q1-2027", category: "Fleet" },
  ],
  sterling: [
    { id: 1, name: "R-22 chiller replacement — Akron", status: "in_progress", estReduction: 41, capex: 450, startDate: "Q4-2025", category: "Refrigerant" },
    { id: 2, name: "Compressed air leak remediation — all plants", status: "complete", estReduction: 85, capex: 35, startDate: "Q3-2025", category: "Energy Efficiency" },
    { id: 3, name: "Solar PPA — Akron rooftop (500kW)", status: "planned", estReduction: 310, capex: 0, startDate: "Q2-2026", category: "Renewable Energy" },
    { id: 4, name: "Heat recovery system — heat-treat process", status: "planned", estReduction: 120, capex: 680, startDate: "Q1-2027", category: "Process Optimization" },
    { id: 5, name: "Fleet electrification — 4 of 8 delivery trucks", status: "planned", estReduction: 62, capex: 520, startDate: "Q3-2027", category: "Fleet" },
    { id: 6, name: "LED + occupancy sensors — Elyria plant", status: "in_progress", estReduction: 55, capex: 42, startDate: "Q1-2026", category: "Energy Efficiency" },
  ],
  harvest: [
    { id: 1, name: "Boiler optimization — Nashville plant", status: "in_progress", estReduction: 95, capex: 180, startDate: "Q4-2025", category: "Process Optimization" },
    { id: 2, name: "Solar PPA — Murfreesboro rooftop (400kW)", status: "planned", estReduction: 220, capex: 0, startDate: "Q2-2026", category: "Renewable Energy" },
    { id: 3, name: "Refrigeration upgrade — Bowling Green", status: "planned", estReduction: 75, capex: 390, startDate: "Q3-2026", category: "Energy Efficiency" },
    { id: 4, name: "Fleet consolidation — Nashville routes", status: "planned", estReduction: 35, capex: 0, startDate: "Q1-2026", category: "Fleet" },
    { id: 5, name: "Steam trap maintenance program", status: "complete", estReduction: 40, capex: 15, startDate: "Q3-2025", category: "Process Optimization" },
    { id: 6, name: "Chattanooga renewable electricity contract", status: "planned", estReduction: 310, capex: 0, startDate: "Q1-2027", category: "Renewable Energy" },
  ]
};
