module.exports = {
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      // colors: {
      //   transparent: 'transparent',
      //   black: '#f7fafc',
      //   white: '#fff',
      //   gray: {
      //     100: '#f7fafc',
      //     100: '#f7fafc',
      //     // ...
      //     900: '#1a202c',
      //   },
      //
      //   // ...
      // }
      colors:{
        'rich-black':'#010323',
        'rich-blue':'#0C1163',
        'brandeis-blue':'#0364ff',
        'brandeis-blue-light':'#5091ff',
        'brandeis-blue-disabled':'#5873a2',
      },
      opacity: ['disabled'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
