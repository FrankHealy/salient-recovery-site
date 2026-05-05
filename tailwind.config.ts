import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary institutional blue
        primary: {
          50:  '#f0f4fa',
          100: '#d9e3f2',
          200: '#b3c7e5',
          300: '#8daad8',
          400: '#668ecb',
          500: '#3d6fa8',
          600: '#2d5487',
          700: '#1e3c66',
          800: '#142a4a',
          900: '#0d1e35',
        },
        // Surface colours
        surface: {
          base:   '#F7F5F2',   // off-white background
          raised: '#EFEDE9',   // slightly darker for cards
          border: '#D9D6D0',   // subtle borders
        },
        // Text
        ink: {
          primary:   '#1C1C1C',
          secondary: '#4A4A4A',
          muted:     '#767676',
          inverse:   '#F7F5F2',
        },
        // Status
        status: {
          active:  '#2D6A4F',
          pending: '#8B6914',
          alert:   '#8B2222',
          neutral: '#4A4A4A',
        },
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
        sans:  ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono:  ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        xs:    ['0.75rem',  { lineHeight: '1.125rem' }],
        sm:    ['0.875rem', { lineHeight: '1.375rem' }],
        base:  ['1rem',     { lineHeight: '1.625rem' }],
        lg:    ['1.125rem', { lineHeight: '1.75rem' }],
        xl:    ['1.25rem',  { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem',   { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.75rem' }],
        '5xl': ['3rem',     { lineHeight: '3.5rem' }],
      },
      spacing: {
        'section': '5rem',
        'section-lg': '8rem',
      },
      maxWidth: {
        'prose-tight': '52ch',
        'content': '72rem',
      },
      borderWidth: {
        '3': '3px',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
};

export default config;
