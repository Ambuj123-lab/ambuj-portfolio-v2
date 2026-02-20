<div align="center">
  <img src="public/favicon.ico" alt="Logo" width="80" height="auto" />
  
  # Agentic Portfolio & Multi-Agent Showcase

  An industry-grade, interactive portfolio built to demonstrate expertise in **Full-Stack Development**, **Generative AI**, and **Agentic Architecture**. Featuring a custom command palette, PWA capabilities, and a live-simulated execution trace of multi-agent LLM systems.

  <p align="center">
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" /></a>
    <a href="#"><img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Ready" /></a>
  </p>
</div>

---

## ✨ Key Features

- **🤖 Agentic Execution Trace**: A visually stunning, mathematically staggered cinematic animation demonstrating a Multi-Agent RAG pipeline (Router -> Vector Search -> Doc Store -> LLM -> Evaluator).
- **⌘ Command Palette**: Press `Ctrl+K` (or `Cmd+K`) to access a globally available, keyboard-first navigation system for rapid access to projects, resume, and contact.
- **📱 Progressive Web App (PWA)**: Fully installable on iOS and Android devices directly from the browser for a native app-like experience.
- **🎭 Glassmorphism & Custom Physics**: Features a custom physics-based ultra-thin scrollbar, magnetic cursor glow with `mix-blend-mode`, and smooth staggered framer-motion transitions.
- **🌓 Theme Architecture**: Enterprise-grade Dark/Light mode implementation using Tailwind CSS standard classes and local storage persistence.

## 🛠 Technology Stack

### Frontend Engineering
- **Core Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Utility-first), Vanilla CSS (Custom Cursor & Scrollbar Physics)
- **Animation Engine**: Framer Motion (Staggered Children, Layout Animations, Spring Physics)
- **Icons**: Lucide React

### AI / ML Integration (Simulated in UI)
*The UI traces showcase expertise in building these specific pipelines:*
- **Orchestration**: LangGraph, LlamaIndex
- **Vector Search**: Pinecone, ChromaDB, Qdrant
- **LLM Inferencing**: Llama 3 via OpenRouter, Google Gemini
- **Storage/Memory**: Supabase, MongoDB

## 🚀 Getting Started

To run this portfolio locally for development or to audit the source code:

### 1. Clone the repository
```bash
git clone https://github.com/Ambuj123-lab/ambuj-portfolio-v2.git
cd ambuj-portfolio-v2
```

### 2. Install dependencies
Ensure you have Node.js installed (v18+ recommended).
```bash
npm install
```

### 3. Environment Setup
The Contact form utilizes **Web3Forms** for serverless email submission. Create a `.env.local` file in the root directory:
```env
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser to view the application.

## 🏛 Architecture Insights

* **Performant Animations**: Animations are offloaded to Framer Motion's highly optimized `requestAnimationFrame` loop, preventing main-thread blocking during deep scrolls.
* **Component Modularity**: Sections are segmented into intelligent, single-responsibility components (e.g., `AgenticTrace.tsx`, `CommandPalette.tsx`) to ensure strict separation of concerns.
* **State Management**: React Context / Hooks handle global states like the Theme toggler, while localized states (like active filters) remain efficiently scoped to specific parent containers to prevent unnecessary re-renders.

## 🤝 Let's Connect

Open to exciting roles in **Generative AI**, **Machine Learning**, or **Full-Stack Engineering**.

- **Email**: [kumarambuj8@gmail.com](mailto:kumarambuj8@gmail.com)
- **LinkedIn**: [Ambuj Tripathi](https://www.linkedin.com/in/ambuj-tripathi-042b4a118/)
- **GitHub**: [Ambuj123-lab](https://github.com/Ambuj123-lab)

---
<div align="center">
  <i>Engineered with precision and AI innovation.</i>
</div>
