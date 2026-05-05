import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#FFFFFF',
        ink: {
          DEFAULT: '#000000',
          muted: '#5A5A5A',
          dim: '#9A9A9A',
          rule: '#E5E5E5',
        },
        drift: {
          green: '#1AE672',
          cyan: '#00C8FF',
        },
      },
      fontFamily: {
        display: ['Lacquer', 'ui-serif', 'Georgia', 'serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
