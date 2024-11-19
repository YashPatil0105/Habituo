// // import React, { useState } from 'react';
// // import { Plus, Trash, CheckCircle } from 'lucide-react';
// // import Draggable from 'react-draggable';

// // export const PlanCreatorPage = () => {
// //   const [planType, setPlanType] = useState('daily');
// //   const [tasks, setTasks] = useState([]);
// //   const [taskName, setTaskName] = useState('');
// //   const [taskDescription, setTaskDescription] = useState('');
// //   const [taskColor, setTaskColor] = useState('#34D399'); // Default color
// //   const [taskPriority, setTaskPriority] = useState('medium');

// //   const handleAddTask = () => {
// //     if (taskName.trim()) {
// //       setTasks([...tasks, { name: taskName, description: taskDescription, color: taskColor, completed: false, priority: taskPriority }]);
// //       setTaskName('');
// //       setTaskDescription('');
// //       setTaskColor('#34D399');
// //       setTaskPriority('medium');
// //     }
// //   };

// //   const removeTask = (index) => {
// //     setTasks(tasks.filter((_, i) => i !== index));
// //   };

// //   const toggleTaskCompletion = (index) => {
// //     const updatedTasks = tasks.map((task, i) => {
// //       if (i === index) {
// //         return { ...task, completed: !task.completed };
// //       }
// //       return task;
// //     });
// //     setTasks(updatedTasks);
// //   };

// //   const handleSavePlan = () => {
// //     console.log('Plan saved:', { planType, tasks });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
// //       <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
// //         <h1 className="text-4xl font-bold mb-4 text-center">Create Your Custom Plan</h1>

// //         {/* Plan Type Selection */}
// //         <div className="mb-4">
// //           <label className="block text-sm mb-2">Select Plan Type:</label>
// //           <select
// //             value={planType}
// //             onChange={(e) => setPlanType(e.target.value)}
// //             className="block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500"
// //           >
// //             <option value="daily">Daily</option>
// //             <option value="weekly">Weekly</option>
// //             <option value="monthly">Monthly</option>
// //             <option value="yearly">Yearly</option>
// //           </select>
// //         </div>

// //         {/* Task Details Form */}
// //         <div className="mb-4">
// //           <label className="block text-sm mb-2">Task Name:</label>
// //           <input
// //             type="text"
// //             value={taskName}
// //             onChange={(e) => setTaskName(e.target.value)}
// //             className="block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500"
// //             placeholder="e.g., Monday - Push-ups"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-sm mb-2">Task Description:</label>
// //           <input
// //             type="text"
// //             value={taskDescription}
// //             onChange={(e) => setTaskDescription(e.target.value)}
// //             className="block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500"
// //             placeholder="e.g., 3 sets of 10 reps"
// //           />
// //         </div>

// //         {/* Color Picker */}
// //         <div className="mb-4">
// //           <label className="block text-sm mb-2">Choose Task Color:</label>
// //           <input
// //             type="color"
// //             value={taskColor}
// //             onChange={(e) => setTaskColor(e.target.value)}
// //             className="border border-gray-600 rounded w-full"
// //           />
// //         </div>

// //         {/* Task Priority Selector */}
// //         <div className="mb-4">
// //           <label className="block text-sm mb-2">Task Priority:</label>
// //           <select
// //             value={taskPriority}
// //             onChange={(e) => setTaskPriority(e.target.value)}
// //             className="block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500"
// //           >
// //             <option value="high">High</option>
// //             <option value="medium">Medium</option>
// //             <option value="low">Low</option>
// //           </select>
// //         </div>

// //         <button
// //           onClick={handleAddTask}
// //           className="flex items-center justify-center w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-500 transition duration-200"
// //         >
// //           <Plus className="mr-2" /> Add Task
// //         </button>

