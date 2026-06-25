export const Q1_QUESTION = {
  id: 'Q1',
  text: 'How large is the patient universe, and what share is currently treated?',
  brand: 'Dupixent',
  indication: 'COPD',
  dataWindow: 'Full Year 2025 (Jan 1 – Dec 31)',
};

export const Q1_KPI_BANNER = [
  {
    label: 'Total COPD Universe',
    value: '23.4M',
    detail: '23,429,388 patients',
  },
  {
    label: 'On Dupixent',
    value: '136,066',
    detail: 'Currently treated',
  },
  {
    label: 'Untreated Ratio',
    value: '99.4%',
    detail: 'Not on Dupixent',
  },
  {
    label: 'Dupixent Penetration',
    value: '0.58%',
    detail: 'Among all COPD patients',
  },
  {
    label: 'Eligible Penetration',
    value: '~110%',
    detail: 'vs. broader Step 3B pool (123,592)',
  },
];

export const Q1_INSIGHT_PARAGRAPHS = [
  'The COPD patient universe captured in HealthNexus totals approximately 23.4 million patients over the most recent 12-month claims window. Within that universe, Dupixent has established a foothold of 136,066 treated patients, representing a penetration rate of just 0.58%. Over 99% of diagnosed COPD patients remain untreated with Dupixent, underscoring the very early stage of commercial uptake in this indication.',
  'The eosinophil cohort analysis reveals important sub-population dynamics. Of the roughly 23.6 million eos-evaluated COPD patients, 191,922 meet an initial eosinophil threshold (Step 2A), and only 15,196 meet the most stringent biologic-eligible criteria at Step 3A (higher eos plus advanced therapy stepping). A broader eos-based eligibility definition captures 123,592 patients at Step 3B. The fact that 136,066 patients are currently on Dupixent — a figure that exceeds the narrow Step 3A pool but closely aligns with the broader Step 3B pool — suggests prescribing is already extending beyond the most restrictive label-aligned criteria into a wider eos-elevated population.',
  'For the brand team, these numbers present a dual opportunity. First, even within the broadest biologic-eligible segment, penetration is essentially at parity (~110%), meaning there is still room to capture remaining eligible patients and deepen share. Second, the vast 23.4M universe represents a long-term expansion opportunity as clinical evidence, guideline updates, and payer coverage evolve. Near-term growth will likely come from converting the remaining biologic-eligible patients in the 123K–192K eos segments, while longer-term growth requires moving the eligibility frontier outward.',
];

export const Q1_WATCH_SIGNALS = [
  {
    title: 'Eligibility Creep vs. Label Alignment',
    text: 'Current Dupixent-treated volume (136K) already surpasses the narrowest eos-defined eligible pool (15K), suggesting off-criteria prescribing. Monitor payer pushback and prior authorization denial rates.',
  },
  {
    title: 'Competitive Biologic Entry',
    text: 'With over 99% of the COPD universe untreated by any biologic and a sizable eos-elevated sub-population still available, this market is highly attractive to competitors. Monitor pipeline biologics (anti-IL-5, anti-TSLP) for launch timelines.',
  },
];

export const Q1_FOLLOW_ON_QUESTIONS = [
  { id: 'Q2', text: 'Which therapy steps have the highest unmet need?' },
  { id: 'Q3', text: 'What is the eosinophil distribution across the COPD universe?' },
  { id: 'Q6', text: 'How does Dupixent switching compare to competitor biologics?' },
];

export const Q1_ENGINE_TABLES = {
  dupixentYN: {
    title: 'P&MN Step Summary — Dupixent Y/N',
    subtitle: 'IRON_POC_STEP_SUM_COPD_Dupixent_YN · 12 rows',
    rows: [
      { dataSource: 'OPEN/CLOSED', group: 'COHORT A', step: 'STEP 1', patients: 23_429_388, claims: 197_697_278, encounters: 243_456_108 },
      { dataSource: 'OPEN/CLOSED', group: 'COHORT A', step: 'STEP 2A', patients: 136_066, claims: 1_606_881, encounters: 40_367 },
      { dataSource: 'OPEN/CLOSED', group: 'COHORT B', step: 'STEP 1', patients: 23_429_388, claims: 197_697_278, encounters: 243_456_108 },
      { dataSource: 'OPEN/CLOSED', group: 'COHORT B', step: 'STEP 2B', patients: 23_293_322, claims: 195_515_139, encounters: 241_197_200 },
    ],
  },
  eosino: {
    title: 'Eos Cohort Step Summary',
    subtitle: 'IRON_POC_STEP_SUM_COPD_EOSINO · 18 rows',
    rows: [
      { dataSource: 'OPEN/CLOSED', group: 'COHORT A', step: 'STEP 1', patients: 23_627_105, claims: 314_654_569, encounters: 244_113_208 },
      { dataSource: 'OPEN/CLOSED', group: 'COHORT A', step: 'STEP 2A', patients: 191_922, claims: 1_315_398, encounters: 799_502 },
      { dataSource: 'OPEN/CLOSED', group: 'COHORT A', step: 'STEP 3A', patients: 15_196, claims: 280_432, encounters: 6_281 },
      { dataSource: 'OPEN/CLOSED', group: 'COHORT B', step: 'STEP 1', patients: 23_627_105, claims: 314_654_569, encounters: 244_113_208 },
      { dataSource: 'OPEN/CLOSED', group: 'COHORT B', step: 'STEP 2B', patients: 23_435_183, claims: 309_124_197, encounters: 240_835_096 },
      { dataSource: 'OPEN/CLOSED', group: 'COHORT B', step: 'STEP 3B', patients: 123_592, claims: 2_059_150, encounters: 34_595 },
    ],
  },
};
