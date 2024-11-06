// import React, { useState, useEffect } from 'react';
// import { ProgressBar } from 'react-bootstrap'; // For progress bars
// import { Calendar, CheckCircle, Bell } from 'lucide-react'; // Icons
// import Modal from 'react-bootstrap/Modal'; // Modal component from react-bootstrap

// export const DashboardPage = () => {
//   const [user, setUser] = useState({ name: 'John Doe' });
//   const [tasks, setTasks] = useState([
//     { id: 1, name: 'Complete coding assignment', completed: false },
//     { id: 2, name: 'Read 20 pages of a book', completed: false },
//     { id: 3, name: 'Workout for 30 minutes', completed: false },
//   ]);
//   const [challenges, setChallenges] = useState({
//     totalDays: 21,
//     completedDays: new Array(21).fill(false), // Tracks completed days
//     currentProgress: 0,
//   });
//   const [notifications, setNotifications] = useState([
//     { message: "🔔 Don't break your streak!", timestamp: new Date() },
//     { message: "🔔 Remember to log your progress today!", timestamp: new Date() },
//     { message: "🔔 New challenges available!", timestamp: new Date() },
//   ]);
  
//   // Modal state
//   const [showModal, setShowModal] = useState(false);

//   // Effect to initialize current progress
//   useEffect(() => {
//     const completedCount = tasks.filter(task => task.completed).length;
//     setChallenges(prevChallenges => ({
//       ...prevChallenges,
//       currentProgress: completedCount,
//     }));

//     // Load data from local storage
//     const storedTasks = localStorage.getItem('tasks');
//     const storedChallenges = localStorage.getItem('challenges');
//     if (storedTasks) setTasks(JSON.parse(storedTasks));
//     if (storedChallenges) setChallenges(JSON.parse(storedChallenges));
//   }, [tasks]);

//   // Effect to save tasks and challenges to local storage
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     localStorage.setItem('challenges', JSON.stringify(challenges));
//   }, [tasks, challenges]);

//   // Check if the user has missed a day and reset tasks
//   const checkMissedDays = () => {
//     const missed = tasks.filter(task => !task.completed).length;
//     if (missed > 0) {
//       setTasks(prevTasks => prevTasks.map(task => ({ ...task, completed: false })));
//       alert("You've missed a day! All tasks have been reset.");
//     }
//   };

//   // Handle task completion
//   const handleTaskCompletion = (taskId) => {
//     setTasks(prevTasks => {
//       const updatedTasks = prevTasks.map(task =>
//         task.id === taskId ? { ...task, completed: !task.completed } : task
//       );

//       // Check for missed days
//       checkMissedDays();
//       return updatedTasks;
//     });
//   };

//   // Handle adding a new task
//   const addTask = (taskName) => {
//     const newTask = { id: Date.now(), name: taskName, completed: false };
//     setTasks(prevTasks => [...prevTasks, newTask]);
//   };

//   // Handle streak day completion
//   const handleStreakCompletion = (index) => {
//     setChallenges(prevChallenges => {
//       const updatedCompletedDays = [...prevChallenges.completedDays];
//       updatedCompletedDays[index] = !updatedCompletedDays[index]; // Toggle completion status

//       return {
//         ...prevChallenges,
//         completedDays: updatedCompletedDays,
//       };
//     });
//   };

//   // Restore streak functionality
//   const restoreStreak = () => {
//     setTasks(prevTasks =>
//       prevTasks.map((task, index) => ({
//         ...task,
//         completed: challenges.completedDays[index] || false,
//       }))
//     );
//     setShowModal(false); // Close the modal after restoration
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col p-5">
//       <header className="flex justify-between items-center mb-5">
//         <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
//         <Bell className="text-2xl cursor-pointer" />
//       </header>

