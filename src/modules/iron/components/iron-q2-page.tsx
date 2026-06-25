'use client';

import { useState } from 'react';
import {
  Q2_QUESTION,
  Q2_KPI_BANNER,
  Q2_TREND_DATA,
  Q2_PARTIAL_2026,
  Q2_INSIGHT_PARAGRAPHS,
  Q2_WATCH_SIGNALS,
  Q2_FOLLOW_ON_QUESTIONS,
  Q2_ENGINE_TABLES,
} from '../domain/q2-data';
import { IronChatMessage, StatusBadge } from './iron-chat-message';
import ChatInputBar, { populateChatInput } from './chat-input-bar';
import { AlertIcon } from '@purplelab/icons-ui/AlertIcon';
import { ArrowRightIcon } from '@purplelab/icons-ui/ArrowRightIcon';
import { ChevronDownIcon } from '@purplelab/icons-ui/ChevronDownIcon';
import { ChevronUpIcon } from '@purplelab/icons-ui/ChevronUpIcon';
import { SearchIcon } from '@purplelab/icons-ui/SearchIcon';
import { TargetIcon } from '@purplelab/icons-ui/TargetIcon';
import { CalendarIcon } from '@purplelab/icons-ui/CalendarIcon';

function Q2KpiBanner() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {Q2_KPI_BANNER.map((kpi) => (
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

function Q2TrendTable() {
  const phaseColor: Record<string, string> = {
    baseline: 'bg-system-neutral-100 text-system-neutral-700',
    rapid_uptake: 'bg-system-success-100 text-system-success-700',
    moderation: 'bg-system-warning-100 text-system-warning-700',
  };

  return (
    <div className="space-y-3">
      <h3 className="text-heading-xs text-system-neutral-900">
        Year-over-Year Trend
      </h3>
      <div className="overflow-x-auto rounded-lg border border-system-neutral-200">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-b border-system-neutral-200 bg-system-neutral-50 text-left text-system-neutral-600">
              <th className="px-4 py-2.5 font-medium">Year</th>
              <th className="px-4 py-2.5 font-medium">COPD Universe</th>
              <th className="px-4 py-2.5 text-right font-medium">Treated</th>
              <th className="px-4 py-2.5 text-right font-medium">Penetration</th>
              <th className="px-4 py-2.5 text-right font-medium">YoY Growth</th>
              <th className="px-4 py-2.5 font-medium">Phase</th>
            </tr>
          </thead>
          <tbody>
            {Q2_TREND_DATA.map((row) => (
              <tr
                key={row.year}
                className="border-b border-system-neutral-100 text-system-neutral-800"
              >
                <td className="px-4 py-2.5 font-medium">{row.year}</td>
                <td className="px-4 py-2.5">{row.universe}</td>
                <td className="px-4 py-2.5 text-right font-mono">
                  {row.treated.toLocaleString('en-US')}
                </td>
                <td className="px-4 py-2.5 text-right font-mono">
                  {row.penetration}
                </td>
                <td className="px-4 py-2.5 text-right font-mono">
                  {row.yoy ?? '—'}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-body-xs font-medium ${phaseColor[row.phase] ?? ''}`}
                  >
                    {row.phase === 'baseline' && 'Baseline'}
                    {row.phase === 'rapid_uptake' && 'Rapid Uptake'}
                    {row.phase === 'moderation' &&
                      (row.reaccelFlag ? 'Re-acceleration' : 'Moderation')}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="bg-system-neutral-50 text-system-neutral-500">
              <td className="px-4 py-2.5 font-medium">
                {Q2_PARTIAL_2026.year}*
              </td>
              <td className="px-4 py-2.5">—</td>
              <td className="px-4 py-2.5 text-right font-mono">
                {Q2_PARTIAL_2026.treated.toLocaleString('en-US')}
              </td>
              <td className="px-4 py-2.5 text-right">—</td>
              <td className="px-4 py-2.5 text-right">—</td>
              <td className="px-4 py-2.5 text-body-xs italic">
                {Q2_PARTIAL_2026.period} only
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-body-xs text-system-neutral-400">
        * {Q2_PARTIAL_2026.annotation} Annualized run-rate:{' '}
        {Q2_PARTIAL_2026.annualizedRunRate}.
      </p>
    </div>
  );
}

function Q2EngineTables() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-system-neutral-200 bg-system-neutral-50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div>
          <p className="text-body-sm font-semibold text-system-neutral-700">
            Engine Query Results
          </p>
          <p className="text-body-xs text-system-neutral-500">
            2 tables · 11 rows from purplelab-dev.TMP_JOCE
          </p>
        </div>
        {expanded ? (
          <ChevronUpIcon size="sm" color="secondary" />
        ) : (
          <ChevronDownIcon size="sm" color="secondary" />
        )}
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-system-neutral-200 p-4">
          {Object.values(Q2_ENGINE_TABLES).map((table) => (
            <div key={table.title}>
              <p className="mb-1 text-body-sm font-semibold text-system-neutral-800">
                {table.title}
              </p>
              <p className="mb-2 text-body-xs text-system-neutral-500">
                {table.subtitle}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-body-sm">
                  <thead>
                    <tr className="border-b border-system-neutral-200 text-left text-system-neutral-600">
                      {table.columns.map((col) => (
                        <th key={col} className="px-3 py-2 font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-system-neutral-100 text-system-neutral-800"
                      >
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="px-3 py-2">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function IronQ2Page() {
  return (
    <div className="mx-auto max-w-[960px] space-y-6 px-6 pb-28 pt-8">
      {/* Page header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <TargetIcon size="md" color="primary" />
          <h1 className="text-heading-lg text-system-neutral-1000">IRON</h1>
        </div>
        <p className="text-body-sm text-system-neutral-500">
          AI-Powered Analytics for Pharma Commercial Teams
        </p>
      </div>

      {/* User question bubble */}
      <div className="flex justify-end">
        <div className="max-w-[70%] rounded-2xl rounded-br-md bg-action-primary-500 px-5 py-3 text-body-md text-white shadow-sm">
          {Q2_QUESTION.text}
        </div>
      </div>

      {/* Context tags */}
      <div className="flex justify-end">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-system-neutral-200 bg-white px-3 py-1 text-body-xs text-system-neutral-600">
            <SearchIcon size="sm" />
            {Q2_QUESTION.brand}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-system-neutral-200 bg-white px-3 py-1 text-body-xs text-system-neutral-600">
            {Q2_QUESTION.indication}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-system-neutral-200 bg-white px-3 py-1 text-body-xs text-system-neutral-600">
            <CalendarIcon size="sm" />
            {Q2_QUESTION.dataWindow}
          </span>
        </div>
      </div>

      {/* AI response */}
      <IronChatMessage>
        <div className="flex items-center gap-3">
          <StatusBadge label="Complete" variant="success" />
          <p className="text-body-xs text-system-neutral-500">
            Queried 2 tables · 11 rows · purplelab-dev.TMP_JOCE
          </p>
        </div>

        <Q2KpiBanner />
        <Q2TrendTable />

        <div className="space-y-4">
          <h3 className="text-heading-xs text-system-neutral-900">Insight</h3>
          {Q2_INSIGHT_PARAGRAPHS.map((paragraph, i) => (
            <p
              key={i}
              className="text-body-md leading-relaxed text-system-neutral-700"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-heading-xs text-system-neutral-900">
            Watch Signals
          </h3>
          {Q2_WATCH_SIGNALS.map((signal) => (
            <div
              key={signal.title}
              className="flex gap-3 rounded-lg border border-system-warning-200 bg-system-warning-50 p-4"
            >
              <AlertIcon
                size="md"
                color="warning"
                className="mt-0.5 shrink-0"
              />
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

        <Q2EngineTables />

        <div className="space-y-3">
          <h3 className="text-heading-xs text-system-neutral-900">
            Follow-on Questions
          </h3>
          <div className="space-y-2">
            {Q2_FOLLOW_ON_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => populateChatInput(q.text)}
                className="flex w-full items-center gap-3 rounded-lg border border-action-primary-200 bg-action-primary-50 px-4 py-3 text-left transition-colors hover:border-action-primary-400 hover:bg-action-primary-100"
              >
                <span className="shrink-0 rounded-md bg-action-primary-500 px-2 py-0.5 text-body-xs font-semibold text-white">
                  {q.id}
                </span>
                <span className="flex-1 text-body-md text-system-neutral-800">
                  {q.text}
                </span>
                <ArrowRightIcon
                  size="sm"
                  color="primary"
                  className="shrink-0"
                />
              </button>
            ))}
          </div>
        </div>

        <p className="text-body-xs text-system-neutral-400">
          Generated just now · IRON Q2 POC · purplelab-dev
        </p>
      </IronChatMessage>

      <ChatInputBar />
    </div>
  );
}
