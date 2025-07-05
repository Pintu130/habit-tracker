import React, { useEffect, useState } from "react";
import { CircularProgress } from "@/components/CircularProgress";
import { useTasks } from "@/context/TaskContext";
import { TaskItem } from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllTaskMutation } from "@/lib/apiEndPoints";
import useLocalStorageHelper from "@/hooks/useLocalStorageHelper";

export default function DashboardPage() {
  const { getItem } = useLocalStorageHelper();
  const storedUser = getItem("user");
  const token = storedUser?.token || "";

  const {
    tasks,
    getTasksByDate,
    getCompletionPercentage,
    setTasksFromAPI,
  } = useTasks();

  const [getAllTask, { data, isLoading, error }] = useGetAllTaskMutation();
  const [today] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (token) {
      getAllTask({ token })
        .unwrap()
        .then((res) => {
          const transformed = res.tasks.map((t) => ({
            id: t._id,
            title: t.title,
            category: t.category,
            date: t.date.split("T")[0],
            isRecurring: t.isRecurring,
            frequency: t.frequency ?? "",
            reminderTime: t.reminderTime ?? "",
            isCompleted: false, // default false since API does not send it
          }));
          console.log("transformed tasks from API", transformed);
          setTasksFromAPI(transformed);
        })
        .catch(console.error);
    }
  }, [token]);

  const todayTasks = getTasksByDate(today);
  const completionRate = getCompletionPercentage(today);
  const remainingTasks = todayTasks.filter((task) => !task.isCompleted);

  if (isLoading) {
    return <div className="p-4">Loading tasks...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Your Day</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Progress section */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-card p-6 rounded-lg shadow-sm">
          <CircularProgress percentage={completionRate} />
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-semibold">Today's Progress</h2>
            <p className="text-muted-foreground">
              You've completed{" "}
              {todayTasks.filter((task) => task.isCompleted).length} out of{" "}
              {todayTasks.length} tasks for today.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button asChild variant="outline">
                <Link to="/calendar">View Calendar</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Today Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Tasks</h2>
            <Button asChild size="sm" className="gap-1">
              <Link to="/add-task">
                <Plus className="h-4 w-4" /> Add Task
              </Link>
            </Button>
          </div>

          {todayTasks.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No tasks for today</p>
              <Button asChild variant="link">
                <Link to="/add-task">Add your first task</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {/* Uncompleted */}
              {remainingTasks.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Remaining
                  </h3>
                  <div className="divide-y rounded-md border bg-card">
                    {remainingTasks.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed */}
              {todayTasks.some((task) => task.isCompleted) && (
                <div className="space-y-2 mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Completed
                  </h3>
                  <div className="divide-y rounded-md border bg-card">
                    {todayTasks
                      .filter((task) => task.isCompleted)
                      .map((task) => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* All Tasks from API */}
        <div className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">All Tasks (From API)</h2>
          {tasks.length === 0 ? (
            <p className="text-muted-foreground">No tasks found.</p>
          ) : (
            <div className="divide-y rounded-md border bg-card">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
