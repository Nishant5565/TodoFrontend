"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectThemeProperties } from "@/features/theme/theme";
import { RootState } from "./store";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/features/tasks/tasks";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
  favorite?: boolean; 
}

const TasksPage = () => {
  const dispatch = useDispatch();
  const user: any | null = useSelector((state: RootState) => state?.auth?.user) || null;
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const themeProperties = useSelector((state: RootState) => selectThemeProperties(state));
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    } else {
      const localTasks = localStorage.getItem("tasks");
      if (localTasks) {
        setTasks(JSON.parse(localTasks));
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      important: false,
    };
    if (user) {
      dispatch(createTask(newTask));
    } else {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    setNewTaskText("");
  };

  const handleToggleCompletion = (id: number) => {
    if (user) {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        dispatch(updateTask({ id: task.id, taskData: { ...task, completed: !task.completed } }));
      }
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  const handleToggleFavourite = (id: number) => {
    if (user) {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        dispatch(updateTask({ id: task.id, taskData: { ...task, favorite: !task.favorite } }));
      }
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, favorite: !task.favorite } : task
        )
      );
    }
  };

  const handleDeleteTask = (id: number) => {
    if (user) {
      dispatch(deleteTask(id));
    } else {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const notCompletedTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="h-full p-4 w-full">
      <div className="w-full mx-auto shadow-md rounded-lg p-4">
        <h1
          className="text-xl font mb-4"
          style={{ color: themeProperties.specialText }}
        >
          To Do
        </h1>

        <div
          className="flex items-end justify-between p-4 border rounded-md shadow-sm"
          style={{ backgroundColor: themeProperties.primaryColor }}
        >
          <input
            type="text"
            placeholder="Add a new task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className={`w-full p-2 h-32 bg-transparent focus:outline-none ${
              themeProperties.textColor === "#000000"
                ? " placeholder:text-black"
                : "placeholder:text-white"
            } `}
          />
          <Button
            className="text-sm uppercase"
            style={{
              backgroundColor: themeProperties.secondaryColor,
              color: themeProperties.specialText,
            }}
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </div>

        <div className="space-y-2 mt-6 overflow-scroll h-[55vh]">
          <div>
            {notCompletedTasks.map((task, index) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-6 ${
                  themeProperties.textColor == "#000000"
                    ? ""
                    : " border-gray-500"
                } ${
                  index === notCompletedTasks.length - 1 ? "" : "border-b-2"
                }`}
              >
                <div className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(task.id)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded cursor-pointer"
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
                  onClick={() => handleToggleFavourite(task.id)}
                  className={`text-lg`}
                >
                  {task?.favorite ? <FaStar size={23} /> : <CiStar size={23} />}
                </button>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-sm ">Completed</h2>
            {completedTasks.map((task, index) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-6 ${
                  themeProperties.textColor == "#000000"
                    ? ""
                    : " border-gray-500"
                } ${
                  index === completedTasks.length - 1 ? "" : "border-b-2"
                }`}
              >
                <div className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(task.id)}
                    className="custom-checkbox w-4 h-4 border-gray-300 rounded cursor-pointer"
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
                  onClick={() => handleToggleFavourite(task.id)}
                  className={`text-lg `}
                >
                  {task?.favorite ? <FaStar size={23} /> : <CiStar size={23} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;