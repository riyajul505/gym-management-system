const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors');


/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#1E3A8A',
      secondary: '#3B82F6',
      background: '#FFFFFF',
      'background-secondary': '#F3F4F6',
      text: '#374151',
      'text-secondary': '#6B7280',
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      rose: colors.rose,
      pink: colors.pink,
      fuchsia: colors.fuchsia,
      purple: colors.purple,
      violet: colors.violet,
      indigo: colors.indigo,
      blue: colors.blue,
      lightBlue: colors.lightBlue, // Only in Tailwind CSS <=v2.1
      sky: colors.sky, // As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`
      cyan: colors.cyan,
      teal: colors.teal,
      emerald: colors.emerald,
      green: colors.green,
      lime: colors.lime,
      yellow: colors.yellow,
      amber: colors.amber,
      orange: colors.orange,
      red: colors.red,
      slate: colors.slate,
      zinc: colors.zinc,
      gray: colors.gray,
      neutral: colors.blueGray,
      stone: colors.stone,
    },
  },
  plugins: [require("daisyui")],
});
