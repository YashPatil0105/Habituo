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
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap'; // For progress bars
import { Calendar, CheckCircle, Bell } from 'lucide-react'; // Icons
import Modal from 'react-bootstrap/Modal'; // Modal component from react-bootstrap

export const DashboardPage = () => {
  const [user, setUser] = useState({ name: 'John Doe' });
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Complete coding assignment', completed: false },
    { id: 2, name: 'Read 20 pages of a book', completed: false },
    { id: 3, name: 'Workout for 30 minutes', completed: false },
  ]);
  const [challenges, setChallenges] = useState({
    totalDays: 21,
    completedDays: new Array(21).fill(false), // Tracks completed days
    currentProgress: 0,
  });
  const [notifications, setNotifications] = useState([
    { message: "🔔 Don't break your streak!", timestamp: new Date() },
    { message: "🔔 Remember to log your progress today!", timestamp: new Date() },
    { message: "🔔 New challenges available!", timestamp: new Date() },
  ]);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Effect to initialize current progress
  useEffect(() => {
    // Load data from local storage
    const storedTasks = localStorage.getItem('tasks');
    const storedChallenges = localStorage.getItem('challenges');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedChallenges) setChallenges(JSON.parse(storedChallenges));
    
    // Check for missed days
    checkMissedDays();
    const completedCount = tasks.filter(task => task.completed).length;
    setChallenges(prevChallenges => ({
      ...prevChallenges,
      currentProgress: completedCount,
    }));
  }, []);

  // Effect to save tasks and challenges to local storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [tasks, challenges]);

  // Check if the user has missed a day and reset tasks
  const checkMissedDays = () => {
    const missed = tasks.filter(task => !task.completed).length;
    if (missed > 0) {
      setTasks(prevTasks => prevTasks.map(task => ({ ...task, completed: false })));
      alert("You've missed a day! All tasks have been reset.");

      // Add notification for streak reset
      setNotifications(prevNotifications => [
        { message: "🔔 Your streak has been reset due to missed tasks!", timestamp: new Date() },
        ...prevNotifications
      ]);
    }
  };

  // Handle task completion
  const handleTaskCompletion = (taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      // Check for missed days
      checkMissedDays();
      return updatedTasks;
    });
  };

  // Handle adding a new task
  const addTask = (taskName) => {
    if (!taskName) return; // Prevent adding empty tasks
    const newTask = { id: Date.now(), name: taskName, completed: false };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Handle streak day completion (allow only one checkbox to be checked)
  const handleStreakCompletion = (index) => {
    setChallenges(prevChallenges => {
      const updatedCompletedDays = [...prevChallenges.completedDays];
      updatedCompletedDays[index] = !updatedCompletedDays[index]; // Toggle completion status

      // Ensure only one checkbox can be checked
      for (let i = 0; i < updatedCompletedDays.length; i++) {
        if (i !== index) updatedCompletedDays[i] = false;
      }

      return {
        ...prevChallenges,
        completedDays: updatedCompletedDays,
      };
    });
  };

  // Restore streak functionality
  const restoreStreak = () => {
    setTasks(prevTasks =>
      prevTasks.map((task, index) => ({
        ...task,
        completed: challenges.completedDays[index] || false,
      }))
    );
    setShowModal(false); // Close the modal after restoration
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-5">
      <header className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
        <Bell className="text-2xl cursor-pointer" />
      </header>

      <main className="flex flex-col lg:flex-row gap-5">
        {/* Current Challenge Section */}
        <section className="flex-1 bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 className="text-xl font-semibold mb-4">Current Challenge</h2>
          <div className="flex items-center justify-between mb-4">
            <span>{challenges.totalDays}-day Challenge</span>
            <span>{challenges.currentProgress}/{challenges.totalDays}</span>
          </div>
          <ProgressBar
            now={(challenges.currentProgress / challenges.totalDays) * 100}
            variant="success"
            className="bg-gray-700"
          />
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
          >
            Restore Streak
          </button>
        </section>
      </main>

      {/* Daily Task List */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
        <ul className="flex flex-col gap-2">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={task.completed}
                onChange={() => handleTaskCompletion(task.id)} // Update task completion
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.name}
              </span>
            </li>
          ))}
        </ul>
        <button onClick={() => addTask(prompt("Enter new task:"))} className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Add Task
        </button>
      </section>

      {/* Streaks Overview */}
      <section className="flex-1 bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
        <h2 className="text-xl font-semibold mb-4">Streaks Overview</h2>
        <div className="grid grid-cols-7 gap-1">
          {challenges.completedDays.map((completed, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded ${
                completed ? 'bg-green-500 cursor-pointer' : 'bg-gray-700 cursor-pointer'
              }`}
              onClick={() => handleStreakCompletion(index)} // Handle streak checkbox click
            >
              <input
                type="checkbox"
                checked={completed}
                readOnly
                className="opacity-0 absolute cursor-pointer"
              />
              {completed && <CheckCircle className="text-white" />}
            </div>
          ))}
        </div>
      </section>

      {/* Notification Panel */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mt-5">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <ul className="flex flex-col gap-2">
          {notifications.map((notification, index) => (
            <li key={index}>
              {notification.message} <span className="text-gray-400 text-sm">{notification.timestamp.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Restore Streak Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Restore Streak</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to restore your streak?</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button variant="primary" onClick={restoreStreak}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
