module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BB5323",
        secondary: "#8FD27A",
        tertiary: "#F3F4F8",
        quaternary: "#04B7F1",
        // quinary: "#7e22ce",
        quinary: "#0093dd",
        "sky-blue": "#B3B5BD",
        light: "#eaedf7",
        dark: "#0e0e23",
        "secondary-text": "#54647c",
        "pink-blue": "#6259ca",
      },
    },
  },
  plugins: [],
}
