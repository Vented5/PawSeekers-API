/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./**/*.html', './**/*.js', './**/*.ejs'],
  theme: {
    extend: {
      colors:{
        'primary': "#0EB29A",
        'secondary': "#F5FDFF",
        'background': "#8C999A",
        'item': "#DDF0C2"
      },
      backgroundImage:{
        'dogpark': "url('/src/images/dogbg.jpg')"
      }
    }
  },
  plugins: [],
}
