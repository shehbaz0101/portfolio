import type { Config } from 'tailwindcss';
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {
    colors: { canvas: 'var(--canvas)', surface: 'var(--surface)', soft: 'var(--soft)', line: 'var(--line)', ink: 'var(--ink)', secondary: 'var(--secondary)', accent: 'var(--accent)' },
    fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], mono: ['var(--font-mono)', 'monospace'] },
  } }, plugins: [],
} satisfies Config;
