/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./src/**/*.{js,jsx,ts,tsx}", ],
  theme: {
    extend: {
      colors: {
        'sunset': {
          light: '#FFB366',
          DEFAULT: '#FFD399',
          dark: '#FF9933',
        },
        'prussian-blue': "#00293B ",
        'lapis': '#01597C',
        'ochre': '#CD7304',
        'selective-yellow': '#F8B300',
        'oxford-blue': '#001D29',
        'linen': '#FFF6EB',
        'sunset-transparent': 'rgba(255, 211, 153, 0.2)',
      }
    },
  },
  plugins: [],
}

