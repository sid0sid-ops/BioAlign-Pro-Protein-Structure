import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/modules/**/*.{ts,tsx}",
    "./src/layouts/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1520px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        success: "#14b8a6",
        warning: "#f59e0b",
        danger: "#f43f5e"
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px"
      },
      boxShadow: {
        glass: "0 18px 60px rgba(15, 23, 42, 0.12)",
        glow: "0 0 42px rgba(59, 130, 246, 0.24)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"]
      },
      keyframes: {
        "panel-in": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.985)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(59, 130, 246, 0)" },
          "50%": { boxShadow: "0 0 34px rgba(59, 130, 246, 0.28)" }
        },
        "scanline": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        "panel-in": "panel-in 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        scanline: "scanline 3s linear infinite",
        "gradient-shift": "gradient-shift 12s ease infinite"
      }
    }
  },
  plugins: [animate]
};

export default config;
