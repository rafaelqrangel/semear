import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        serif: ['var(--font-serif)', 'DM Serif Display', 'Georgia', 'serif'],
      },
      colors: {
        background:  "var(--background)",
        foreground:  "var(--foreground)",
        card:        { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
        primary:     { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        secondary:   { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        muted:       { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        accent:      { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
        destructive: { DEFAULT: "var(--destructive)" },
        border:      "var(--border)",
        input:       "var(--input)",
        ring:        "var(--ring)",
        // Paleta Semear direta
        peach:    "#fdeee4",
        "peach-mid": "#f5d9c8",
        brown:    "#2d2620",
        rose:     "#d4807a",
        "rose-pale": "#f5e0de",
        mocha:    "#8b6f5c",
        sage:     "#6fa572",
        terra:    "#a32d2d",
        "green-semear": "#2d7a4a",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
