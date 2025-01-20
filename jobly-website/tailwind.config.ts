import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030014',
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#3730A3',
        },
        accent: {
          purple: '#8B5CF6',
          blue: '#4F46E5',
          cyan: '#06B6D4',
          pink: '#EC4899',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-to-b': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(to bottom right, #4F46E5 0%, #8B5CF6 30%, #06B6D4 60%, #EC4899 100%)',
        'hero-glow': 'radial-gradient(circle at center, rgba(79, 70, 229, 0.15) 0%, rgba(139, 92, 246, 0.15) 25%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)',
        'grid': "url('/grid.svg')",
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        'fade-in-left': 'fadeInLeft 1s ease-out forwards',
        'fade-in-right': 'fadeInRight 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
        'mesh-animate': 'meshGradient 10s ease infinite alternate',
        'text-shimmer': 'textShimmer 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'brightness(100%)' },
          '100%': { opacity: '1', filter: 'brightness(150%)' },
        },
        meshGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
    },
  },
  plugins: [],
};

export default config;
