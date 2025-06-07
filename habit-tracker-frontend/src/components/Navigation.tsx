
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Home, Plus, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const { user } = useAuth();

  // If no user is logged in, don't show the navigation
  if (!user) return null;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card p-4 h-screen fixed left-0 top-0">
        <div className="mb-8 px-4">
          <h1 className="text-xl font-bold">HabitTracker</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
          >
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </NavLink>

          <NavLink
            to="/add-task"
            className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
          >
            <Plus className="w-5 h-5" />
            <span>Add Task</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>
        </nav>

        <div className="mt-auto px-4">
          <Button variant="secondary" asChild className="w-full">
            <NavLink to="/subscription">Upgrade Plan</NavLink>
          </Button>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center h-16 z-10">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) => `flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Calendar</span>
        </NavLink>

        <NavLink
          to="/add-task"
          className={({ isActive }) => `flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs">Add</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </nav>
    </>
  );
}
