'use client';

import { Q1_KPI_BANNER } from '../domain/q1-data';

export default function KpiBanner() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {Q1_KPI_BANNER.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-lg border border-system-neutral-200 bg-white p-4 shadow-sm"
        >
          <p className="text-body-sm text-system-neutral-600">{kpi.label}</p>
          <p className="mt-1 text-heading-md text-system-neutral-1000">
            {kpi.value}
          </p>
          <p className="mt-0.5 text-body-xs text-system-neutral-500">
            {kpi.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
