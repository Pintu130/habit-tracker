
import React from 'react';
import { CalendarView } from '@/components/CalendarView';

export default function CalendarPage() {
  return (
    <div className="container max-w-5xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Track your habits and view your progress</p>
        </div>
        
        <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm">
          <CalendarView />
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary/20 rounded"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500/20 rounded"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive/10 rounded"></div>
            <span>Not Started</span>
          </div>
        </div>
      </div>
    </div>
  );
}
