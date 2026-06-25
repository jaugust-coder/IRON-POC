'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@purplelab/icons-ui/ChevronDownIcon';
import { ChevronUpIcon } from '@purplelab/icons-ui/ChevronUpIcon';
import { Q1_ENGINE_TABLES } from '../domain/q1-data';

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

type TableData = (typeof Q1_ENGINE_TABLES)['dupixentYN'];

function EngineTable({ table }: { table: TableData }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-body-sm">
        <thead>
          <tr className="border-b border-system-neutral-200 text-left text-system-neutral-600">
            <th className="px-3 py-2 font-medium">Data Source</th>
            <th className="px-3 py-2 font-medium">Group</th>
            <th className="px-3 py-2 font-medium">Step</th>
            <th className="px-3 py-2 text-right font-medium">Patients</th>
            <th className="px-3 py-2 text-right font-medium">Claims</th>
            <th className="px-3 py-2 text-right font-medium">Encounters</th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-system-neutral-100 text-system-neutral-800"
            >
              <td className="px-3 py-2">{row.dataSource}</td>
              <td className="px-3 py-2">{row.group}</td>
              <td className="px-3 py-2">{row.step}</td>
              <td className="px-3 py-2 text-right font-mono">
                {formatNumber(row.patients)}
              </td>
              <td className="px-3 py-2 text-right font-mono">
                {formatNumber(row.claims)}
              </td>
              <td className="px-3 py-2 text-right font-mono">
                {formatNumber(row.encounters)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EngineTables() {
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
            2 tables · 30 rows from purplelab-dev.TMP_JOCE
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
          {Object.values(Q1_ENGINE_TABLES).map((table) => (
            <div key={table.title}>
              <p className="mb-1 text-body-sm font-semibold text-system-neutral-800">
                {table.title}
              </p>
              <p className="mb-2 text-body-xs text-system-neutral-500">
                {table.subtitle}
              </p>
              <EngineTable table={table} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
