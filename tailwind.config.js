module.exports = {
  purge: [],
  mode: 'jit',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'green-light': '#74b71b',
        'green-dark': '#006A4E',
        'gray-8': '#888888',
        'gray-5': '#d5d5d5',
        'gray-d-8': '#d8d8d8',
        'gray-9': '#9d9d9d',
        'black-3': '#3C3C3F',
        'black-2': '#262626',
        'white-2': '#f2f2f4'
      }
    },
    fontFamily: {
      base: ['Raleway', 'sans-serif']
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
