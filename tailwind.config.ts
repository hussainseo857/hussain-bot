import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(2, 44, 34, 0.08)',
        card: '0 4px 20px rgba(2, 44, 34, 0.06)',
      },
      backgroundImage: {
        'mountain-gradient':
          'linear-gradient(135deg, #064e3b 0%, #047857 35%, #0f766e 70%, #0e7490 100%)',
        'hero-gradient':
          'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #cffafe 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
