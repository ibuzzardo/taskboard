# Taskboard

> Built with [Dark Factory v4](https://github.com/ibuzzardo/dark-factory-v4) — autonomous AI software development pipeline

**[Live Demo](https://taskboard-swart.vercel.app)**


A modern Kanban-style task board built with Next.js 15, TypeScript, and Tailwind CSS. Features drag-and-drop functionality and localStorage persistence.

## Features

- Three columns: To Do, In Progress, Done
- Drag and drop tasks between columns
- Add new tasks with title and description
- Delete tasks
- Task count in column headers
- Responsive design
- localStorage persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: @hello-pangea/dnd
- **Validation**: Zod
- **Storage**: localStorage

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── board.tsx
│   ├── column.tsx
│   ├── task-card.tsx
│   └── add-task.tsx
└── lib/
    ├── types.ts
    └── storage.ts
```