export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardState {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

export type ColumnId = 'todo' | 'inprogress' | 'done';