export const Q2_QUESTION = {
  id: 'Q2',
  text: 'How has treatment adoption grown year over year?',
  brand: 'Dupixent',
  indication: 'COPD',
  dataWindow: '2022 – 2025 (Full Calendar Years)',
};

export const Q2_KPI_BANNER = [
  {
    label: 'Treated 2022 (Baseline)',
    value: '34,906',
    detail: 'First full year tracked',
  },
  {
    label: 'Treated 2025',
    value: '72,895',
    detail: 'Most recent full year',
  },
  {
    label: 'Total Growth',
    value: '+109%',
    detail: '2022 → 2025',
  },
  {
    label: 'CAGR',
    value: '~27.8%',
    detail: 'Compound annual growth rate',
  },
  {
    label: 'Peak Year Adds',
    value: '37,221',
    detail: '2025 — highest single-year increment',
  },
];

export const Q2_TREND_DATA = [
  {
    year: 2022,
    universe: '9.94M',
    treated: 34_906,
    penetration: '0.35%',
    yoy: null,
    phase: 'baseline',
  },
  {
    year: 2023,
    universe: '10.14M',
    treated: 48_935,
    penetration: '0.48%',
    yoy: '+40.2%',
    phase: 'rapid_uptake',
  },
  {
    year: 2024,
    universe: '9.40M',
    treated: 57_725,
    penetration: '0.61%',
    yoy: '+18.0%',
    phase: 'moderation',
  },
  {
    year: 2025,
    universe: '8.75M',
    treated: 72_895,
    penetration: '0.83%',
    yoy: '+26.3%',
    phase: 'moderation',
    reaccelFlag: true,
  },
];

export const Q2_PARTIAL_2026 = {
  year: 2026,
  period: 'Jan – Apr',
  treated: 48_587,
  annualizedRunRate: '~145,761',
  annotation: 'Partial year — excluded from trend; annualized run-rate shown for context only.',
};

export const Q2_FLAGS = {
  reaccelFlag: true,
  priorLineTrendFlag: false,
  rxMeasMarketShareAvailable: false,
  patentCliffYear: 2031,
};

export const Q2_INSIGHT_PARAGRAPHS = [
  'Dupixent adoption in COPD has grown 109% over four calendar years (2022–2025), representing a compound annual growth rate of approximately 27.8%. From a baseline of 34,906 treated patients in 2022, the brand has more than doubled its footprint to 72,895 patients by the end of 2025. This trajectory confirms Dupixent is in a sustained commercial build phase, not a one-time launch spike.',

  'The year-over-year pattern reveals three distinct phases. In 2023, growth surged +40.2% as initial post-launch momentum and formulary wins drove rapid uptake. Growth moderated to +18.0% in 2024 — a pattern consistent with cross-indication tailwind normalizing as the early-adopter physician cohort was largely penetrated, not a signal of market maturation. Critically, 2025 reversed the deceleration with +26.3% growth and 37,221 new patient adds — the highest single-year increment in the dataset. This re-acceleration is the most commercially significant signal in the data: it indicates the brand is finding new prescriber pools or expanding within existing accounts, and that the 2024 moderation was a temporary plateau rather than a ceiling.',

  'Early 2026 data (Jan–Apr: 48,587 patients) annualizes to approximately 145,761 treated patients, roughly double the 2025 full-year count. While partial-year figures should be interpreted cautiously, the run-rate confirms the re-acceleration trend is sustaining into the current period. With Dupixent\'s patent cliff at 2031, the brand team has a five-year commercial window to maximize penetration before potential biosimilar entry reshapes the competitive landscape.',
];

export const Q2_WATCH_SIGNALS = [
  {
    title: 'Re-Acceleration Confirmed (2025)',
    text: '2025 YoY growth (+26.3%) exceeded 2024 (+18.0%), reversing the deceleration trend. This re-acceleration flag signals expanding prescriber adoption or new patient segments entering the treatment funnel. Investigate what drove the inflection — new clinical data, guideline changes, or field-force realignment.',
  },
  {
    title: 'Patent Cliff — 2031 Urgency Window',
    text: 'With biosimilar entry possible after 2031, the brand team has approximately five full commercial years to maximize penetration. Growth strategy should front-load patient acquisition and build switching costs (data continuity, refill programs) to defend share post-LOE.',
  },
];

export const Q2_FOLLOW_ON_QUESTIONS = [
  { id: 'Q1', text: 'How large is the patient universe, and what share is currently treated?' },
  { id: 'Q3', text: 'How does treatment penetration compare vs. the eligible patient pool?' },
  { id: 'Q9', text: 'Which prescriber segments are driving the re-acceleration?' },
  { id: 'Q12', text: 'What is the payer mix and prior-auth approval rate trend?' },
];

export const Q2_ENGINE_TABLES = {
  trendSummary: {
    title: 'Adoption Trend — Dupixent in COPD (YoY)',
    subtitle: 'IRON_POC_TREND_COPD_Dupixent · 5 rows',
    columns: ['Year', 'Universe', 'Treated', 'Penetration', 'YoY Growth', 'Phase'],
    rows: [
      { year: '2022', universe: '9,940,000', treated: '34,906', penetration: '0.35%', yoy: '—', phase: 'Baseline' },
      { year: '2023', universe: '10,140,000', treated: '48,935', penetration: '0.48%', yoy: '+40.2%', phase: 'Rapid Uptake' },
      { year: '2024', universe: '9,400,000', treated: '57,725', penetration: '0.61%', yoy: '+18.0%', phase: 'Moderation' },
      { year: '2025', universe: '8,750,000', treated: '72,895', penetration: '0.83%', yoy: '+26.3%', phase: 'Re-acceleration' },
      { year: '2026*', universe: '—', treated: '48,587', penetration: '—', yoy: '—', phase: 'Partial (Jan–Apr)' },
    ],
  },
  kpiOutput: {
    title: 'KPI Output — Growth Metrics',
    subtitle: 'IRON_POC_KPI_COPD_Dupixent_GROWTH · 6 rows',
    columns: ['Metric', 'Value'],
    rows: [
      { metric: 'treated_N_first', value: '34,906 (2022)' },
      { metric: 'treated_N_last', value: '72,895 (2025)' },
      { metric: 'total_growth_pct', value: '+109%' },
      { metric: 'cagr_pct', value: '~27.8%' },
      { metric: 'peak_single_year_adds', value: '37,221 (2025)' },
      { metric: 'patent_cliff_year', value: '2031' },
    ],
  },
};
