// data.js — Northwood Capital Partners: KPI Tracking Dataset
// 3 priority portcos, 2 quarters, budget vs. actuals with climate + financial KPIs
// Generated from Northwood engagement data (carbon inventory, financials, KPIs)

export const PORTCOS = {
  meridian: {
    name: "Meridian Business Solutions",
    slug: "meridian",
    sector: "Business Services",
    fund: "Fund I",
    status: "Exit Prep",
    ceo: "David Harrington",
    cfo: "Patricia Wells",
    headcount: 580,
    facilities: 16,
    totalEmissions: 1_842, // tCO2e (Scope 1 + 2 combined from carbon inventory)
    emissionsNote: "Office-heavy portfolio — Scope 2 dominant (95%). Grade A data quality."
  },
  sterling: {
    name: "Sterling Precision Manufacturing",
    slug: "sterling",
    sector: "Industrial Technology",
    fund: "Fund I",
    status: "Strong",
    ceo: "Robert Kline",
    cfo: "Janet Chen",
    headcount: 420,
    facilities: 3,
    totalEmissions: 5_284, // tCO2e — manufacturing-heavy, highest Scope 1 in portfolio
    emissionsNote: "Manufacturing-intensive — Scope 1 is 38% (natural gas, diesel, R-22 refrigerant). Grade A data."
  },
  harvest: {
    name: "Harvest Ridge Foods",
    slug: "harvest",
    sector: "Food & Agriculture",
    fund: "Fund II",
    status: "100-Day Plan",
    ceo: "Margaret Connelly",
    cfo: "Thomas Nguyen",
    headcount: 335,
    facilities: 5,
    totalEmissions: 6_115, // tCO2e — boilers run 18hr/day at Nashville plant
    emissionsNote: "Highest portfolio emitter. Nashville plant gas load (185K therms) is single largest source. Grade A data."
  }
};

// KPI definitions — what each metric means, units, and direction
export const KPI_DEFS = {
  // Financial
  revenue:            { label: "Revenue",              unit: "$M",    format: "money",  direction: "up",   category: "financial" },
  adj_ebitda:         { label: "Adj. EBITDA",          unit: "$M",    format: "money",  direction: "up",   category: "financial" },
  ebitda_margin:      { label: "EBITDA Margin",        unit: "%",     format: "pct",    direction: "up",   category: "financial" },
  gross_margin:       { label: "Gross Margin",         unit: "%",     format: "pct",    direction: "up",   category: "financial" },
  fcf:                { label: "Free Cash Flow",       unit: "$M",    format: "money",  direction: "up",   category: "financial" },
  headcount:          { label: "Headcount",            unit: "",      format: "int",    direction: "neutral", category: "financial" },

  // Climate / Energy
  total_emissions:    { label: "Total Emissions",      unit: "tCO2e", format: "int",    direction: "down", category: "climate" },
  scope1:             { label: "Scope 1",              unit: "tCO2e", format: "int",    direction: "down", category: "climate" },
  scope2:             { label: "Scope 2",              unit: "tCO2e", format: "int",    direction: "down", category: "climate" },
  emissions_intensity:{ label: "Emissions Intensity",  unit: "tCO2e/$M", format: "dec1", direction: "down", category: "climate" },
  energy_cost:        { label: "Energy Cost",          unit: "$K",    format: "money",  direction: "down", category: "climate" },
  energy_per_sqft:    { label: "Energy / Sq Ft",       unit: "kBtu",  format: "dec1",   direction: "down", category: "climate" },
};

