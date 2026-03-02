'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { BoardState, Task } from '@/lib/types';
import { loadBoardState, saveBoardState } from '@/lib/storage';
import Column from './column';

export default function Board(): JSX.Element {
  const [boardState, setBoardState] = useState<BoardState | null>(null);

  useEffect(() => {
    setBoardState(loadBoardState());
  }, []);

  useEffect(() => {
    if (boardState) {
      saveBoardState(boardState);
    }
  }, [boardState]);

  const handleDragEnd = (result: DropResult): void => {
    if (!boardState) return;
    
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = boardState.columns[source.droppableId];
    const finish = boardState.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setBoardState({
        ...boardState,
        columns: {
          ...boardState.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setBoardState({
      ...boardState,
      columns: {
        ...boardState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const addTask = (columnId: string, task: Task): void => {
    if (!boardState) return;

    const column = boardState.columns[columnId];
    const newTaskIds = [...column.taskIds, task.id];

    setBoardState({
      ...boardState,
      tasks: {
        ...boardState.tasks,
        [task.id]: task,
      },
      columns: {
        ...boardState.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  };

  const deleteTask = (taskId: string): void => {
    if (!boardState) return;

    const newTasks = { ...boardState.tasks };
    delete newTasks[taskId];

    const newColumns = { ...boardState.columns };
    Object.keys(newColumns).forEach((columnId) => {
      newColumns[columnId] = {
        ...newColumns[columnId],
        taskIds: newColumns[columnId].taskIds.filter((id) => id !== taskId),
      };
    });

    setBoardState({
      ...boardState,
      tasks: newTasks,
      columns: newColumns,
    });
  };

  if (!boardState) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {boardState.columnOrder.map((columnId) => {
          const column = boardState.columns[columnId];
          const tasks = column.taskIds.map((taskId) => boardState.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}