/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Prompt: ["Prompt", "sans-serif"],
        Bungee: ["Bungee", "cursive"],
        ADLaM: ["ADLaM Display", "cursive"],
        PressStart: ["'Press Start 2P'", "cursive"],
        Gruppo: ["Gruppo", "sans-serif"],
        Dela: ["'Dela Gothic One'", "cursive"],
        Raleway: ["Raleway", "sans-serif"]
      },
      backgroundImage: {
        camera: "url('/static/assets/camera.png')",
        upload: "url('/static/assets/upload.png')",
        add: "url('/static/assets/add.png')",
        male: "url('/static/assets/astronot.gif')",
        rocket: "url('/static/assets/rocket.gif')",
        google: "url('/static/assets/google.png')",
        facebook: "url('/static/assets/facebook.png')",
        twitter: "url('/static/assets/twitter.png')",
        floating: "url('/static/assets/astronot_1.gif')",
        planets: "url('/static/assets/two_astronauts.gif')",
        loading: "url('/static/assets/loading.gif')",
        deskOnly: "url('/static/assets/deskOnly.jpg')",
        cusBorder: "url('/static/assets/border.svg')",
        fastAstro: "url('/static/assets/fastAstro.gif')",
        eyeHide: "url('/static/assets/eye_hide.svg')",
        eyeShow: "url('/static/assets/eye_show.svg')",
        captain: "url('/static/assets/captain.png')",
        cross: "url('/static/assets/cross.png')",
        rocketImg: "url('/static/assets/rocket.svg')",
        downArrow: "url('/static/assets/down-arrow.svg')"
      }
    },
  },
  plugins: [],
}