import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        duck: {
          'bg-primary': '#0F1419',
          'bg-secondary': '#1A1F2E',
          'bg-hover': '#252B3A',
          'text-primary': '#F8F9FA',
          'text-secondary': '#A8B3C0',
          'text-muted': '#6B7280',
          'accent': '#14B8A6',
          'accent-dark': '#0F9B8E',
          'border': '#2D3748',
        },
      },
    },
  },
  plugins: [],
}
export default config
