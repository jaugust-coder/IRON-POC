'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  IRON_TOOLS,
  THERAPEUTIC_AREAS,
  DRUGS,
  TIMEFRAMES,
  PROCESSING_STEPS,
  type WizardStep,
  type WizardSelections,
} from '../domain/wizard-data';
import { TargetIcon } from '@purplelab/icons-ui/TargetIcon';
import { IAIcon } from '@purplelab/icons-ui/IAIcon';
import { SearchIcon } from '@purplelab/icons-ui/SearchIcon';
import { CalendarIcon } from '@purplelab/icons-ui/CalendarIcon';
import { CheckIcon } from '@purplelab/icons-ui/CheckIcon';
import { ArrowLeftIcon } from '@purplelab/icons-ui/ArrowLeftIcon';
import { ArrowRightIcon } from '@purplelab/icons-ui/ArrowRightIcon';
import { FilledCircleCheckIcon } from '@purplelab/icons-ui/FilledCircleCheckIcon';
import { ChartLineUpIcon } from '@purplelab/icons-ui/ChartLineUpIcon';
import { ActivityIcon } from '@purplelab/icons-ui/ActivityIcon';
import IronQ1Page from './iron-q1-page';

function StepIndicator({ steps, currentIndex }: { steps: { label: string; key: string }[]; currentIndex: number }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step.key} className="flex items-center gap-2">
          <div
            className={`flex size-7 items-center justify-center rounded-full text-body-xs font-semibold ${
              i < currentIndex
                ? 'bg-action-primary-500 text-white'
                : i === currentIndex
                  ? 'border-2 border-action-primary-500 text-action-primary-500'
                  : 'border border-system-neutral-300 text-system-neutral-400'
            }`}
          >
            {i < currentIndex ? <CheckIcon size="sm" color="default" /> : i + 1}
          </div>
          <span
            className={`hidden text-body-xs sm:inline ${
              i === currentIndex ? 'font-semibold text-system-neutral-900' : 'text-system-neutral-500'
            }`}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && <div className="mx-1 h-px w-6 bg-system-neutral-300" />}
        </div>
      ))}
    </div>
  );
}

