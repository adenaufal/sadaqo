'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
}

export function MarkdownEditor({ id, value, onChange, placeholder, rows = 4, hint }: MarkdownEditorProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  return (
    <div className="space-y-1.5">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border border-input rounded-lg p-0.5 w-fit bg-muted/30">
        {(['write', 'preview'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'px-3 py-1 text-xs font-medium rounded-md transition-colors',
              tab === t
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t === 'write' ? 'Tulis' : 'Pratinjau'}
          </button>
        ))}
      </div>

      {tab === 'write' ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <div className={cn(
          'min-h-[96px] rounded-lg border border-input bg-muted/20 px-3 py-2',
          'prose prose-sm max-w-none dark:prose-invert',
          'prose-p:my-2 prose-p:leading-relaxed prose-p:text-sm prose-p:text-foreground/80',
          'prose-headings:font-semibold prose-headings:text-foreground prose-h2:text-base prose-h3:text-sm',
          'prose-strong:text-foreground prose-strong:font-semibold',
          'prose-li:text-foreground/80 prose-li:text-sm prose-li:my-0.5',
          'prose-ul:my-2 prose-ol:my-2',
          'prose-hr:border-border/50 prose-hr:my-4',
          'prose-em:text-foreground/70',
        )}>
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground text-sm italic not-prose">Belum ada konten.</p>
          )}
        </div>
      )}

      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
