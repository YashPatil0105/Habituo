import React, { useState } from 'react';
import { Plus, Trash, CheckCircle } from 'lucide-react';
import Draggable from 'react-draggable';

export const PlanCreatorPage = () => {
  const [planType, setPlanType] = useState('daily');
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskColor, setTaskColor] = useState('#34D399'); // Default color
  const [taskPriority, setTaskPriority] = useState('medium');

  const handleAddTask = () => {
    if (taskName.trim()) {
      setTasks([...tasks, { name: taskName, description: taskDescription, color: taskColor, completed: false, priority: taskPriority }]);
      setTaskName('');
      setTaskDescription('');
      setTaskColor('#34D399');
      setTaskPriority('medium');
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSavePlan = () => {
    console.log('Plan saved:', { planType, tasks });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Create Your Custom Plan</h1>

        {/* Plan Type Selection */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Select Plan Type:</label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Task Details Form */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="e.g., Monday - Push-ups"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Task Description:</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="e.g., 3 sets of 10 reps"
          />
        </div>

        {/* Color Picker */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Choose Task Color:</label>
          <input
            type="color"
            value={taskColor}
            onChange={(e) => setTaskColor(e.target.value)}
            className="border border-gray-600 rounded w-full"
          />
        </div>

        {/* Task Priority Selector */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Task Priority:</label>
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            className="block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button
          onClick={handleAddTask}
          className="flex items-center justify-center w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-500 transition duration-200"
        >
          <Plus className="mr-2" /> Add Task
        </button>

        {/* Task Board */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Task Board</h2>
          <div className="grid grid-cols-3 gap-4">
            {['To Do', 'In Progress', 'Completed'].map((status) => (
              <div key={status} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{status}</h3>
                <ul>
                  {tasks
                    .filter(task => (status === 'To Do' && !task.completed) || 
                                    (status === 'In Progress' && task.completed && !task.completed) || 
                                    (status === 'Completed' && task.completed))
                    .map((task, index) => (
                      <Draggable key={index}>
                        <li className={`flex justify-between items-center bg-gray-800 border border-purple-500 rounded-lg p-3 mb-2`} style={{ backgroundColor: task.color }}>
                          <div className="flex flex-col">
                            <span className="font-semibold">{task.name}</span>
                            <span className="text-gray-400 text-sm">{task.description}</span>
                          </div>
                          <div className="flex items-center">
                            <button onClick={() => toggleTaskCompletion(index)} className="text-green-500 mr-2">
                              {task.completed ? <CheckCircle /> : '✓'}
                            </button>
                            <button onClick={() => removeTask(index)} className="text-red-500">
                              <Trash />
                            </button>
                          </div>
                        </li>
                      </Draggable>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Summary Section */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Daily Summary</h2>
          <ul>
            {tasks.filter(task => !task.completed).map((task, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-700 border border-purple-500 rounded-lg p-3 mb-2">
                <span className="font-semibold">{task.name}</span>
                <span className="text-gray-400 text-sm">{task.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Save Plan Button */}
        <button
          onClick={handleSavePlan}
          className="mt-4 w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 transition duration-200"
        >
          Save Plan
        </button>
      </div>
    </div>
  );
};
