import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--color-void)",
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
          sunken: "var(--color-surface-sunken)",
        },
        panel: {
          DEFAULT: "var(--color-panel)",
          muted: "var(--color-panel-muted)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          secondary: "var(--color-ink-secondary)",
          tertiary: "var(--color-ink-tertiary)",
          faint: "var(--color-ink-faint)",
          inverse: "var(--color-ink-inverse)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
          muted: "var(--color-accent-muted)",
          glow: "var(--color-accent-glow)",
        },
        status: {
          active: "var(--color-status-active)",
          prototype: "var(--color-status-prototype)",
          experiment: "var(--color-status-experiment)",
          dormant: "var(--color-status-dormant)",
          archived: "var(--color-status-archived)",
          signal: "var(--color-status-signal)",
          warning: "var(--color-status-warning)",
          critical: "var(--color-status-critical)",
        },
        rule: {
          DEFAULT: "var(--color-rule)",
          strong: "var(--color-rule-strong)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        hero: [
          "var(--type-hero-size)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        page: [
          "var(--type-page-size)",
          { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        section: [
          "var(--type-section-size)",
          { lineHeight: "1.3", fontWeight: "500" },
        ],
        body: ["var(--type-body-size)", { lineHeight: "1.65", fontWeight: "400" }],
        "body-ui": [
          "var(--type-body-ui-size)",
          { lineHeight: "1.55", fontWeight: "400" },
        ],
        meta: [
          "var(--type-meta-size)",
          { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" },
        ],
        label: [
          "var(--type-label-size)",
          { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "500" },
        ],
        code: ["var(--type-code-size)", { lineHeight: "1.5", fontWeight: "400" }],
      },
      maxWidth: {
        shell: "var(--shell-max)",
        prose: "var(--measure-prose)",
        wide: "var(--measure-wide)",
      },
      spacing: {
        "lab-1": "var(--space-1)",
        "lab-2": "var(--space-2)",
        "lab-3": "var(--space-3)",
        "lab-4": "var(--space-4)",
        "lab-5": "var(--space-5)",
        "lab-6": "var(--space-6)",
        "lab-7": "var(--space-7)",
        "lab-8": "var(--space-8)",
        "lab-9": "var(--space-9)",
        "lab-10": "var(--space-10)",
        margin: "var(--grid-margin)",
        gutter: "var(--grid-gutter)",
        header: "var(--header-height)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
      },
      transitionTimingFunction: {
        lab: "var(--ease-lab)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        medium: "var(--duration-medium)",
        slow: "var(--duration-slow)",
      },
    },
  },
  plugins: [],
};

export default config;
