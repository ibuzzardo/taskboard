'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, index, onDelete }: TaskCardProps): JSX.Element {
  const handleDelete = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-foreground shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow cursor-move ${
            snapshot.isDragging ? 'rotate-2 shadow-xl' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-muted mb-2">{task.description}</p>
              )}
              <p className="text-xs text-muted">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={handleDelete}
              className="ml-2 text-destructive hover:text-destructive/80 transition-colors p-1 rounded"
              aria-label="Delete task"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}