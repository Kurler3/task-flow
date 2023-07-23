/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "picton-blue": "var(--picton-blue)",
        "marian-blue": "var(--marian-blue)",
        "indigo": "var(--indigo)",
        "gun-metal": "var(--gun-metal)",
        "robin-egg-blue": "var(--robin-egg-blue)"
      },
    },
  },
  plugins: [],
}