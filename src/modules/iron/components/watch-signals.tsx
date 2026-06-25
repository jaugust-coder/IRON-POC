'use client';

import { AlertIcon } from '@purplelab/icons-ui/AlertIcon';
import { Q1_WATCH_SIGNALS } from '../domain/q1-data';

export default function WatchSignals() {
  return (
    <div className="space-y-3">
      <h3 className="text-heading-xs text-system-neutral-900">Watch Signals</h3>
      {Q1_WATCH_SIGNALS.map((signal) => (
        <div
          key={signal.title}
          className="flex gap-3 rounded-lg border border-system-warning-200 bg-system-warning-50 p-4"
        >
          <AlertIcon size="md" color="warning" className="mt-0.5 shrink-0" />
          <div>
            <p className="text-body-md font-semibold text-system-neutral-900">
              {signal.title}
            </p>
            <p className="mt-1 text-body-sm text-system-neutral-700">
              {signal.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
