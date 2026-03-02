import Board from '@/components/board';

export default function Home(): JSX.Element {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Board</h1>
        <p className="text-muted">Organize your tasks with drag-and-drop simplicity</p>
      </div>
      <Board />
    </main>
  );
}