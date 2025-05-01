/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        accent: "#F59E0B",
        neutral: "#1F2937",
        "base-100": "#FFFFFF",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
    },
  },
  plugins: [],
};