function ToolSelectionStep({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-heading-md text-system-neutral-900">Select an Analysis Tool</h2>
        <p className="text-body-sm text-system-neutral-500">Choose the type of analysis you'd like to run.</p>
      </div>
      <div className="grid gap-3">
        {IRON_TOOLS.map((tool) => (
          <button
            key={tool.id}
            disabled={tool.disabled}
            onClick={() => onSelect(tool.id)}
            className={`group flex items-start gap-4 rounded-xl border p-5 text-left transition ${
              tool.disabled
                ? 'cursor-not-allowed border-system-neutral-200 bg-system-neutral-50 opacity-50'
                : 'border-system-neutral-200 bg-white hover:border-action-primary-300 hover:shadow-md'
            }`}
          >
            <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
              tool.id === 'market-landscape' ? 'bg-action-primary-100' : 'bg-system-neutral-100'
            }`}>
              {tool.id === 'market-landscape' ? (
                <ChartLineUpIcon size="md" color="primary" />
              ) : (
                <ActivityIcon size="md" color="disabled" />
              )}
            </div>
            <div>
              <p className="text-body-md font-semibold text-system-neutral-900 group-hover:text-action-primary-600">
                {tool.name}
              </p>
              <p className="text-body-sm text-system-neutral-500">{tool.description}</p>
              {tool.disabled && (
                <span className="mt-1 inline-block rounded-full bg-system-neutral-100 px-2 py-0.5 text-body-xs text-system-neutral-500">
                  Coming Soon
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TASelectionStep({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-heading-md text-system-neutral-900">Select Therapeutic Area</h2>
        <p className="text-body-sm text-system-neutral-500">Choose the indication to analyze.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {THERAPEUTIC_AREAS.map((ta) => (
          <button
            key={ta.id}
            disabled={ta.disabled}
            onClick={() => onSelect(ta.id)}
            className={`rounded-xl border p-4 text-left transition ${
              ta.disabled
                ? 'cursor-not-allowed border-system-neutral-200 bg-system-neutral-50 opacity-50'
                : selected === ta.id
                  ? 'border-action-primary-500 bg-action-primary-50 shadow-sm'
                  : 'border-system-neutral-200 bg-white hover:border-action-primary-300 hover:shadow-sm'
            }`}
          >
            <p className="text-body-md font-semibold text-system-neutral-900">{ta.name}</p>
            <p className="text-body-xs text-system-neutral-500">{ta.patientCount} patients</p>
            {ta.disabled && (
              <span className="mt-1 inline-block rounded-full bg-system-neutral-100 px-2 py-0.5 text-body-xs text-system-neutral-500">
                Coming Soon
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function DrugSelectionStep({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-heading-md text-system-neutral-900">Select Drug(s)</h2>
        <p className="text-body-sm text-system-neutral-500">Choose one or more drugs to analyze within the selected therapeutic area.</p>
      </div>
      <div className="grid gap-3">
        {DRUGS.map((drug) => {
          const isSelected = selected.includes(drug.id);
          return (
            <button
              key={drug.id}
              disabled={drug.disabled}
              onClick={() => onToggle(drug.id)}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                drug.disabled
                  ? 'cursor-not-allowed border-system-neutral-200 bg-system-neutral-50 opacity-50'
                  : isSelected
                    ? 'border-action-primary-500 bg-action-primary-50 shadow-sm'
                    : 'border-system-neutral-200 bg-white hover:border-action-primary-300 hover:shadow-sm'
              }`}
            >
              <div
                className={`flex size-5 shrink-0 items-center justify-center rounded border-2 ${
                  isSelected
                    ? 'border-action-primary-500 bg-action-primary-500'
                    : 'border-system-neutral-300'
                }`}
              >
                {isSelected && <CheckIcon size="sm" color="default" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-body-md font-semibold text-system-neutral-900">{drug.name}</p>
                <p className="text-body-xs text-system-neutral-500">
                  {drug.genericName} · {drug.manufacturer}
                </p>
              </div>
              {drug.disabled && (
                <span className="rounded-full bg-system-neutral-100 px-2 py-0.5 text-body-xs text-system-neutral-500">
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeframeStep({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-heading-md text-system-neutral-900">Select Timeframe</h2>
        <p className="text-body-sm text-system-neutral-500">Choose the analysis period.</p>
      </div>
      <div className="grid gap-3">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.id}
            disabled={tf.disabled}
            onClick={() => onSelect(tf.id)}
            className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
              tf.disabled
                ? 'cursor-not-allowed border-system-neutral-200 bg-system-neutral-50 opacity-50'
                : selected === tf.id
                  ? 'border-action-primary-500 bg-action-primary-50 shadow-sm'
                  : 'border-system-neutral-200 bg-white hover:border-action-primary-300 hover:shadow-sm'
            }`}
          >
            <CalendarIcon size="md" color={selected === tf.id ? 'primary' : 'secondary'} />
            <div>
              <p className="text-body-md font-semibold text-system-neutral-900">{tf.label}</p>
              <p className="text-body-xs text-system-neutral-500">{tf.range}</p>
            </div>
            {tf.disabled && (
              <span className="ml-auto rounded-full bg-system-neutral-100 px-2 py-0.5 text-body-xs text-system-neutral-500">
                Coming Soon
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function SummaryStep({ selections }: { selections: WizardSelections }) {
  const tool = IRON_TOOLS.find((t) => t.id === selections.tool);
  const ta = THERAPEUTIC_AREAS.find((t) => t.id === selections.ta);
  const drugs = DRUGS.filter((d) => selections.drugs.includes(d.id));
  const tf = TIMEFRAMES.find((t) => t.id === selections.timeframe);

  const rows = [
    { label: 'Analysis', value: tool?.name ?? '', icon: <ChartLineUpIcon size="sm" color="primary" /> },
    { label: 'Therapeutic Area', value: ta?.name ?? '', icon: <TargetIcon size="sm" color="primary" /> },
    { label: 'Drug(s)', value: drugs.map((d) => d.name).join(', '), icon: <SearchIcon size="sm" color="primary" /> },
    { label: 'Timeframe', value: tf ? `${tf.label} (${tf.range})` : '', icon: <CalendarIcon size="sm" color="primary" /> },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-heading-md text-system-neutral-900">Confirm Your Selections</h2>
        <p className="text-body-sm text-system-neutral-500">Review your analysis parameters before running.</p>
      </div>
      <div className="rounded-xl border border-system-neutral-200 bg-white">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center gap-3 px-5 py-3.5 ${
              i < rows.length - 1 ? 'border-b border-system-neutral-100' : ''
            }`}
          >
            {row.icon}
            <span className="w-36 shrink-0 text-body-sm text-system-neutral-500">{row.label}</span>
            <span className="text-body-sm font-medium text-system-neutral-900">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-system-info-200 bg-system-info-50 p-3">
        <p className="text-body-xs text-system-info-700">
          The Patient & Market Navigator will query the HealthNexus data warehouse and generate AI-powered insights. This typically takes 1–2 minutes.
        </p>
      </div>
    </div>
  );
}

function ProcessingStep({ onComplete }: { onComplete: () => void }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = PROCESSING_STEPS.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    const timers: ReturnType<typeof setTimeout>[] = [];
    PROCESSING_STEPS.forEach((step, i) => {
      const timer = setTimeout(() => {
        setCurrentStepIdx(i);
      }, elapsed);
      timers.push(timer);
      elapsed += step.duration;
    });

    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 600);
    }, totalDuration);
    timers.push(completeTimer);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (totalDuration / 100);
        return Math.min(next, 98);
      });
    }, 100);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="flex size-16 items-center justify-center rounded-full bg-action-primary-100">
        <IAIcon size="lg" color="primary" />
      </div>

      <div className="text-center">
        <h2 className="text-heading-md text-system-neutral-900">Running Patient & Market Navigator</h2>
        <p className="mt-1 text-body-sm text-system-neutral-500">Analyzing COPD · Dupixent · Full Year 2025</p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md">
        <div className="h-2 overflow-hidden rounded-full bg-system-neutral-200">
          <div
            className="h-full rounded-full bg-action-primary-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-center text-body-xs text-system-neutral-500">{Math.round(progress)}%</p>
      </div>

      {/* Step list */}
      <div className="w-full max-w-md space-y-2">
        {PROCESSING_STEPS.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex size-5 shrink-0 items-center justify-center">
              {i < currentStepIdx ? (
                <FilledCircleCheckIcon size="sm" color="success" />
              ) : i === currentStepIdx ? (
                <div className="size-3 animate-pulse rounded-full bg-action-primary-500" />
              ) : (
                <div className="size-2 rounded-full bg-system-neutral-300" />
              )}
            </div>
            <span
              className={`text-body-sm ${
                i <= currentStepIdx ? 'text-system-neutral-800' : 'text-system-neutral-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const WIZARD_STEPS = [
  { key: 'tool', label: 'Tool' },
  { key: 'ta', label: 'Therapeutic Area' },
  { key: 'drug', label: 'Drug' },
  { key: 'timeframe', label: 'Timeframe' },
  { key: 'summary', label: 'Confirm' },
];

export default function IronWizard() {
  const [step, setStep] = useState<WizardStep>('tool');
  const [selections, setSelections] = useState<WizardSelections>({
    tool: null,
    ta: null,
    drugs: [],
    timeframe: null,
  });

  const stepIndex = WIZARD_STEPS.findIndex((s) => s.key === step);

  const canGoNext = (() => {
    switch (step) {
      case 'tool': return !!selections.tool;
      case 'ta': return !!selections.ta;
      case 'drug': return selections.drugs.length > 0;
      case 'timeframe': return !!selections.timeframe;
      default: return false;
    }
  })();

  const goBack = () => {
    const order: WizardStep[] = ['tool', 'ta', 'drug', 'timeframe', 'summary'];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  };

  const goNext = () => {
    const order: WizardStep[] = ['tool', 'ta', 'drug', 'timeframe', 'summary'];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  };

  const handleRunAnalysis = useCallback(() => {
    setStep('processing');
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setStep('results');
  }, []);

  if (step === 'results') {
    return <IronQ1Page />;
  }

  if (step === 'processing') {
    return (
      <div className="mx-auto max-w-[960px] px-6 py-8">
        {/* Page header */}
        <div className="mb-8 space-y-1">
          <div className="flex items-center gap-2">
            <TargetIcon size="md" color="primary" />
            <h1 className="text-heading-lg text-system-neutral-1000">IRON</h1>
          </div>
          <p className="text-body-sm text-system-neutral-500">
            AI-Powered Analytics for Pharma Commercial Teams
          </p>
        </div>
        <ProcessingStep onComplete={handleProcessingComplete} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[960px] px-6 py-8">
      {/* Page header */}
      <div className="mb-8 space-y-1">
        <div className="flex items-center gap-2">
          <TargetIcon size="md" color="primary" />
          <h1 className="text-heading-lg text-system-neutral-1000">IRON</h1>
        </div>
        <p className="text-body-sm text-system-neutral-500">
          AI-Powered Analytics for Pharma Commercial Teams
        </p>
      </div>

      {/* Stepper indicator */}
      <div className="mb-8">
        <StepIndicator steps={WIZARD_STEPS} currentIndex={stepIndex} />
      </div>

      {/* Step content card */}
      <div className="rounded-2xl border border-system-neutral-200 bg-white p-6 shadow-sm">
        {step === 'tool' && (
          <ToolSelectionStep
            onSelect={(id) => {
              setSelections((s) => ({ ...s, tool: id }));
              goNext();
            }}
          />
        )}
        {step === 'ta' && (
          <TASelectionStep
            selected={selections.ta}
            onSelect={(id) => setSelections((s) => ({ ...s, ta: id }))}
          />
        )}
        {step === 'drug' && (
          <DrugSelectionStep
            selected={selections.drugs}
            onToggle={(id) =>
              setSelections((s) => ({
                ...s,
                drugs: s.drugs.includes(id) ? s.drugs.filter((d) => d !== id) : [...s.drugs, id],
              }))
            }
          />
        )}
        {step === 'timeframe' && (
          <TimeframeStep
            selected={selections.timeframe}
            onSelect={(id) => setSelections((s) => ({ ...s, timeframe: id }))}
          />
        )}
        {step === 'summary' && <SummaryStep selections={selections} />}

        {/* Navigation buttons */}
        {step !== 'tool' && (
          <div className="mt-6 flex items-center justify-between border-t border-system-neutral-100 pt-4">
            <button
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-body-sm font-medium text-system-neutral-600 hover:text-system-neutral-900"
            >
              <ArrowLeftIcon size="sm" />
              Back
            </button>
            {step === 'summary' ? (
              <button
                onClick={handleRunAnalysis}
                className="inline-flex items-center gap-2 rounded-lg bg-action-primary-500 px-5 py-2.5 text-body-sm font-semibold text-white shadow-sm transition hover:bg-action-primary-600"
              >
                <IAIcon size="sm" />
                Run Analysis
              </button>
            ) : (
              <button
                onClick={goNext}
                disabled={!canGoNext}
                className={`inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-body-sm font-semibold transition ${
                  canGoNext
                    ? 'bg-action-primary-500 text-white shadow-sm hover:bg-action-primary-600'
                    : 'cursor-not-allowed bg-system-neutral-200 text-system-neutral-400'
                }`}
              >
                Next
                <ArrowRightIcon size="sm" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