// //         {/* Task Board */}
// //         <div className="mt-4">
// //           <h2 className="text-xl font-semibold mb-2">Task Board</h2>
// //           <div className="grid grid-cols-3 gap-4">
// //             {['To Do', 'In Progress', 'Completed'].map((status) => (
// //               <div key={status} className="bg-gray-700 p-4 rounded-lg">
// //                 <h3 className="font-bold text-lg mb-2">{status}</h3>
// //                 <ul>
// //                   {tasks
// //                     .filter(task => (status === 'To Do' && !task.completed) || 
// //                                     (status === 'In Progress' && task.completed && !task.completed) || 
// //                                     (status === 'Completed' && task.completed))
// //                     .map((task, index) => (
// //                       <Draggable key={index}>
// //                         <li className={`flex justify-between items-center bg-gray-800 border border-purple-500 rounded-lg p-3 mb-2`} style={{ backgroundColor: task.color }}>
// //                           <div className="flex flex-col">
// //                             <span className="font-semibold">{task.name}</span>
// //                             <span className="text-gray-400 text-sm">{task.description}</span>
// //                           </div>
// //                           <div className="flex items-center">
// //                             <button onClick={() => toggleTaskCompletion(index)} className="text-green-500 mr-2">
// //                               {task.completed ? <CheckCircle /> : '✓'}
// //                             </button>
// //                             <button onClick={() => removeTask(index)} className="text-red-500">
// //                               <Trash />
// //                             </button>
// //                           </div>
// //                         </li>
// //                       </Draggable>
// //                     ))}
// //                 </ul>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Daily Summary Section */}
// //         <div className="mt-4">
// //           <h2 className="text-xl font-semibold mb-2">Daily Summary</h2>
// //           <ul>
// //             {tasks.filter(task => !task.completed).map((task, index) => (
// //               <li key={index} className="flex justify-between items-center bg-gray-700 border border-purple-500 rounded-lg p-3 mb-2">
// //                 <span className="font-semibold">{task.name}</span>
// //                 <span className="text-gray-400 text-sm">{task.description}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>

// //         {/* Save Plan Button */}
// //         <button
// //           onClick={handleSavePlan}
// //           className="mt-4 w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 transition duration-200"
// //         >
// //           Save Plan
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };
// import React, { useState } from 'react';
// import { Plus, Trash, CheckCircle, Layers, Calendar, Flag } from 'lucide-react';
// import Draggable from 'react-draggable';

// export const PlanCreatorPage = () => {
//   const [planType, setPlanType] = useState('daily');
//   const [tasks, setTasks] = useState([]);
//   const [taskName, setTaskName] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskColor, setTaskColor] = useState('#000000');
//   const [taskPriority, setTaskPriority] = useState('medium');

//   const handleAddTask = () => {
//     if (taskName.trim()) {
//       setTasks([...tasks, { 
//         name: taskName, 
//         description: taskDescription, 
//         color: taskColor, 
//         completed: false, 
//         priority: taskPriority 
//       }]);
//       setTaskName('');
//       setTaskDescription('');
//       setTaskColor('#34D399');
//       setTaskPriority('medium');
//     }
//   };

//   const removeTask = (index) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   const toggleTaskCompletion = (index) => {
//     const updatedTasks = tasks.map((task, i) => 
//       i === index ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//   };

//   const handleSavePlan = () => {
//     console.log('Plan saved:', { planType, tasks });
//     // In a real app, you'd implement actual save logic here
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'high': return 'border-red-500';
//       case 'medium': return 'border-yellow-500';
//       case 'low': return 'border-green-500';
//       default: return 'border-gray-500';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
//       <div className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Left Sidebar - Plan Configuration */}
//           <div className="md:col-span-1 bg-gray-800 rounded-xl p-6 shadow-lg">
//             <h2 className="text-2xl font-bold mb-6 flex items-center">
//               <Layers className="mr-3 text-purple-500" /> 
//               Plan Creator
//             </h2>

//             {/* Plan Type Selection */}
//             <div className="mb-4">
//               <label className="block text-sm mb-2 flex items-center">
//                 <Calendar className="mr-2 text-purple-500" />
//                 Select Plan Type
//               </label>
//               <select
//                 value={planType}
//                 onChange={(e) => setPlanType(e.target.value)}
//                 className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//               </select>
//             </div>

//             {/* Task Input Form */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm mb-2">Task Name</label>
//                 <input
//                   type="text"
//                   value={taskName}
//                   onChange={(e) => setTaskName(e.target.value)}
//                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter task name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm mb-2">Description</label>
//                 <input
//                   type="text"
//                   value={taskDescription}
//                   onChange={(e) => setTaskDescription(e.target.value)}
//                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Task details"
//                 />
//               </div>

//               {/* Color & Priority Row */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm mb-2">Task Color</label>
//                   <input
//                     type="color"
//                     value={taskColor}
//                     onChange={(e) => setTaskColor(e.target.value)}
//                     className="w-full h-12 rounded-lg border border-gray-600"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm mb-2 flex items-center">
//                     <Flag className="mr-2 text-purple-500" />
//                     Priority
//                   </label>
//                   <select
//                     value={taskPriority}
//                     onChange={(e) => setTaskPriority(e.target.value)}
//                     className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   >
//                     <option value="high">High</option>
//                     <option value="medium">Medium</option>
//                     <option value="low">Low</option>
//                   </select>
//                 </div>
//               </div>

//               <button
//                 onClick={handleAddTask}
//                 className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500 transition duration-200 flex items-center justify-center"
//               >
//                 <Plus className="mr-2" /> Add Task
//               </button>
//             </div>
//           </div>

