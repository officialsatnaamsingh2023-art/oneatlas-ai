# OneAtlas AI 🌐

**Discover. Compare. Understand AI Models.**

OneAtlas AI is an AI model discovery platform designed to help users explore, search, compare, and evaluate different AI models from leading providers through a unified interface.

The project aims to make AI model discovery easier by bringing model information, provider details, pricing information, and rankings together in one place.

## ✨ Features

- **Dashboard:** Overview of featured AI models and platform statistics.
- **Explore Models:** Browse available AI models.
- **Search & Filters:** Search by model or provider and filter by category.
- **Sorting:** Organize models by available attributes.
- **Model Details:** View individual model information, capabilities, and pricing.
- **Model Comparison:** Compare two models side by side.
- **Rankings:** Explore an illustrative model ranking interface.
- **AI Providers:** Browse AI companies and their models.
- **Responsive Interface:** Dark-themed dashboard design.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Git & GitHub | Version control |

## 📁 Project Structure

```text
oneatlas-ai/
├── app/
│   ├── components/
│   │   ├── ModelCard.tsx
│   │   ├── ModelFilters.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── data/
│   │   └── models.ts
│   ├── models/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── compare/
│   ├── providers/
│   ├── rankings/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/officialsatnaamsingh2023-art/oneatlas-ai.git
```

2. Navigate into the project:

```bash
cd oneatlas-ai
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
```

## 🗺️ Development Roadmap

- [x] Day 1: Frontend foundation and navigation
- [ ] Day 2: Backend APIs and PostgreSQL database integration using Prisma
- [ ] Day 3: Testing, deployment, and project demonstration

## 📌 Project Status

**Current Stage:** Day 1 — Frontend foundation completed.

The current version uses sample model data. Database integration, backend APIs, and deployment are planned for the next development stages.

## 👨‍💻 Author

**Satnaam Singh**

GitHub: [officialsatnaamsingh2023-art](https://github.com/officialsatnaamsingh2023-art)

---

*OneAtlas AI — One platform to explore the AI model ecosystem.*