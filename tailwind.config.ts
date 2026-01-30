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
        hirovo: {
          blue: '#1677f0',
          teal: '#10cbb4',
          tealLight: '#5fe5d3',
        },
        text: '#0f172a',
        muted: '#64748b',
        border: '#e2e8f0',
        card: '#f8fafc',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 10px 32px rgba(2, 6, 23, .12)',
        btn: '0 4px 14px rgba(22, 119, 240, .35)',
        'btn-hover': '0 6px 20px rgba(22, 119, 240, .45)',
      },
    },
  },
  plugins: [],
}

export default config
