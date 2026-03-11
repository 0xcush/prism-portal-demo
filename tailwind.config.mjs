/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f7',
          100: '#d9e1ec',
          200: '#b3c3d9',
          300: '#8da5c6',
          400: '#6787b3',
          500: '#41699f',
          600: '#1e3a5f',
          700: '#182e4c',
          800: '#122339',
          900: '#0c1726',
        },
        gold: {
          50: '#faf8f0',
          100: '#f2edd6',
          200: '#e5dbad',
          300: '#d8c984',
          400: '#cbb75b',
          500: '#c5a55a',
          600: '#a68a3e',
          700: '#7d6830',
          800: '#534521',
          900: '#2a2311',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      animation: {
        'count-up': 'countUp 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-up': 'fadeUp 0.4s ease-out both',
        'fade-up-1': 'fadeUp 0.4s ease-out 0.05s both',
        'fade-up-2': 'fadeUp 0.4s ease-out 0.1s both',
        'fade-up-3': 'fadeUp 0.4s ease-out 0.15s both',
        'fade-up-4': 'fadeUp 0.4s ease-out 0.2s both',
      },
      keyframes: {
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
