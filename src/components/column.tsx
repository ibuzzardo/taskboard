'use client';

import { Droppable } from '@hello-pangea/dnd';
import { Column as ColumnType, Task } from '@/lib/types';
import TaskCard from './task-card';
import AddTask from './add-task';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (columnId: string, task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const getColumnHeaderColor = (columnId: string): string => {
  switch (columnId) {
    case 'todo':
      return 'text-primary';
    case 'inprogress':
      return 'text-secondary';
    case 'done':
      return 'text-accent';
    default:
      return 'text-gray-700';
  }
};

export default function Column({ column, tasks, onAddTask, onDeleteTask }: ColumnProps): JSX.Element {
  return (
    <div className="flex-1 min-w-80 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold mb-2 ${getColumnHeaderColor(column.id)}`}>
          {column.title}
        </h2>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      
      <AddTask columnId={column.id} onAddTask={onAddTask} />
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-32 mt-4 rounded-lg transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-100' : ''
            }`}
          >
            {tasks.length === 0 ? (
              <div className="text-center text-muted py-8">
                <p>No tasks yet</p>
                <p className="text-sm">Add a task to get started</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={onDeleteTask}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}