import { defineConfig } from 'vite-plugin-windicss';
import scrollSnapPlugin from 'windicss/plugin/scroll-snap';

export default defineConfig({
  preflight: true,
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: '#4DB87F',
        danger: '#EB5B59',
        theme: {
          DEFAULT: 'rgba(0,0,0,.85)',
          gray: 'rgba(0,0,0,.6)',
          light: 'rgba(0,0,0,.3)',
          last: 'rgba(0,0,0,.18)'
        }
      },
      fontWeight: {
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900
      }
    }
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between'
  },
  plugins: [scrollSnapPlugin]
});