//       <main className="flex flex-col lg:flex-row gap-5">
//         {/* Current Challenge Section */}
//         <section className="flex-1 bg-gray-800 rounded-lg shadow-lg p-5">
//           <h2 className="text-xl font-semibold mb-4">Current Challenge</h2>
//           <div className="flex items-center justify-between mb-4">
//             <span>{challenges.totalDays}-day Challenge</span>
//             <span>{challenges.currentProgress}/{challenges.totalDays}</span>
//           </div>
//           <ProgressBar
//             now={(challenges.currentProgress / challenges.totalDays) * 100}
//             variant="success"
//             className="bg-gray-700"
//           />
//           <button
//             onClick={() => setShowModal(true)}
//             className="mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
//           >
//             Restore Streak
//           </button>
//         </section>
//       </main>

//       {/* Daily Task List */}
//       <section className="bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
//         <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
//         <ul className="flex flex-col gap-2">
//           {tasks.map(task => (
//             <li key={task.id} className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="mr-2 cursor-pointer"
//                 checked={task.completed}
//                 onChange={() => handleTaskCompletion(task.id)} // Update task completion
//               />
//               <span className={task.completed ? 'line-through text-gray-400' : ''}>
//                 {task.name}
//               </span>
//             </li>
//           ))}
//         </ul>
//         <button onClick={() => addTask(prompt("Enter new task:"))} className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
//           Add Task
//         </button>
//       </section>

//       {/* Streaks Overview */}
//       <section className="flex-1 bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
//         <h2 className="text-xl font-semibold mb-4">Streaks Overview</h2>
//         <div className="grid grid-cols-7 gap-1">
//           {challenges.completedDays.map((completed, index) => (
//             <div
//               key={index}
//               className={`w-8 h-8 flex items-center justify-center rounded ${
//                 completed ? 'bg-green-500 cursor-pointer' : 'bg-gray-700 cursor-pointer'
//               }`}
//               onClick={() => handleStreakCompletion(index)} // Handle streak checkbox click
//             >
//               <input
//                 type="checkbox"
//                 checked={completed}
//                 readOnly
//                 className="opacity-0 absolute cursor-pointer"
//               />
//               {completed && <CheckCircle className="text-white" />}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Notification Panel */}
//       <section className="bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
//         <h2 className="text-xl font-semibold mb-4">Notifications</h2>
//         <ul className="flex flex-col gap-2">
//           {notifications.map((notification, index) => (
//             <li key={index}>
//               {notification.message} <span className="text-gray-400 text-sm">{notification.timestamp.toLocaleString()}</span>
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Restore Streak Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Restore Streak</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to restore your streak?</Modal.Body>
//         <Modal.Footer>
//           <button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </button>
//           <button variant="primary" onClick={restoreStreak}>
//             Confirm
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// // export default DashboardPage;
// import React, { useState, useEffect } from 'react';
// import { ProgressBar } from 'react-bootstrap'; // For progress bars
// import { Calendar, CheckCircle, Bell } from 'lucide-react'; // Icons
// import Modal from 'react-bootstrap/Modal'; // Modal component from react-bootstrap

// export const DashboardPage = () => {
//   const [user, setUser] = useState({ name: 'John Doe' });
//   const [tasks, setTasks] = useState([
//     { id: 1, name: 'Complete coding assignment', completed: false },
//     { id: 2, name: 'Read 20 pages of a book', completed: false },
//     { id: 3, name: 'Workout for 30 minutes', completed: false },
//   ]);
//   const [challenges, setChallenges] = useState({
//     totalDays: 21,
//     completedDays: new Array(21).fill(false), // Tracks completed days
//     currentProgress: 0,
//   });
//   const [notifications, setNotifications] = useState([
//     { message: "🔔 Don't break your streak!", timestamp: new Date() },
//     { message: "🔔 Remember to log your progress today!", timestamp: new Date() },
//     { message: "🔔 New challenges available!", timestamp: new Date() },
//   ]);
  