// Two quarters of data: Q3 2025 and Q4 2025
// Each entry: { actual, budget, prior_year (Q from prior year, if available) }
export const QUARTERLY_DATA = {
  meridian: {
    "Q3-2025": {
      revenue:             { actual: 54.8, budget: 54.0, prior: 50.2 },
      adj_ebitda:          { actual: 9.1,  budget: 8.8,  prior: 8.3 },
      ebitda_margin:       { actual: 16.6, budget: 16.3, prior: 16.5 },
      gross_margin:        { actual: 30.2, budget: 29.4, prior: 29.8 },
      fcf:                 { actual: 7.9,  budget: 7.5,  prior: 7.0 },
      headcount:           { actual: 572,  budget: 570,  prior: 548 },
      total_emissions:     { actual: 468,  budget: 480,  prior: 475 },
      scope1:              { actual: 22,   budget: 24,   prior: 25 },
      scope2:              { actual: 446,  budget: 456,  prior: 450 },
      emissions_intensity: { actual: 8.5,  budget: 8.9,  prior: 9.5 },
      energy_cost:         { actual: 285,  budget: 295,  prior: 278 },
      energy_per_sqft:     { actual: 42.1, budget: 43.5, prior: 43.8 },
    },
    "Q4-2025": {
      revenue:             { actual: 57.2, budget: 56.5, prior: 52.8 },
      adj_ebitda:          { actual: 9.8,  budget: 9.4,  prior: 8.8 },
      ebitda_margin:       { actual: 17.1, budget: 16.6, prior: 16.7 },
      gross_margin:        { actual: 30.8, budget: 30.0, prior: 30.1 },
      fcf:                 { actual: 8.4,  budget: 8.0,  prior: 7.5 },
      headcount:           { actual: 580,  budget: 575,  prior: 555 },
      total_emissions:     { actual: 452,  budget: 470,  prior: 465 },
      scope1:              { actual: 21,   budget: 23,   prior: 24 },
      scope2:              { actual: 431,  budget: 447,  prior: 441 },
      emissions_intensity: { actual: 7.9,  budget: 8.3,  prior: 8.8 },
      energy_cost:         { actual: 272,  budget: 288,  prior: 275 },
      energy_per_sqft:     { actual: 40.8, budget: 42.0, prior: 42.5 },
    }
  },

  sterling: {
    "Q3-2025": {
      revenue:             { actual: 40.5, budget: 43.0, prior: 38.2 },
      adj_ebitda:          { actual: 7.1,  budget: 7.8,  prior: 6.5 },
      ebitda_margin:       { actual: 17.5, budget: 18.1, prior: 17.0 },
      gross_margin:        { actual: 31.8, budget: 32.5, prior: 31.2 },
      fcf:                 { actual: 3.9,  budget: 4.2,  prior: 3.5 },
      headcount:           { actual: 415,  budget: 435,  prior: 395 },
      total_emissions:     { actual: 1_345, budget: 1_380, prior: 1_410 },
      scope1:              { actual: 518,  budget: 530,  prior: 545 },
      scope2:              { actual: 827,  budget: 850,  prior: 865 },
      emissions_intensity: { actual: 33.2, budget: 32.1, prior: 36.9 },
      energy_cost:         { actual: 685,  budget: 710,  prior: 662 },
      energy_per_sqft:     { actual: 128.5, budget: 125.0, prior: 132.0 },
    },
    "Q4-2025": {
      revenue:             { actual: 41.8, budget: 44.5, prior: 39.5 },
      adj_ebitda:          { actual: 7.5,  budget: 8.4,  prior: 6.9 },
      ebitda_margin:       { actual: 17.9, budget: 18.9, prior: 17.5 },
      gross_margin:        { actual: 32.2, budget: 33.2, prior: 31.8 },
      fcf:                 { actual: 4.2,  budget: 4.5,  prior: 3.8 },
      headcount:           { actual: 420,  budget: 440,  prior: 400 },
      total_emissions:     { actual: 1_310, budget: 1_350, prior: 1_385 },
      scope1:              { actual: 502,  budget: 520,  prior: 535 },
      scope2:              { actual: 808,  budget: 830,  prior: 850 },
      emissions_intensity: { actual: 31.3, budget: 30.3, prior: 35.1 },
      energy_cost:         { actual: 672,  budget: 695,  prior: 655 },
      energy_per_sqft:     { actual: 126.0, budget: 122.0, prior: 130.5 },
    }
  },

  harvest: {
    "Q3-2025": {
      revenue:             { actual: 37.2, budget: 37.5, prior: 35.8 },
      adj_ebitda:          { actual: 5.4,  budget: 5.8,  prior: 5.3 },
      ebitda_margin:       { actual: 14.5, budget: 15.5, prior: 14.8 },
      gross_margin:        { actual: 32.5, budget: 33.8, prior: 33.0 },
      fcf:                 { actual: 2.4,  budget: 2.9,  prior: 2.6 },
      headcount:           { actual: 328,  budget: 340,  prior: 310 },
      total_emissions:     { actual: 1_565, budget: 1_520, prior: 1_480 },
      scope1:              { actual: 678,  budget: 640,  prior: 620 },
      scope2:              { actual: 887,  budget: 880,  prior: 860 },
      emissions_intensity: { actual: 42.1, budget: 40.5, prior: 41.3 },
      energy_cost:         { actual: 542,  budget: 510,  prior: 495 },
      energy_per_sqft:     { actual: 155.2, budget: 148.0, prior: 150.5 },
    },
    "Q4-2025": {
      revenue:             { actual: 38.5, budget: 38.0, prior: 36.5 },
      adj_ebitda:          { actual: 5.7,  budget: 5.9,  prior: 5.5 },
      ebitda_margin:       { actual: 14.8, budget: 15.5, prior: 15.1 },
      gross_margin:        { actual: 33.0, budget: 34.2, prior: 33.5 },
      fcf:                 { actual: 2.7,  budget: 3.0,  prior: 2.8 },
      headcount:           { actual: 335,  budget: 340,  prior: 315 },
      total_emissions:     { actual: 1_588, budget: 1_500, prior: 1_470 },
      scope1:              { actual: 695,  budget: 635,  prior: 615 },
      scope2:              { actual: 893,  budget: 865,  prior: 855 },
      emissions_intensity: { actual: 41.2, budget: 39.5, prior: 40.3 },
      energy_cost:         { actual: 558,  budget: 505,  prior: 490 },
      energy_per_sqft:     { actual: 158.0, budget: 146.0, prior: 149.0 },
    }
  }
};
