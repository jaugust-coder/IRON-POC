export const IRON_TOOLS = [
  {
    id: 'market-landscape',
    name: 'Market Landscape',
    description: 'Patient & Market Navigator — size the patient universe, segment by treatment step, and benchmark competitive positioning.',
  },
  {
    id: 'prescriber-intel',
    name: 'Prescriber Intelligence',
    description: 'Identify top prescribers, referral networks, and territory-level opportunity.',
    disabled: true,
  },
  {
    id: 'payer-access',
    name: 'Payer & Access',
    description: 'Coverage landscape, formulary status, and prior-auth friction analysis.',
    disabled: true,
  },
];

export const THERAPEUTIC_AREAS = [
  { id: 'copd', name: 'COPD', patientCount: '23.4M' },
  { id: 'asthma', name: 'Asthma', patientCount: '27.1M', disabled: true },
  { id: 'atopic-derm', name: 'Atopic Dermatitis', patientCount: '9.8M', disabled: true },
  { id: 'crswnp', name: 'CRSwNP', patientCount: '1.2M', disabled: true },
];

export const DRUGS = [
  { id: 'dupixent', name: 'Dupixent', genericName: 'dupilumab', manufacturer: 'Sanofi / Regeneron' },
  { id: 'tezspire', name: 'Tezspire', genericName: 'tezepelumab', manufacturer: 'AstraZeneca / Amgen', disabled: true },
  { id: 'fasenra', name: 'Fasenra', genericName: 'benralizumab', manufacturer: 'AstraZeneca', disabled: true },
  { id: 'nucala', name: 'Nucala', genericName: 'mepolizumab', manufacturer: 'GSK', disabled: true },
];

export const TIMEFRAMES = [
  { id: '2025', label: 'Full Year 2025', range: 'Jan 1 – Dec 31, 2025' },
  { id: '2025-h1', label: 'H1 2025', range: 'Jan 1 – Jun 30, 2025', disabled: true },
  { id: '2024', label: 'Full Year 2024', range: 'Jan 1 – Dec 31, 2024', disabled: true },
];

export const PROCESSING_STEPS = [
  { label: 'Connecting to HealthNexus data warehouse', duration: 2000 },
  { label: 'Querying COPD patient universe (23.4M records)', duration: 3000 },
  { label: 'Segmenting by Dupixent treatment status', duration: 2500 },
  { label: 'Building eosinophil cohort analysis', duration: 3000 },
  { label: 'Calculating penetration metrics', duration: 1500 },
  { label: 'Generating AI-powered insights', duration: 3000 },
];

export type WizardStep = 'tool' | 'ta' | 'drug' | 'timeframe' | 'summary' | 'processing' | 'results';

export type WizardSelections = {
  tool: string | null;
  ta: string | null;
  drugs: string[];
  timeframe: string | null;
};