//   // Modal state
//   const [showModal, setShowModal] = useState(false);

//   // Effect to initialize current progress
//   useEffect(() => {
//     // Load data from local storage
//     const storedTasks = localStorage.getItem('tasks');
//     const storedChallenges = localStorage.getItem('challenges');
//     if (storedTasks) setTasks(JSON.parse(storedTasks));
//     if (storedChallenges) setChallenges(JSON.parse(storedChallenges));
    
//     // Check for missed days
//     checkMissedDays();
//     const completedCount = tasks.filter(task => task.completed).length;
//     setChallenges(prevChallenges => ({
//       ...prevChallenges,
//       currentProgress: completedCount,
//     }));
//   }, []);

//   // Effect to save tasks and challenges to local storage
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     localStorage.setItem('challenges', JSON.stringify(challenges));
//   }, [tasks, challenges]);

//   // Check if the user has missed a day and reset tasks
//   const checkMissedDays = () => {
//     const missed = tasks.filter(task => !task.completed).length;
//     if (missed > 0) {
//       setTasks(prevTasks => prevTasks.map(task => ({ ...task, completed: false })));
//       alert("You've missed a day! All tasks have been reset.");

//       // Add notification for streak reset
//       setNotifications(prevNotifications => [
//         { message: "🔔 Your streak has been reset due to missed tasks!", timestamp: new Date() },
//         ...prevNotifications
//       ]);
//     }
//   };

//   // Handle task completion
//   const handleTaskCompletion = (taskId) => {
//     setTasks(prevTasks => {
//       const updatedTasks = prevTasks.map(task =>
//         task.id === taskId ? { ...task, completed: !task.completed } : task
//       );

//       // Check for missed days
//       checkMissedDays();
//       return updatedTasks;
//     });
//   };

//   // Handle adding a new task
//   const addTask = (taskName) => {
//     if (!taskName) return; // Prevent adding empty tasks
//     const newTask = { id: Date.now(), name: taskName, completed: false };
//     setTasks(prevTasks => [...prevTasks, newTask]);
//   };

//   // Handle streak day completion (allow only one checkbox to be checked)
//   const handleStreakCompletion = (index) => {
//     setChallenges(prevChallenges => {
//       const updatedCompletedDays = [...prevChallenges.completedDays];
//       updatedCompletedDays[index] = !updatedCompletedDays[index]; // Toggle completion status

//       // Ensure only one checkbox can be checked
//       for (let i = 0; i < updatedCompletedDays.length; i++) {
//         if (i !== index) updatedCompletedDays[i] = false;
//       }

//       return {
//         ...prevChallenges,
//         completedDays: updatedCompletedDays,
//       };
//     });
//   };

//   // Restore streak functionality
//   const restoreStreak = () => {
//     setTasks(prevTasks =>
//       prevTasks.map((task, index) => ({
//         ...task,
//         completed: challenges.completedDays[index] || false,
//       }))
//     );
//     setShowModal(false); // Close the modal after restoration
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col p-5">
//       <header className="flex justify-between items-center mb-5">
//         <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
//         <Bell className="text-2xl cursor-pointer" />
//       </header>

//       <main className="flex flex-col lg:flex-row gap-5">
//         {/* Current Challenge Section */}
//         <section className="flex-1 bg-gray-800 rounded-lg shadow-lg p-5">
//           <h2 className="text-xl font-semibold mb-4">Current Challenge</h2>
//           <div className="flex items-center justify-between mb-4">
//             <span>{challenges.totalDays}-day Challenge</span>
//             <span>{challenges.currentProgress}/{challenges.totalDays}</span>
//           </div>
//           <ProgressBar
//             now={(challenges.currentProgress / challenges.totalDays) * 100}
//             variant="success"
//             className="bg-gray-700"
//           />
//           <button
//             onClick={() => setShowModal(true)}
//             className="mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
//           >
//             Restore Streak
//           </button>
//         </section>
//       </main>

