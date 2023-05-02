/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    screens: {
      //sFHD: '1920px',
      sFHD: '1920px',
      // sHDplus: '1366px',
      sHDplus: '1366px',
      // sHD: '1280px',
      sHD: '1280px',
      // sTPROplus: '1024px',
      sTPROplus: '1024px',
      // sTPRO: '834px',
      sTPRO: '834px',
      // sT: '768px',
      sT: '768px',
      // sTMINI: '600px',
      sTMINI: '600px',
      // sCXSmax: '414px',
      sCXSmax: '414px',
      // sCXS: '375px',
      sCXS: '375px',
      // sCS: '360px',
      sCS: '360px',
      // sMINI: '240px',
      sMINI: '320px',
    }
  },
  plugins: [],
}
