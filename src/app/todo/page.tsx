"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/features/theme/theme";
import { RootState } from "./store";
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Buy groceries", completed: false, important: false },
    { id: 2, text: "Finish project report", completed: false, important: true },
    { id: 3, text: "Call the bank", completed: false, important: false },
    { id: 4, text: "Schedule dentist appointment", completed: false, important: false },
    { id: 5, text: "Plan weekend trip", completed: false, important: false },
    { id: 6, text: "Read a book", completed: true, important: false },
    { id: 7, text: "Clean the house", completed: true, important: false },
    { id: 8, text: "Prepare presentation", completed: true, important: false },
    { id: 9, text: "Update blog", completed: true, important: false },
  ]);


  const themeProperties = useSelector((state: RootState) =>
    selectThemeProperties(state)
  );

  const toggleCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleImportance = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  return (
    <div className=" h-full p-4 w-full">


      <div className=" w-full mx-auto shadow-md rounded-lg p-4">
        <h1 className="text-xl font mb-4"
          style={{ color: themeProperties.specialText }}
        >To Do</h1>

        <div
          className="flex items-end justify-between p-4 border rounded-md shadow-sm"
          style={{ backgroundColor: themeProperties.primaryColor }}
        >
          <input
            type="text"
            placeholder="Add a new task"
            className={`w-full p-2 h-32 bg-transparent focus:outline-none ${
              themeProperties.textColor === "#000000" ? " placeholder:text-black" : "placeholder:text-white"
            } `}
          />
          <Button
            className="text-sm uppercase"
            style={{ backgroundColor: themeProperties.secondaryColor,
              color: themeProperties.specialText
             }}
          >
            Add Task
          </Button>

        </div>

        <div className="space-y-2 mt-6 overflow-scroll h-[55vh]">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-2 border rounded-md shadow-sm ${
                task.completed ? "" : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded"
                />
                <span
                  className={`text-sm ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => toggleImportance(task.id)}
                className={`text-lg ${
                  task.important ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
