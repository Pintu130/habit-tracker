
import React from 'react';
import { Task } from '@/types';
import { Check, Trash2 } from 'lucide-react';
import { useTasks } from '@/context/TaskContext';
import { CATEGORIES } from '@/types';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask } = useTasks();
  
  const category = CATEGORIES.find(cat => cat.value === task.category) || CATEGORIES[4]; // Default to "other"

  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <button
        onClick={() => toggleTaskCompletion(task.id)}
        className={`flex items-center justify-center h-6 w-6 rounded-full border-2 transition-all ${
          task.isCompleted 
            ? 'bg-primary border-primary text-primary-foreground' 
            : 'border-muted-foreground hover:border-primary'
        }`}
      >
        {task.isCompleted && <Check className="h-4 w-4" />}
      </button>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{task.title}</h3>
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: category.color }}
          />
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-4">
          <span>{task.isRecurring ? `${task.frequency}` : 'one-time'}</span>
          {task.reminderTime && (
            <span>at {task.reminderTime}</span>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => deleteTask(task.id)} 
        className="text-muted-foreground hover:text-destructive transition-colors"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