//           {/* Right Section - Task Management */}
//           <div className="md:col-span-2 space-y-6">
//             {/* Task Board */}
//             <div className="grid md:grid-cols-3 gap-4">
//               {['To Do', 'In Progress', 'Completed'].map((status) => (
//                 <div key={status} className="bg-gray-800 p-4 rounded-xl">
//                   <h3 className="font-bold text-lg mb-4 text-center">{status}</h3>
//                   <div className="space-y-3">
//                     {tasks
//                       .filter(task => 
//                         (status === 'To Do' && !task.completed) || 
//                         (status === 'In Progress' && !task.completed) || 
//                         (status === 'Completed' && task.completed)
//                       )
//                       .map((task, index) => (
//                         <Draggable key={index}>
//                           <div 
//                             className={`bg-gray-700 border-l-4 ${getPriorityColor(task.priority)} rounded-lg p-3 shadow-md`}
//                             style={{ borderLeftColor: task.color }}
//                           >
//                             <div className="flex justify-between items-start">
//                               <div>
//                                 <h4 className="font-semibold text-sm">{task.name}</h4>
//                                 <p className="text-xs text-gray-400">{task.description}</p>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <button 
//                                   onClick={() => toggleTaskCompletion(index)} 
//                                   className="text-green-500 hover:text-green-400"
//                                 >
//                                   <CheckCircle size={18} />
//                                 </button>
//                                 <button 
//                                   onClick={() => removeTask(index)} 
//                                   className="text-red-500 hover:text-red-400"
//                                 >
//                                   <Trash size={18} />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </Draggable>
//                       ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Save Plan Button */}
//             <button
//               onClick={handleSavePlan}
//               className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-500 transition duration-200"
//             >
//               Save Plan
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { Plus, Trash, CheckCircle, Layers, Calendar, Flag } from 'lucide-react';
import Draggable from 'react-draggable';
import axios from 'axios';

export const PlanCreatorPage = () => {
  const [planType, setPlanType] = useState('daily');
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskColor, setTaskColor] = useState('#000000');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [plans, setPlans] = useState([]);  // For fetching existing plans
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:8000/plans'; // Update with your backend URL

  // Fetch existing plans from the backend
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchPlans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddTask = () => {
    if (taskName.trim()) {
      setTasks([...tasks, { 
        name: taskName, 
        description: taskDescription, 
        color: taskColor, 
        completed: false, 
        priority: taskPriority 
      }]);
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
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleSavePlan = async () => {
    const planData = { planType, tasks };
    try {
      const response = await axios.post(API_URL, planData);
      console.log('Plan saved:', response.data);
      fetchPlans(); // Reload the plans after saving
      // Optionally reset the state
      setTasks([]);
      setPlanType('daily');
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Sidebar - Plan Configuration */}
          <div className="md:col-span-1 bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Layers className="mr-3 text-purple-500" /> 
              Plan Creator
            </h2>

            {/* Plan Type Selection */}
            <div className="mb-4">
              <label className="block text-sm mb-2 flex items-center">
                <Calendar className="mr-2 text-purple-500" />
                Select Plan Type
              </label>
              <select
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Task Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Task Name</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter task name"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Description</label>
                <input
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Task details"
                />
              </div>

              {/* Color & Priority Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Task Color</label>
                  <input
                    type="color"
                    value={taskColor}
                    onChange={(e) => setTaskColor(e.target.value)}
                    className="w-full h-12 rounded-lg border border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 flex items-center">
                    <Flag className="mr-2 text-purple-500" />
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500 transition duration-200 flex items-center justify-center"
              >
                <Plus className="mr-2" /> Add Task
              </button>
            </div>
          </div>

          {/* Right Section - Task Management */}
          <div className="md:col-span-2 space-y-6">
            {/* Task Board */}
            <div className="grid md:grid-cols-3 gap-4">
              {['To Do', 'In Progress', 'Completed'].map((status) => (
                <div key={status} className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="font-bold text-lg mb-4 text-center">{status}</h3>
                  <div className="space-y-3">
                    {tasks
                      .filter(task => 
                        (status === 'To Do' && !task.completed) || 
                        (status === 'In Progress' && !task.completed) || 
                        (status === 'Completed' && task.completed)
                      )
                      .map((task, index) => (
                        <Draggable key={index}>
                          <div 
                            className={`bg-gray-700 border-l-4 ${getPriorityColor(task.priority)} rounded-lg p-3 shadow-md`}
                            style={{ borderLeftColor: task.color }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-sm">{task.name}</h4>
                                <p className="text-xs text-gray-400">{task.description}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => toggleTaskCompletion(index)} 
                                  className="text-green-500 hover:text-green-400"
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button 
                                  onClick={() => removeTask(index)} 
                                  className="text-red-500 hover:text-red-400"
                                >
                                  <Trash size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </Draggable>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSavePlan}
                className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-500 transition duration-200"
              >
                Save Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
