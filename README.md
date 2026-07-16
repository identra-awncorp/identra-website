# Identra Website - Interactive Identity Verification Platform

A highly-polished, interactive **Identra** identity verification platform website. This application features an interactive live verification sandbox, custom product visualizers, a responsive bento-grid design, custom-styled multi-view routing, and a dynamic decision engine.

---

## 🚀 Key Features

- **Interactive Verification Sandbox (`/demo`)**: Simulates real-world verification flows including:
  - **Airlines & Hotels**: Passport & Boarding Pass checking.
  - **Job Applicant Verification**: Verification flow for candidate onboarding.
  - **Bank Account Setup**: Full KYC & AML screening simulation.
  - **Government Services**: Mobile Driver's License and Government database checks.
- **Dynamic Decision Logic & Graph Engine**:
  - Custom decision flow visualization.
  - **Interactive Flow Graph**: Visualizes the flow path of identity verification steps dynamically.
- **Embedded Sandbox Terminal**:
  - Live mock-terminal logger inside the scenario runs. 
  - Uses smart native scroll-containment for simulating high-performance real-time processing outputs without triggering page-level jumping or scrolling.
- **Highly-Polished Modals**:
  - Interactive decision logic summary screen styled with high-contrast slate aesthetics, customized scroll-bars, and perfect flex containment (`overflow-hidden` container limits scroll footprint directly to the modal content card).
- **Extensive UI Catalog**:
  - Features dozens of tailored service sub-pages (KYB, Document AI, NFC scanning, selfie age estimation, biometric match, and more) replicating Identra’s comprehensive suite.
- **Multilingual Context Framework**:
  - Built-in provider support for rapid localization and internationalization toggles.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with Vite post-processors
- **Animations**: [Motion](https://motion.dev/) (`motion/react` lightweight animations)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualizations**: [Recharts](https://recharts.org/)
- **Code Syntax Highlighting**: [Prism.js](https://prismjs.com/)

---

## 📦 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd identra-website
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server on host `0.0.0.0` and port `3000` (default preview ingress configuration):

```bash
npm run dev
```

The application will be accessible locally at:
- **Local Development URL**: [http://localhost:3000](http://localhost:3000)

### Production Build

To compile the application into a production-optimized bundle:

```bash
npm run build
```

This will output highly optimized HTML, JS, and CSS static assets in the `/dist` directory. To preview the production bundle locally:

```bash
npm run preview
```

---

## ⚙️ Environment Variables

Copy the example environment file to configure custom API bindings:

```bash
cp .env.example .env
```

Define the following parameters in your `.env` file:

```env
# Required for any integrated server-side Gemini AI features
GEMINI_API_KEY="your_gemini_api_key_here"

# Canonical URL hosting the application (for callback routing / assets)
APP_URL="http://localhost:3000"
```

---

## 📂 Project Structure

```text
├── .env.example          # Environment variables template
├── index.html            # Main SPA HTML entry-point
├── vite.config.ts        # Vite build & plugin settings
├── tailwind.config.js    # Tailwind configuration
├── metadata.json         # Project capabilities & configuration
├── src/
│   ├── main.tsx          # SPA bootstrap script
│   ├── App.tsx           # Router, dynamic view definitions & global layouts
│   ├── types.ts          # Shared TypeScript interfaces & types
│   ├── context/          # State managers (e.g., Language Context)
│   ├── components/       # Reusable components and detailed site sub-pages
│   │   ├── demo/         # Interactive sandbox scenarios and visualizer modules
│   │   │   ├── DemoSummaryModal.tsx       # Flow execution decision summarizer
│   │   │   ├── IdentityFlowGraph.tsx     # Custom interactive node graph
│   │   │   └── DemoAirlinesHotels.tsx     # Scenario specific mock steps
│   │   ├── Header.tsx    # Responsive navigation bar
│   │   ├── Footer.tsx    # Navigation and site footer
│   │   └── ...           # Dozens of dedicated features and platform details pages
│   └── assets/           # Client-side static images, vector patterns & SVGs
```

---

## 🔧 Developer Notes & Troubleshooting

### Scroll Containment Optimizations
- **Terminal Simulator**: In earlier versions, auto-scroll triggered global screen jumps using `scrollIntoView()`. This has been optimized using a `terminalContainerRef` and `.scrollTo({ top: scrollHeight })` to restrict scrolling exclusively to the terminal window itself.
- **Decision Modal Containment**: The summary decision card (`DemoSummaryModal`) uses nested scroll containment (`flex flex-col` and `overflow-hidden` on the card parent, and a scrollable `overflow-y-auto` inner layout wrapper). This keeps the page-level and backdrop scrolling locked while letting you navigate complex workflows seamlessly inside the modal view.

### Code Style & Linters
To validate typing and syntax correctness, run:
```bash
npm run lint
```
This runs `tsc --noEmit` to ensure type-safety compliance across the codebase.
