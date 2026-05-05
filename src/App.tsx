import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  installConsoleBanner,
  installKonami,
  flashRaveMode,
} from './easterEggs';

function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia('(hover: none)').matches) return;
    const move = (e: PointerEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-2 h-2 rounded-full bg-drift-green pointer-events-none z-[60]"
    />
  );
}

function Section({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {label && (
        <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-ink-muted mb-3">
          {label}
        </div>
      )}
      <div className="text-ink">{children}</div>
    </motion.section>
  );
}

function Pill({ href, children, variant = 'primary' }: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}) {
  const isPrimary = variant === 'primary';
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{
        scale: 1.05,
        boxShadow: isPrimary
          ? '0 8px 25px rgba(26,230,114,0.35)'
          : '0 8px 25px rgba(245,245,242,0.12)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`inline-flex items-center justify-center font-display text-base px-5 py-2 transition-colors duration-150 lowercase ${
        isPrimary
          ? 'bg-drift-green text-black'
          : 'border border-ink/40 text-ink hover:border-ink hover:bg-ink/5'
      }`}
    >
      {children}
    </motion.a>
  );
}

function Tagline() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!hovered ? (
          <motion.p
            key="stories"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="font-serif italic text-2xl md:text-4xl text-ink leading-none"
          >
            where stories unfold.
          </motion.p>
        ) : (
          <motion.p
            key="sf"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="font-serif italic text-2xl md:text-4xl text-ink leading-none"
          >
            san francisco.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Logo({ onTripleClick }: { onTripleClick?: () => void }) {
  const [clicks, setClicks] = useState(0);
  useEffect(() => {
    if (clicks === 0) return;
    const t = setTimeout(() => setClicks(0), 600);
    return () => clearTimeout(t);
  }, [clicks]);
  return (
    <img
      src="/drift-logo.png"
      alt="Drift"
      draggable={false}
      onClick={() => {
        const n = clicks + 1;
        setClicks(n);
        if (n >= 3) {
          onTripleClick?.();
          setClicks(0);
        }
      }}
      className="h-16 md:h-24 w-auto select-none cursor-pointer"
    />
  );
}

export function App() {
  const installedRef = useRef(false);
  const isEmbed = new URLSearchParams(window.location.search).has('embed');

  useEffect(() => {
    if (installedRef.current) return;
    installedRef.current = true;
    if (!isEmbed) {
      installConsoleBanner();
    }
    return installKonami(flashRaveMode);
  }, [isEmbed]);

  useEffect(() => {
    if (isEmbed) {
      document.documentElement.classList.add('embed-mode');
    }
  }, [isEmbed]);

  return (
    <div className={`relative ${isEmbed ? 'min-h-0' : 'min-h-screen'}`}>
      {!isEmbed && <CursorDot />}

      <div className="max-w-2xl mx-auto px-5 md:px-6 relative z-10">

        {!isEmbed && (
          <header className="pt-16 md:pt-24 pb-10 md:pb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <Logo onTripleClick={flashRaveMode} />
              <div className="mt-10 md:mt-14">
                <Tagline />
              </div>
              <p className="mt-5 text-ink-muted text-[13px] md:text-[14px] max-w-md">
                a residency for storyteller-founders.
              </p>
            </motion.div>
          </header>
        )}

        <main className="space-y-8 md:space-y-10 pt-8 md:pt-10 pb-12">

          <Section label="Belief">
            <p>
              Audience is the new moat. Pieter Levels ships in public and competes
              with Big Tech. Patrick Collison wrote his way to a hundred-billion-dollar
              Stripe. The founders who win the next decade are the ones who can
              ship a company and a story at the same time.
            </p>
            <p className="mt-3 text-ink">
              We&apos;re the first residency built for it.
            </p>
          </Section>

          <Section label="Process">
            <ol className="list-decimal list-inside space-y-2 marker:text-drift-green">
              <li>Apply with what you&apos;re already building.</li>
              <li>Move into the house. June 1 - July 31. San Francisco.</li>
              <li>You build the company. We document the build. You learn to make people care.</li>
            </ol>
          </Section>

          <Section label="What you get">
            <dl className="space-y-2">
              <div className="flex gap-3">
                <dt className="text-drift-green min-w-[60px]">Build -</dt>
                <dd>A bedroom in the house. Nine other builders in the same kitchen.</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-drift-green min-w-[60px]">Film -</dt>
                <dd>A crew documents your eight weeks. We cut. You publish.</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-drift-green min-w-[60px]">Learn -</dt>
                <dd>Writing, posting, and pitching from operators who built audiences first.</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-drift-green min-w-[60px]">Live -</dt>
                <dd>Investors, sponsors, and mentors take the spare rooms on weekends. You eat with them.</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-drift-green min-w-[60px]">Meet -</dt>
                <dd>Every founder leaves with confirmed investor meetings.</dd>
              </div>
            </dl>
          </Section>

          <Section label="Who">
            <p>
              Founder team, mentors, and sponsors are signing now. We&apos;ll
              announce the bench when the ink&apos;s dry.
            </p>
          </Section>

          <Section label="Terms">
            <dl className="space-y-1">
              <div className="flex gap-3"><dt className="text-ink-muted min-w-[80px]">Dates</dt><dd>June 1 - July 31, 2026 (8 weeks)</dd></div>
              <div className="flex gap-3"><dt className="text-ink-muted min-w-[80px]">Location</dt><dd>San Francisco</dd></div>
              <div className="flex gap-3"><dt className="text-ink-muted min-w-[80px]">Spots</dt><dd>10</dd></div>
              <div className="flex gap-3"><dt className="text-ink-muted min-w-[80px]">Housing</dt><dd>Covered</dd></div>
              <div className="flex gap-3"><dt className="text-ink-muted min-w-[80px]">Capital</dt><dd>Terms announced soon</dd></div>
            </dl>
          </Section>

          <Section label="Apply">
            <div className="space-y-5">
              <p>
                Cohort 01 is the first one we&apos;ve ever run. Ten spots.
                Building something you can&apos;t put down? We want you in the house.
              </p>
              <Pill href="https://form.typeform.com/to/CSvfAnyw?utm_source=drift_whitepaper&utm_medium=website&utm_campaign=drift_cohort01_summer26">
                Apply for Cohort 01
              </Pill>
            </div>
          </Section>

          <Section label="For backers">
            <div className="space-y-5">
              <p className="text-ink-muted">
                Investors and sponsors: back the cohort, or come stay in the
                house on a weekend with the founders.
              </p>
              <Pill href="mailto:hello@drifthouse.sf?subject=Backing Drift" variant="ghost">
                Talk to us
              </Pill>
            </div>
          </Section>

        </main>

        {!isEmbed && (
          <footer className="border-t border-ink-rule">
            <div className="py-6 flex items-baseline justify-between">
              <span className="font-display text-lg text-ink lowercase">drift.</span>
              <div className="flex gap-4 text-ink-muted font-mono text-[10px] uppercase tracking-[0.3em]">
                <a href="https://x.com/drifthousesf" target="_blank" rel="noopener noreferrer" className="hover:text-ink">x</a>
                <a href="https://www.linkedin.com/company/drifthouse/" target="_blank" rel="noopener noreferrer" className="hover:text-ink">linkedin</a>
              </div>
            </div>
          </footer>
        )}

      </div>
    </div>
  );
}
