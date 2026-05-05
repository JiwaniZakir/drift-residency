import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';

const PROMPT = 'drift@sf:~$ ';

const RESPONSES: Record<string, string | null> = {
  help: 'available: ls, whoami, cat manifesto.txt, apply, cd /, clear',
  ls: 'manifesto.txt   cohort-01/   apply.exe',
  whoami: 'guest. you found the 404.',
  'cat manifesto.txt':
    'storytelling is the most undervalued skill in startups right now.\n' +
    'we built a residency around it.\n' +
    'cohort 01: five spots, san francisco, eight weeks.',
  apply: 'opening application... (mailto:hello@drifthouse.sf)',
  'cd /': '__GO_HOME__',
  clear: '__CLEAR__',
};

interface Line { kind: 'in' | 'out'; text: string }

export function NotFound() {
  const [history, setHistory] = useState<Line[]>([
    { kind: 'out', text: 'drift terminal v0.1' },
    { kind: 'out', text: 'page not found. but you can still poke around.' },
    { kind: 'out', text: 'type "help" to see what works.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const submit = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [...history, { kind: 'in', text: raw }];
    if (!cmd) { setHistory(next); return; }
    const reply = RESPONSES[cmd];
    if (reply === '__CLEAR__') { setHistory([]); return; }
    if (reply === '__GO_HOME__') { window.location.href = '/'; return; }
    if (cmd === 'apply') {
      window.location.href = 'mailto:hello@drifthouse.sf?subject=Cohort 01 application';
    }
    if (reply == null) {
      setHistory([...next, { kind: 'out', text: `drift: command not found: ${raw}` }]);
    } else {
      setHistory([...next, ...reply.split('\n').map((t): Line => ({ kind: 'out', text: t }))]);
    }
    setInput('');
  };

  return (
    <main
      className="min-h-screen px-4 sm:px-8 py-10 font-mono text-sm text-ink bg-page"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 text-ink-muted text-xs uppercase tracking-[0.2em]">
          drift · 404 ·{' '}
          <Link to="/" className="text-ink underline hover:no-underline">return home</Link>
        </div>
        <div className="space-y-1">
          {history.map((l, i) => (
            <div key={i} className={l.kind === 'in' ? 'text-ink' : 'text-ink-muted'}>
              {l.kind === 'in' ? <span className="text-drift-green">{PROMPT}</span> : ''}
              <span className="whitespace-pre-wrap">{l.text}</span>
            </div>
          ))}
          <form onSubmit={(e) => { e.preventDefault(); submit(input); }} className="flex">
            <span className="text-drift-green">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-ink caret-drift-green"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </main>
  );
}
