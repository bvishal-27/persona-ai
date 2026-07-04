# MasterJi AI — Educator Persona Platform

An AI-powered conversational platform that simulates real-time, highly authentic interactions with prominent tech educators **Hitesh Choudhary** and **Piyush Garg**. The system dynamically adapts its behavioral persona, teaching philosophy, UI aesthetic accentuation, and conversational bounds depending on the active state selection.

## 🔗 Live Deployments
* **Live Website (Frontend):** [----]
* **Production API (Backend):** [----]
* **Public GitHub Repository:** [I----]

---

## 🛠️ Technical Stack & Architecture
* **Frontend:** React (Vite), React-Markdown, Lucide Icons, Custom Contextual Tailwind/CSS
* **Backend:** Node.js, Express.js (Express 5 Routing Pipeline Architecture)
* **AI Orchestration:** Google Gemini SDK (`@google/genai`) powered by `gemini-2.5-flash`

---

## 🧠 Core System Documentation

### 1. Persona Data Collection & Preparation
Persona traits and linguistic profiles were built using publicly available digital portfolios, course structures, and video transcript indexes up to 2026:
* **Hitesh Choudhary (Chai aur Code):** Extracted signatures from 2.5K+ videos, portfolio details from `hitesh.ai`, professional history (ex-CTO iNeuron, ex-PW), and community platform layouts (`ChaiCode` cohorts, `Masterji.co` hackathons). High-energy, empathetic, metaphor-heavy conversational pacing was isolated.
* **Piyush Garg:** Mapped directly from `piyushgarg.dev`, focusing on system metrics, real active project states (*Teachyst multi-tenant SaaS LMS*, *WisprType*, *Skyping.app*), and his live **July 2026 "GenAI with JavaScript" cohort**. Direct, concise, analytical, architecture-heavy communication profiles were systematically formatted.

### 2. Prompt Engineering Strategy
The architecture skips basic system prompts in favor of **Role-Based Token Anchoring with Few-Shot Exemplars**:
* **Structural Priming:** Models are strictly bounded by explicit identity containers (`[BIOGRAPHICAL ANCHORS]`, `[TONAL SPECIFICATIONS]`).
* **Few-Shot Exemplars:** Real conversation simulations (e.g., explaining a React Hook through distinct viewpoints—Hitesh using a home construction metaphor vs. Piyush mapping the internal runtime state index pointer array) anchor strict generation boundaries.
* **Temperature Calibration:** Fixed at `0.65` to balance human conversational flow with strict adherence to structural speech profiles.

### 3. Context Management Approach
* **Conversational History Preservation:** Chat histories are stored sequentially in the React layout state. Every user prompt maps the preceding array stack into the exact structural objects expected by the modern `GoogleGenAI` content stream (`role: "user"` / `role: "model"`), ensuring multi-turn context awareness.
* **Persona Isolation Boundary Layer:** To satisfy strict persona boundaries, switching the educator persona instantly clears the active history state arrays. This prevents token context bleed, ensuring Piyush never references "Chai" and Hitesh never inherits multi-tenant DevOps configurations mid-session.

---

## 🚀 Local Installation & Setup

### Prerequisites
* Node.js (v18 or higher)
* A valid Gemini API Key from Google AI Studio

