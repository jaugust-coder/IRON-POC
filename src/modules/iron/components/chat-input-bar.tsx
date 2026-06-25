'use client';

import { useState, useCallback } from 'react';
import { ArrowRightIcon } from '@purplelab/icons-ui/ArrowRightIcon';
import { AiAvatar } from './iron-chat-message';

interface ChatInputBarProps {
  onSend?: (message: string) => void;
}

export default function ChatInputBar({ onSend }: ChatInputBarProps) {
  const [value, setValue] = useState('');

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setValue('');
  }, [value, onSend]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-system-neutral-200 bg-white/95 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-[960px] items-center gap-3 px-6 py-4">
        <AiAvatar />
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && value.trim()) handleSend();
            }}
            placeholder="Ask a follow-up question..."
            className="w-full rounded-xl border border-system-neutral-300 bg-system-neutral-50 px-4 py-2.5 pr-12 text-body-sm text-system-neutral-900 placeholder-system-neutral-400 outline-none transition focus:border-action-primary-400 focus:bg-white focus:ring-2 focus:ring-action-primary-100"
          />
          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-action-primary-500 text-white transition hover:bg-action-primary-600 disabled:bg-system-neutral-200 disabled:text-system-neutral-400"
          >
            <ArrowRightIcon size="sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function populateChatInput(text: string) {
  const input = document.querySelector<HTMLInputElement>(
    '[placeholder="Ask a follow-up question..."]'
  );
  if (input) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    nativeInputValueSetter?.call(input, text);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  }
}
