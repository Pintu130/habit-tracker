
import React, { useState } from 'react';
import { useTasks } from '@/context/TaskContext';

export function CalendarView() {
  const { getTasksForMonth, getCompletionPercentage } = useTasks();
  
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  
  // Get tasks for the current month
  const tasksForMonth = getTasksForMonth(currentMonth, currentYear);
  
  // Calculate the days in the month and the starting day of the week
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Generate days for the calendar
  const days = [];
  
  // Add empty cells for days before the start of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 border border-border/50"></div>);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const tasksForDay = tasksForMonth[dateStr] || [];
    const completionRate = getCompletionPercentage(dateStr);
    
    let bgColor = 'bg-transparent';
    if (tasksForDay.length > 0) {
      if (completionRate === 100) {
        bgColor = 'bg-secondary/20';
      } else if (completionRate > 0) {
        bgColor = 'bg-amber-500/20';
      } else {
        bgColor = 'bg-destructive/10';
      }
    }
    
    const isToday = 
      day === currentDate.getDate() && 
      currentMonth === currentDate.getMonth() && 
      currentYear === currentDate.getFullYear();
    
    days.push(
      <div 
        key={day} 
        className={`h-24 border border-border/50 p-2 relative ${bgColor} transition-all hover:bg-muted/50`}
      >
        <div className={`flex justify-between ${isToday ? 'font-bold' : ''}`}>
          <span>{day}</span>
          {tasksForDay.length > 0 && (
            <span className="text-xs bg-primary/20 text-primary px-1 rounded">
              {tasksForDay.length} {tasksForDay.length === 1 ? 'task' : 'tasks'}
            </span>
          )}
        </div>
        
        {tasksForDay.length > 0 && (
          <div className="mt-1 space-y-1 text-xs">
            {tasksForDay.slice(0, 2).map(task => (
              <div 
                key={task.id} 
                className={`truncate ${task.isCompleted ? 'line-through opacity-70' : ''}`}
              >
                {task.title}
              </div>
            ))}
            {tasksForDay.length > 2 && (
              <div className="text-muted-foreground">+{tasksForDay.length - 2} more</div>
            )}
          </div>
        )}
        
        {isToday && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
        )}
      </div>
    );
  }
  
  const previousMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{monthNames[currentMonth]} {currentYear}</h2>
        <div className="flex gap-2">
          <button 
            onClick={previousMonth}
            className="p-2 border rounded-md hover:bg-muted transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => {
              setCurrentMonth(new Date().getMonth());
              setCurrentYear(new Date().getFullYear());
            }}
            className="p-2 border rounded-md hover:bg-muted transition-colors"
          >
            Today
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 border rounded-md hover:bg-muted transition-colors"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px text-center font-medium">
        <div className="p-2">Sun</div>
        <div className="p-2">Mon</div>
        <div className="p-2">Tue</div>
        <div className="p-2">Wed</div>
        <div className="p-2">Thu</div>
        <div className="p-2">Fri</div>
        <div className="p-2">Sat</div>
      </div>
      
      <div className="grid grid-cols-7 gap-px">
        {days}
      </div>
    </div>
  );
}
