/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // professional blue (not neon)
        secondary: '#4F46E5',

        // Neutral system (THIS is what you were missing)
        background: '#FFFFFF',
        surface: '#F8FAFC',
        border: '#E5E7EB',
        text: '#0F172A',
        muted: '#64748B',
      },

      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.05)',
        card: '0 4px 20px rgba(0,0,0,0.06)',
      },

      animation: {
        fade: 'fade 0.4s ease-out',
        slide: 'slide 0.4s ease-out',
      },

      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slide: {
          '0%': { transform: 'translateY(12px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
