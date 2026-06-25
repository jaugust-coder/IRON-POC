'use client';

import { Q1_QUESTION } from '../domain/q1-data';
import { IronChatMessage, StatusBadge } from './iron-chat-message';
import KpiBanner from './kpi-banner';
import InsightSection from './insight-section';
import WatchSignals from './watch-signals';
import FollowOnQuestions from './follow-on-questions';
import EngineTables from './engine-tables';
import ChatInputBar from './chat-input-bar';
import { SearchIcon } from '@purplelab/icons-ui/SearchIcon';
import { TargetIcon } from '@purplelab/icons-ui/TargetIcon';
import { CalendarIcon } from '@purplelab/icons-ui/CalendarIcon';

export default function IronQ1Page() {
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
          {Q1_QUESTION.text}
        </div>
      </div>

      {/* Context tags */}
      <div className="flex justify-end">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-system-neutral-200 bg-white px-3 py-1 text-body-xs text-system-neutral-600">
            <SearchIcon size="sm" />
            {Q1_QUESTION.brand}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-system-neutral-200 bg-white px-3 py-1 text-body-xs text-system-neutral-600">
            {Q1_QUESTION.indication}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-system-neutral-200 bg-white px-3 py-1 text-body-xs text-system-neutral-600">
            <CalendarIcon size="sm" />
            {Q1_QUESTION.dataWindow}
          </span>
        </div>
      </div>

      {/* AI response */}
      <IronChatMessage>
        {/* Thinking / status bar */}
        <div className="flex items-center gap-3">
          <StatusBadge label="Complete" variant="success" />
          <p className="text-body-xs text-system-neutral-500">
            Queried 2 tables · 30 rows · purplelab-dev.TMP_JOCE
          </p>
        </div>

        {/* KPI Banner */}
        <KpiBanner />

        {/* Insight paragraphs */}
        <InsightSection />

        {/* Watch signals */}
        <WatchSignals />

        {/* Engine tables (collapsible) */}
        <EngineTables />

        {/* Follow-on questions */}
        <FollowOnQuestions />
      </IronChatMessage>

      {/* Sticky chat input bar */}
      <ChatInputBar />
    </div>
  );
}