//       {/* Daily Task List */}
//       <section className="bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
//         <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
//         <ul className="flex flex-col gap-2">
//           {tasks.map(task => (
//             <li key={task.id} className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="mr-2 cursor-pointer"
//                 checked={task.completed}
//                 onChange={() => handleTaskCompletion(task.id)} // Update task completion
//               />
//               <span className={task.completed ? 'line-through text-gray-400' : ''}>
//                 {task.name}
//               </span>
//             </li>
//           ))}
//         </ul>
//         <button onClick={() => addTask(prompt("Enter new task:"))} className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
//           Add Task
//         </button>
//       </section>

//       {/* Streaks Overview */}
//       <section className="flex-1 bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
//         <h2 className="text-xl font-semibold mb-4">Streaks Overview</h2>
//         <div className="grid grid-cols-7 gap-1">
//           {challenges.completedDays.map((completed, index) => (
//             <div
//               key={index}
//               className={`w-8 h-8 flex items-center justify-center rounded ${
//                 completed ? 'bg-green-500 cursor-pointer' : 'bg-gray-700 cursor-pointer'
//               }`}
//               onClick={() => handleStreakCompletion(index)} // Handle streak checkbox click
//             >
//               <input
//                 type="checkbox"
//                 checked={completed}
//                 readOnly
//                 className="opacity-0 absolute cursor-pointer"
//               />
//               {completed && <CheckCircle className="text-white" />}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Notification Panel */}
//       <section className="bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
//         <h2 className="text-xl font-semibold mb-4">Notifications</h2>
//         <ul className="flex flex-col gap-2">
//           {notifications.map((notification, index) => (
//             <li key={index}>
//               {notification.message} <span className="text-gray-400 text-sm">{notification.timestamp.toLocaleString()}</span>
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Restore Streak Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Restore Streak</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to restore your streak?</Modal.Body>
//         <Modal.Footer>
//           <button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </button>
//           <button variant="primary" onClick={restoreStreak}>
//             Confirm
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Bell, Calendar, CheckCircle, Trophy, Target, Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const DashboardPage = () => {
  // User state
  const [user, setUser] = useState({
    name: "John Doe",
    streakRestoreAvailable: true,
    avatar: "/api/placeholder/150/150" // Placeholder avatar
  });

  // Challenge state with date tracking
  const [challenges, setChallenges] = useState({
    totalDays: 21,
    completedDays: new Array(21).fill(false),
    completedDates: new Array(21).fill(null),
    currentProgress: 0,
    streakBroken: false,
    lastCompletedDate: null
  });

  // Tasks state with categories
  const [tasks, setTasks] = useState([
    { id: 1, name: "Complete daily exercise", category: "Health", completed: false },
    { id: 2, name: "Read for 30 minutes", category: "Learning", completed: false },
    { id: 3, name: "Practice meditation", category: "Mindfulness", completed: false },
    { id: 4, name: "Write in journal", category: "Personal", completed: false }
  ]);

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Check streak status on component mount and date change
  useEffect(() => {
    checkStreakStatus();
  }, []);

  // Function to check if streak is broken
  const checkStreakStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (challenges.lastCompletedDate) {
      const lastCompleted = new Date(challenges.lastCompletedDate);
      const currentDate = new Date(today);
      const diffDays = Math.floor((currentDate - lastCompleted) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        setChallenges(prev => ({
          ...prev,
          streakBroken: true
        }));
        addNotification("❌ Oh no! Your streak has been broken!");
      }
    }
  };

  // Function to check if user already completed today's challenge
  const hasCompletedToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return challenges.completedDates.includes(today);
  };

  // Function to add notifications
  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
  };

  // Function to handle task completion
  const handleTaskCompletion = (taskId) => {
    if (challenges.streakBroken) {
      addNotification("⚠️ You need to restore your streak first!");
      return;
    }

    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    addNotification("✅ Task completed!");
  };

  // Function to handle streak completion
  const handleStreakCompletion = (index) => {
    if (challenges.streakBroken) {
      addNotification("⚠️ You need to restore your streak first!");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    // Check if already completed today
    if (hasCompletedToday()) {
      addNotification("⚠️ You've already completed today's challenge!");
      return;
    }

    // Can only check the next unchecked box
    const nextUncheckedIndex = challenges.completedDays.findIndex(day => !day);
    if (index !== nextUncheckedIndex) {
      addNotification("⚠️ Please complete days in order!");
      return;
    }

    setChallenges(prev => {
      const updatedCompletedDays = [...prev.completedDays];
      const updatedCompletedDates = [...prev.completedDates];
      updatedCompletedDays[index] = true;
      updatedCompletedDates[index] = today;

      const newProgress = updatedCompletedDays.filter(Boolean).length;

      return {
        ...prev,
        completedDays: updatedCompletedDays,
        completedDates: updatedCompletedDates,
        currentProgress: newProgress,
        lastCompletedDate: today
      };
    });

    addNotification("🎉 Great job! You've completed today's challenge!");
  };

  // Function to restore streak
  const restoreStreak = () => {
    if (!user.streakRestoreAvailable) {
      addNotification("❌ You've already used your streak restore!");
      return;
    }

    setChallenges(prev => ({
      ...prev,
      streakBroken: false
    }));

    setUser(prev => ({
      ...prev,
      streakRestoreAvailable: false
    }));

    addNotification("🔄 Your streak has been restored!");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header Section */}
        <header className="flex justify-between items-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-purple-500"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-400">Keep up the great work!</p>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
          </div>
        </header>

        <main className="grid lg:grid-cols-2 gap-6">
          {/* Current Challenge Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Current Challenge</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{challenges.totalDays}-day Challenge</span>
                <span className="text-purple-400 font-semibold">
                  {challenges.currentProgress}/{challenges.totalDays}
                </span>
              </div>
              <Progress 
                value={(challenges.currentProgress / challenges.totalDays) * 100} 
                className="h-3 bg-gray-700"
              />
              {challenges.streakBroken && user.streakRestoreAvailable && (
                <Button
                  onClick={() => setShowModal(true)}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Restore Streak (One-time use)
                </Button>
              )}
            </div>
          </Card>

          {/* Daily Tasks Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Today's Tasks</h2>
            </div>
            <div className="space-y-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
                    checked={task.completed}
                    onChange={() => handleTaskCompletion(task.id)}
                    disabled={challenges.streakBroken}
                  />
                  <div className="flex-1">
                    <span className={`block ${task.completed ? 'line-through text-gray-400' : ''}`}>
                      {task.name}
                    </span>
                    <span className="text-sm text-gray-400">{task.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>

        {/* Streaks Overview */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">Streaks Overview</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {challenges.completedDays.map((completed, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg flex items-center justify-center relative
                  ${completed 
                    ? 'bg-purple-500/20 border-2 border-purple-500' 
                    : 'bg-gray-700/30 border-2 border-transparent hover:border-gray-600'
                  } 
                  ${!completed && index === challenges.completedDays.findIndex(day => !day) && !hasCompletedToday()
                    ? 'cursor-pointer hover:bg-gray-700/50'
                    : 'cursor-not-allowed'
                  }
                  transition-all duration-200`}
                onClick={() => handleStreakCompletion(index)}
              >
                {completed && (
                  <CheckCircle className="w-6 h-6 text-purple-400" />
                )}
                <span className="absolute -top-2 -right-2 text-xs bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications Panel */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
              >
                <span>{notification.message}</span>
                <span className="text-sm text-gray-400">
                  {notification.timestamp.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Restore Streak Dialog */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Restore Streak</DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to restore your streak? This can only be done once!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowModal(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={restoreStreak} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Restore
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

