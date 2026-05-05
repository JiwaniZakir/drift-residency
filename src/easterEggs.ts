/** Mounted once on App load. */

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];

export function installConsoleBanner(): void {
  const banner = `
%c
   ██████╗ ██████╗ ██╗███████╗████████╗
   ██╔══██╗██╔══██╗██║██╔════╝╚══██╔══╝
   ██║  ██║██████╔╝██║█████╗     ██║
   ██║  ██║██╔══██╗██║██╔══╝     ██║
   ██████╔╝██║  ██║██║██║        ██║
   ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝        ╚═╝

   where stories unfold.
%c
   you're in the console. that already says something.
   try: %cdrift.help()%c
`;
  const big   = 'color:#1AE672; font-family: monospace; font-size: 12px; line-height:1;';
  const muted = 'color:#5A5A5A; font-family: monospace; font-size: 12px;';
  const cyan  = 'color:#00C8FF; font-family: monospace; font-size: 12px;';
  // eslint-disable-next-line no-console
  console.log(banner, big, muted, cyan, muted);

  const drift = {
    help() {
      // eslint-disable-next-line no-console
      console.log(
        '%cdrift.apply()   %c→ open the application\n' +
        '%cdrift.invest()  %c→ talk to us about backing the cohort\n' +
        '%cdrift.cohort()  %c→ what we know about cohort 01\n' +
        '%cdrift.story()   %c→ the prose, in your terminal',
        cyan, muted, cyan, muted, cyan, muted, cyan, muted
      );
    },
    apply()  { window.location.href = 'mailto:hello@drifthouse.sf?subject=Cohort 01 application'; },
    invest() { window.location.href = 'mailto:hello@drifthouse.sf?subject=Backing Drift'; },
    cohort() {
      // eslint-disable-next-line no-console
      console.log('%cCohort 01 — five spots — san francisco — applications open.', cyan);
    },
    story() {
      // eslint-disable-next-line no-console
      console.log(
        '%cThe best founders we have watched in the last five years have something\n' +
        'in common nobody puts in a pitch deck. They can write. They can hold\n' +
        'a camera. They can make a thread about the thing they are building\n' +
        'that thousands of people follow while it is being built.',
        muted
      );
    },
  };
  (window as unknown as { drift: typeof drift }).drift = drift;
}

export function installKonami(onActivate: () => void): () => void {
  let buf: string[] = [];
  const handler = (e: KeyboardEvent) => {
    buf.push(e.code);
    if (buf.length > KONAMI.length) buf = buf.slice(-KONAMI.length);
    if (buf.length === KONAMI.length && buf.every((k, i) => k === KONAMI[i])) {
      onActivate();
      buf = [];
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}

export function flashRaveMode(): void {
  const el = document.documentElement;
  el.classList.add('rave');
  setTimeout(() => el.classList.remove('rave'), 1500);
}
