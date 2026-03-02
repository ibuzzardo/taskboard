import { BoardState } from './types';

const STORAGE_KEY = 'taskboard-state';

const defaultBoardState: BoardState = {
  tasks: {},
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      taskIds: [],
    },
    inprogress: {
      id: 'inprogress',
      title: 'In Progress',
      taskIds: [],
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['todo', 'inprogress', 'done'],
};

export function loadBoardState(): BoardState {
  try {
    if (typeof window === 'undefined') {
      return defaultBoardState;
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultBoardState;
    }
    
    const parsed = JSON.parse(stored);
    
    // Validate the structure
    if (!parsed.tasks || !parsed.columns || !parsed.columnOrder) {
      return defaultBoardState;
    }
    
    return parsed as BoardState;
  } catch (error) {
    console.error('Failed to load board state:', error);
    return defaultBoardState;
  }
}

export function saveBoardState(state: BoardState): void {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save board state:', error);
  }
}