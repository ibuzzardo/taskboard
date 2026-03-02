'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Task } from '@/lib/types';

interface AddTaskProps {
  columnId: string;
  onAddTask: (columnId: string, task: Task) => void;
}

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(500, 'Description too long').optional(),
});

export default function AddTask({ columnId, onAddTask }: AddTaskProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    try {
      const validatedData = taskSchema.parse({ title, description });
      
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: validatedData.title,
        description: validatedData.description || undefined,
        createdAt: new Date().toISOString(),
      };
      
      onAddTask(columnId, newTask);
      
      // Reset form
      setTitle('');
      setDescription('');
      setErrors({});
      setIsOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { title?: string; description?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'title') {
            fieldErrors.title = err.message;
          } else if (err.path[0] === 'description') {
            fieldErrors.description = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleCancel = (): void => {
    setTitle('');
    setDescription('');
    setErrors({});
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Task
      </button>
    );
  }

  return (
    <div className="bg-foreground rounded-lg p-4 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.title ? 'border-destructive' : 'border-gray-300'
            }`}
            autoFocus
          />
          {errors.title && (
            <p className="text-destructive text-sm mt-1">{errors.title}</p>
          )}
        </div>
        
        <div>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
              errors.description ? 'border-destructive' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="text-destructive text-sm mt-1">{errors.description}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}