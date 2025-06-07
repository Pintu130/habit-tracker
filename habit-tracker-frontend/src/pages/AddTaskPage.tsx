
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CATEGORIES, Category } from '@/types';

export default function AddTaskPage() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('personal');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [reminderTime, setReminderTime] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTask({
      title,
      category,
      isRecurring,
      frequency,
      reminderTime,
      date,
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Add New Task</h1>
          <p className="text-muted-foreground">Create a new task or habit to track</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
            {/* Task Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as Category)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Due Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            {/* Recurring Task */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="recurring">Recurring Task</Label>
                <p className="text-sm text-muted-foreground">Set if this task repeats</p>
              </div>
              <Switch
                id="recurring"
                checked={isRecurring}
                onCheckedChange={setIsRecurring}
              />
            </div>
            
            {/* Frequency (only shown if recurring) */}
            {isRecurring && (
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={frequency}
                  onValueChange={(value) => setFrequency(value as 'daily' | 'weekly')}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Reminder Time */}
            <div className="space-y-2">
              <Label htmlFor="reminderTime">Reminder Time (Optional)</Label>
              <Input
                id="reminderTime"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
          </div>
          
          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
