'use client';

import { Q1_INSIGHT_PARAGRAPHS } from '../domain/q1-data';

export default function InsightSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-heading-xs text-system-neutral-900">Insight</h3>
      {Q1_INSIGHT_PARAGRAPHS.map((paragraph, i) => (
        <p key={i} className="text-body-md leading-relaxed text-system-neutral-700">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
