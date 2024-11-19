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
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/authSlice';

export const DashboardPage = () => {
  // User state
  // const [user, setUser] = useState({
  //   name: "John Doe",
  //   streakRestoreAvailable: true,
  //   avatar: "/api/placeholder/150/150" // Placeholder avatar
  // });
  const user = useSelector(selectCurrentUser);

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
                Welcome back, {user.toUpperCase()}!
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


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card } from "@/components/ui/card";
// import { Bell, Calendar, CheckCircle, Trophy, Target, Award } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { useSelector } from "react-redux";
// import { selectCurrentUser, selectCurrentToken } from "../../features/authSlice.js";

// export const DashboardPage = () => {
//   const user = useSelector(selectCurrentUser);
//   const token = useSelector(selectCurrentToken);

//   const [dashboardData, setDashboardData] = useState({
//     challenges: {
//       totalDays: 21,
//       completedDays: [],
//       completedDates: [],
//       currentProgress: 0,
//       streakBroken: false,
//       lastCompletedDate: null,
//     },
//     tasks: [],
//   });
//   const [notifications, setNotifications] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchDashboardData();
//     fetchNotifications();
//   }, []);

//   const api = axios.create({
//     baseURL: "/api",
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const fetchDashboardData = async () => {
//     try {
//       const { data } = await api.get("/dashboard");
//       setDashboardData(data);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error.response?.data?.message || error.message);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const { data } = await api.get("/notifications");
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error.response?.data?.message || error.message);
//     }
//   };

//   const handleTaskCompletion = async (taskId) => {
//     try {
//       const { data } = await api.post("/dashboard/task/complete", { taskId });
//       setDashboardData((prev) => ({
//         ...prev,
//         tasks: data.tasks,
//         challenges: data.challenges,
//       }));
//       addNotification("✅ Task completed!");
//     } catch (error) {
//       console.error("Error completing task:", error.response?.data?.message || error.message);
//     }
//   };

//   const handleStreakCompletion = async (index) => {
//     try {
//       const { data } = await api.post("/dashboard/streak/complete", { index });
//       setDashboardData((prev) => ({ ...prev, challenges: data }));
//       addNotification("🎉 Great job! You've completed today's challenge!");
//     } catch (error) {
//       console.error("Error completing streak:", error.response?.data?.message || error.message);
//     }
//   };

//   const restoreStreak = async () => {
//     try {
//       const { data } = await api.post("/dashboard/streak/restore");
//       setDashboardData((prev) => ({ ...prev, challenges: data }));
//       addNotification("🔄 Your streak has been restored!");
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error restoring streak:", error.response?.data?.message || error.message);
//     }
//   };

//   const addNotification = (message) => {
//     const newNotification = {
//       id: Date.now(),
//       message,
//       timestamp: new Date(),
//     };
//     setNotifications((prev) => [newNotification, ...prev].slice(0, 5));
//   };

//   const toggleNotificationRead = async (id) => {
//     try {
//       const { data } = await api.put(`/notifications/${id}/toggle`);
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, read: data.read } : n))
//       );
//     } catch (error) {
//       console.error("Error toggling notification:", error.response?.data?.message || error.message);
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       await api.delete(`/notifications/${id}`);
//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//     } catch (error) {
//       console.error("Error deleting notification:", error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
//       <div className="container mx-auto p-6 space-y-6">
//         <header className="flex justify-between items-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
//           <div className="flex items-center gap-4">
//             <img
//               src={user.avatar}
//               alt={user.name}
//               className="w-12 h-12 rounded-full border-2 border-purple-500"
//             />
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Welcome back, {user.username}!
//               </h1>
//               <p className="text-gray-400">Keep up the great work!</p>
//             </div>
//           </div>
//           <div className="relative">
//             <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
//             {notifications.length > 0 && (
//               <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs">
//                 {notifications.length}
//               </span>
//             )}
//           </div>
//         </header>

//         <main className="grid lg:grid-cols-2 gap-6">
//           {/* Tasks */}
//           <section>
//             <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
//             {dashboardData.tasks.map((task) => (
//               <Card
//                 key={task.id}
//                 className="p-4 flex items-center justify-between bg-gray-800 text-white rounded-lg mb-4"
//               >
//                 <span>{task.title}</span>
//                 <Button
//                   variant="outline"
//                   onClick={() => handleTaskCompletion(task._id)}
//                   className="text-sm text-gray-300 border-gray-600"
//                 >
//                   {task.completed ? "Undo" : "Complete"}
//                 </Button>
//               </Card>
//             ))}
//           </section>

//           {/* Streak and Challenges */}
//           <section>
//             <h2 className="text-xl font-bold mb-4">Current Challenge</h2>
//             <Card className="p-4 bg-gray-800 text-white rounded-lg">
//               <div className="flex items-center justify-between mb-4">
//                 <span>Progress</span>
//                 <span>
//                   {dashboardData.challenges.currentProgress} / {dashboardData.challenges.totalDays}
//                 </span>
//               </div>
//               <Progress value={dashboardData.challenges.currentProgress} max={dashboardData.challenges.totalDays} />
//               <Button
//                 variant="outline"
//                 className="mt-4 text-sm text-gray-300 border-gray-600"
//                 onClick={() => handleStreakCompletion()}
//               >
//                 Mark Today Complete
//               </Button>
//             </Card>
//           </section>
//         </main>

//         {/* Restore Streak Dialog */}
//         <Dialog open={showModal} onOpenChange={setShowModal}>
//           <DialogContent className="bg-gray-800 text-white border-gray-700">
//             <DialogHeader>
//               <DialogTitle>Restore Streak</DialogTitle>
//               <DialogDescription className="text-gray-400">
//                 Are you sure you want to restore your streak? This can only be done once!
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setShowModal(false)}
//                 className="border-gray-600 text-gray-300 hover:bg-gray-700"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={restoreStreak}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//               >
//                 Restore
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };
