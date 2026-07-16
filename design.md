# Identra Design & Styling Reference

This document serves as the absolute visual and brand design reference for building and maintaining pages on the Identra website. Refer to these styling rules, color tokens, and typography specifications when introducing or modifying components to ensure perfect color and design consistency.

---

## 1. Core Color System

To maintain brand cohesion, only use the following verified hex codes and Tailwind equivalents. Do not introduce custom shades of green, purple, or deep teal unless explicitly requested.

### Primary Brand Colors
- **Primary Brand Indigo/Blue**: `#354CE1`  
  - *Tailwind classes*: `bg-[#354CE1]`, `text-[#354CE1]`, `border-[#354CE1]`
- **Primary Blue Hover**: `#2539BE`  
  - *Tailwind classes*: `hover:bg-[#2539BE]`, `hover:text-[#2539BE]`
- **Background Slate/Navy**: `#0F1E36`  
  - *Tailwind classes*: `bg-[#0F1E36]`, `text-[#0F1E36]`

### Accent & Highlight Colors
- **Secondary Warm Amber/Gold**: `#FFBF43`  
  - *Tailwind classes*: `bg-[#FFBF43]`, `text-[#FFBF43]`, `border-[#FFBF43]`
- **Accent Soft Blue (Pill BG)**: `#E2E6FF`  
  - *Tailwind classes*: `bg-[#E2E6FF]`, `text-[#354CE1]`
- **Canvas/Page Background**: `#FAFBFD` (Clean, soft off-white)  
  - *Tailwind classes*: `bg-[#FAFBFD]`
- **Neutral Charcoal Text**: `#1E293B` / `#475569`  
  - *Tailwind classes*: `text-slate-800`, `text-slate-600`

### Semantic Feedback
- **Success (Green)**: Emerald (`#10B981` / `text-emerald-500` or `bg-emerald-500/10`)
- **Warning (Yellow)**: Amber (`#F59E0B` / `text-amber-500` or `bg-amber-500/10`)
- **Alert / Risk (Red)**: Rose (`#F43F5E` / `text-rose-500` or `bg-rose-500/10`)

---

## 2. Page & Component Layout Guidelines

### Hero / Banner Sections
- **Dark Brand Blue Gradient**:  
  Always use the signature brand blue gradient for full-width dark headers and high-impact hero modules to ensure professional polish.
  - *Gradient class*: `bg-gradient-to-b from-[#1E43D8] to-[#142FA0]`
  - *Aesthetic Accents*: Subtly pair with radial gradients for glowing ambient backdrops (e.g., `rgba(255, 255, 255, 0.15)`) to introduce depth.

### Buttons & Interactive Elements
- **Primary CTA Button**:  
  - *Style*: Rounded full (`rounded-full`), text color white (`text-white`), background brand blue (`bg-[#354CE1]`), hover blue (`hover:bg-[#2539BE]`), font-semibold, standard padding.
- **Secondary Button**:  
  - *Style*: Rounded full (`rounded-full`), light borders, soft gray background on hover (`hover:bg-slate-50 border border-slate-200 text-slate-700`).

### Code Terminal / Simulation Widgets
- **Dark Simulator Panel**:  
  - *Style*: Dark charcoal/navy rounded container (`bg-slate-900/95` or `bg-slate-950`), custom borders (`border-slate-700/60`), and monospaced text.
  - *Header details*: Use mock browser control circles (`red/yellow/green`) and light-blue or amber text indicators to avoid dry layouts.

---

## 3. Typography Hierarchy

Establish visual rhythm through purposeful typography pairings:
- **Main Titles & Headings**: Use display-oriented sans-serif classes (`font-display font-semibold text-[#0F1E36] tracking-tight`) to project authority and precision.
- **Body & Explanatory Text**: Use highly legible sans-serif classes (`font-sans text-slate-600 leading-relaxed`).
- **Telemetry & Technical Metrics**: Always use monospace font families (`font-mono text-xs text-slate-400`).

---

## 4. Subpages Design & Features Reference

Every subpage in the Identra platform is designed as an immersive, highly interactive experience that leverages custom visual assets, dynamic state managers, and bespoke color schemes to reflect product identity.

### 4.1 Know Your Business (KYB) Page (`kyb`)
- **Color Theme**: Vivid, high-energy bright layout that commands immediate attention. Features a brilliant tri-color linear gradient (`bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2]`) paired with vibrant glowing spots—bright yellow-gold (`bg-yellow-400/25`) and cyan (`bg-[#00E5FF]/20`) spotlights.
- **Interactive Features**:
  - **Dynamic UBO Graph Explorer**: An interactive corporate hierarchy tree where users select nodes (such as Parent Corp, Direct Owner, or Indirect UBOs) to dynamically highlight connector paths with neon colors (`#354CE1`, `#6366F1`, `#EC4899`, `#06B6D4`) and update detailed registry check reports.
  - **Compliance Verification Card**: A light-themed card with deep indigo borders (`border-2 border-[#354CE1]`) that dynamically adapts to display SOS, PASSED, or CLEARED check records based on active graph node selections.
  - **Sunset/Cyberpunk Decision Tree**: A policy builder split with a vibrant gradient overlay (`bg-gradient-to-tr from-[#354CE1] to-[#7C3AED]`), translucent glass panels, and neon indicators to evaluate Sole Proprietorships vs. Offshores.

### 4.2 Government ID Verification (`government-id`)
- **Layout & Interaction**: Features a multi-step interactive wizard ("How it works") enabling users to configure ID verification rules (Selfie requirements, Allowed Docs, Mobile restrictions) and test a live smartphone-based capture camera simulation complete with a flash animation overlay. Includes a live-check logs terminal showing simulated background verification queues.
- **Color Theme**: Classic Slate Deep Blue gradient header paired with clean white content cards, bordered with soft grey outlines and highlighted with green success metrics.

### 4.3 KYC / AML Compliance (`compliance`)
- **Layout & Interaction**: Prominently highlights the dual phases of identity (Onboarding vs. Continuous Lifecycles) through interactive tab controls. Features an **Orchestration Case Evaluation Panel** allowing users to click to approve/decline profiles or toggle AML match warnings in real-time, coupled with industry-specific bento cards (e.g. Crypto, Banking, Money Movement).
- **Color Theme**: Corporate dark blue header (`from-[#112690] to-[#1e3dc5]`) with soft emerald badges and high-contrast alert indicators.

### 4.4 Connect & Integrations (`connect`)
- **Layout & Interaction**: Serves as a playground for developers. Features an **Interactive API Explorer & Code Snippet Panel** to toggle between language tabs (cURL, Node.js, Python, Ruby), alongside a live API webhook simulator with editable JSON requests and instant mock server event logs.
- **Color Theme**: Dark theme focus inside interactive code frames (`bg-slate-950`), custom colored code syntax highlights (green, yellow, orange), and vivid green state signals.

### 4.5 Platform Hub & Workflows (`platform`)
- **Layout & Interaction**: Highlights Identra’s identity orchestration engine. Includes an interactive flow diagram showing connected node maps (Collection, Verifications, DB Checks, Manual Review), allowing users to hover and inspect logic routing.
- **Color Theme**: Clean off-white canvas with strong navy fonts, and clean cobalt blue connectors showing clear data streams.

### 4.6 NFC & ePassport Verification (`nfc`)
- **Layout & Interaction**: Displays specialized mobile identity validation. Features an **Interactive NFC Tap Simulator** where users hover/tap a simulated passport card over a modern smartphone graphic, triggering glowing sonar wave animations (`animate-ping`) and unlocking cryptographic compliance signatures.
- **Color Theme**: Tech-oriented layout accented with electric cyan and light blue indicators.

### 4.7 Business Fraud Defense (`business-fraud`)
- **Layout & Interaction**: Visualizes defense metrics. Includes an interactive risk dashboard featuring a **Live Risk Meter Gauge** that responds to custom threshold sliders, simulating automated anti-fraud actions (Approve, Flag, Decline) based on transaction velocity.
- **Color Theme**: High-contrast warning warnings with rich crimson and warm amber semantic accents.

### 4.8 Customer Stories (`customers`)
- **Layout & Interaction**: Displays social proof. Features a dynamic filter system to organize stories by industry (Fintech, Marketplace, Gig Economy) or business size, coupled with interactive metric dashboard highlights (e.g., "-50% Drop in Fraud", "95% Auto-Verification").
- **Color Theme**: Editorial styling using elegant serif typography, generous white space, and large-scale blockquotes.

### 4.9 Dynamic Flow Engine (`dynamic-flow`)
- **Layout & Interaction**: Highlights brand personalization. Features a **Real-Time UI Theme Configurator** where users select custom font pairings, button shapes, and branding colors, instantly synchronizing and rendering the style inside a simulated live mobile phone view.
- **Color Theme**: Clean, highly neutral control panels contrast with the dynamically updated color schemes of the preview frame.

### 4.10 Relay & Privacy Guard (`relay`)
- **Layout & Interaction**: Deep dives into privacy regulations. Features an **Encryption Keys Validator** where users trigger simulated data redactions (hiding names/SSNs behind asterisks) and customize cross-border storage restriction matrices.
- **Color Theme**: Solid deep navy colors representing security, decorated with green checkmark matrices.

### 4.11 About Page (`about`)
- **Layout & Interaction**: Clean informative layout using structured grids to communicate company history, culture pillars (Value Integrity, Customer First), and secure global offices.
- **Color Theme**: Clean layout featuring white cards, charcoal text, and minimal brand accent borders.

### 4.12 Pricing Page (`pricing`)
- **Layout & Interaction**: Features a **Dynamic Pricing Tier Calculator** where users customize anticipated monthly inquiry volume using a slider, instantly generating a custom plan recommendation and price estimate. Includes an annual vs. monthly subscription billing toggle.
- **Color Theme**: Clean light background with distinct cards, and a highlighted "Growth" tier using the primary `#354CE1` banner.

### 4.13 Login Page (`login`)
- **Layout & Interaction**: A clean, single-view login container. Offers input validations, mock single sign-on (SSO) credentials selection, and a passwordless email verification flow with interactive numeric MFA code entries.
- **Color Theme**: Ultra-minimalist dark backdrop and premium slate elements.

### 4.14 Ebooks & Resource Center (`ebooks`)
- **Layout & Interaction**: A digital hub for industry insight guides. Includes active category search filtering and animated card expansions with a "Read Online" simulator displaying reading progress meters.
- **Color Theme**: Vivid cover graphics juxtaposed with high-readability text grids.

### 4.15 Events & Webinars (`events`)
- **Layout & Interaction**: Keeps the community engaged. Features a chronological upcoming calendar timeline, interactive registration form popups, and instant access buttons to on-demand video playback streams.
- **Color Theme**: Dark theme accents on media modules.

### 4.16 Careers Portal (`careers`)
- **Layout & Interaction**: Facilitates corporate recruiting. Displays active open listings with keyword filters, detailed perks description cards, and a fully interactive direct-job application form drawer.
- **Color Theme**: Highly positive, clean, and professional.

### 4.17 Research Publications (`research`)
- **Layout & Interaction**: Highlights authoritative reports. Features detailed research paper abstracts, download counter indicators, and easy PDF retrieval triggers.
- **Color Theme**: Classic educational white paper layout, with high contrast reading zones.
