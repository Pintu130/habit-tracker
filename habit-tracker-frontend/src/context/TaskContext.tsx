
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Task } from "../types";
import { useToast } from "@/components/ui/use-toast";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "isCompleted">) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  getTasksByDate: (date: string) => Task[];
  getCompletionPercentage: (date: string) => number;
  getStreak: (date: string) => number;
  getTasksForMonth: (month: number, year: number) => Record<string, Task[]>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // Add some sample tasks for demo
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const sampleTasks: Task[] = [
        {
          id: "task-1",
          title: "Morning meditation",
          category: "health",
          isRecurring: true,
          frequency: "daily",
          reminderTime: "08:00",
          isCompleted: false,
          date: today
        },
        {
          id: "task-2",
          title: "Complete project proposal",
          category: "work",
          isRecurring: false,
          frequency: "daily",
          reminderTime: "14:00",
          isCompleted: false,
          date: today
        },
        {
          id: "task-3",
          title: "Evening workout",
          category: "health",
          isRecurring: true,
          frequency: "daily",
          reminderTime: "18:00",
          isCompleted: false,
          date: today
        },
        {
          id: "task-4",
          title: "Morning run",
          category: "health",
          isRecurring: true,
          frequency: "daily",
          reminderTime: "07:00",
          isCompleted: true,
          date: yesterday
        },
        {
          id: "task-5",
          title: "Read a chapter",
          category: "personal",
          isRecurring: true,
          frequency: "daily",
          reminderTime: "21:00",
          isCompleted: true,
          date: yesterday
        }
      ];
      setTasks(sampleTasks);
      localStorage.setItem("tasks", JSON.stringify(sampleTasks));
    }
  }, []);

  // Save tasks to local storage when they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, "id" | "isCompleted">) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      isCompleted: false,
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast({
      title: "Task added",
      description: "Your new task has been added successfully",
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully",
    });
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const getCompletionPercentage = (date: string) => {
    const tasksForDay = getTasksByDate(date);
    if (tasksForDay.length === 0) return 0;
    
    const completedTasks = tasksForDay.filter(task => task.isCompleted).length;
    return Math.round((completedTasks / tasksForDay.length) * 100);
  };

  const getStreak = (date: string) => {
    // Simulate streak calculation - in a real app, you would calculate consecutive days
    return Math.floor(Math.random() * 10) + 1; // Random streak between 1-10 for demo
  };

  const getTasksForMonth = (month: number, year: number) => {
    const result: Record<string, Task[]> = {};
    
    tasks.forEach(task => {
      const taskDate = new Date(task.date);
      if (taskDate.getMonth() === month && taskDate.getFullYear() === year) {
        const dateStr = task.date;
        if (!result[dateStr]) {
          result[dateStr] = [];
        }
        result[dateStr].push(task);
      }
    });
    
    return result;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        getTasksByDate,
        getCompletionPercentage,
        getStreak,
        getTasksForMonth
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
