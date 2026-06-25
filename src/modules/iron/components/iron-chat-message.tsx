'use client';

import { IAIcon } from '@purplelab/icons-ui/IAIcon';
import { FilledCircleCheckIcon } from '@purplelab/icons-ui/FilledCircleCheckIcon';

export function AiAvatar() {
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-action-primary-100">
      <IAIcon size="sm" color="primary" />
    </div>
  );
}

export function IronChatMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <AiAvatar />
      <div className="min-w-0 flex-1 space-y-5">{children}</div>
    </div>
  );
}

export function StatusBadge({
  label,
  variant = 'success',
}: {
  label: string;
  variant?: 'success' | 'info';
}) {
  const colors =
    variant === 'success'
      ? 'bg-system-success-50 text-system-success-700 border-system-success-200'
      : 'bg-system-info-50 text-system-info-700 border-system-info-200';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-body-xs font-medium ${colors}`}
    >
      {variant === 'success' && <FilledCircleCheckIcon size="sm" color="success" />}
      {label}
    </span>
  );
}
