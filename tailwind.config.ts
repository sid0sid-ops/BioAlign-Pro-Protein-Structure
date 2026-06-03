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
        success: "#242424",
        warning: "#e2c161",
        danger: "#ffa773"
      },
      borderRadius: {
        lg: "18px",
        md: "12px",
        sm: "8px"
      },
      boxShadow: {
        glass: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
        glow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px"
      },
      fontFamily: {
        sans: ["var(--font-abc-diatype-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        mono: ["var(--font-abc-diatype-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        serif: ["var(--font-untitled-serif)", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"]
      },
      keyframes: {
        "panel-in": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.985)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px" },
          "50%": { boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px" }
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
