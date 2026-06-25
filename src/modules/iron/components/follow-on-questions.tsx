'use client';

import { ArrowRightIcon } from '@purplelab/icons-ui/ArrowRightIcon';
import { Q1_FOLLOW_ON_QUESTIONS } from '../domain/q1-data';

export default function FollowOnQuestions() {
  return (
    <div className="space-y-3">
      <h3 className="text-heading-xs text-system-neutral-900">
        Follow-on Questions
      </h3>
      <div className="space-y-2">
        {Q1_FOLLOW_ON_QUESTIONS.map((q) => (
          <button
            key={q.id}
            className="flex w-full items-center gap-3 rounded-lg border border-action-primary-200 bg-action-primary-50 px-4 py-3 text-left transition-colors hover:border-action-primary-400 hover:bg-action-primary-100"
          >
            <span className="shrink-0 rounded-md bg-action-primary-500 px-2 py-0.5 text-body-xs font-semibold text-white">
              {q.id}
            </span>
            <span className="flex-1 text-body-md text-system-neutral-800">
              {q.text}
            </span>
            <ArrowRightIcon size="sm" color="primary" className="shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
