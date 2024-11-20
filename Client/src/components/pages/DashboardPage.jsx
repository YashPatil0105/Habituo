// import React, { useState, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
// import { Bell, Calendar, CheckCircle, Trophy, Target, Award } from 'lucide-react';
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
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '../../features/authSlice';

// export const DashboardPage = () => {
//   // User state
//   // const [user, setUser] = useState({
//   //   name: "John Doe",
//   //   streakRestoreAvailable: true,
//   //   avatar: "/api/placeholder/150/150" // Placeholder avatar
//   // });
//   const user = useSelector(selectCurrentUser);

//   // Challenge state with date tracking
//   const [challenges, setChallenges] = useState({
//     totalDays: 21,
//     completedDays: new Array(21).fill(false),
//     completedDates: new Array(21).fill(null),
//     currentProgress: 0,
//     streakBroken: false,
//     lastCompletedDate: null
//   });

//   // Tasks state with categories
//   const [tasks, setTasks] = useState([
//     { id: 1, name: "Complete daily exercise", category: "Health", completed: false },
//     { id: 2, name: "Read for 30 minutes", category: "Learning", completed: false },
//     { id: 3, name: "Practice meditation", category: "Mindfulness", completed: false },
//     { id: 4, name: "Write in journal", category: "Personal", completed: false }
//   ]);

//   // Notifications state
//   const [notifications, setNotifications] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // Check streak status on component mount and date change
//   useEffect(() => {
//     checkStreakStatus();
//   }, []);

//   // Function to check if streak is broken
//   const checkStreakStatus = () => {
//     const today = new Date().toISOString().split('T')[0];
    
//     if (challenges.lastCompletedDate) {
//       const lastCompleted = new Date(challenges.lastCompletedDate);
//       const currentDate = new Date(today);
//       const diffDays = Math.floor((currentDate - lastCompleted) / (1000 * 60 * 60 * 24));
      
//       if (diffDays > 1) {
//         setChallenges(prev => ({
//           ...prev,
//           streakBroken: true
//         }));
//         addNotification("❌ Oh no! Your streak has been broken!");
//       }
//     }
//   };

//   // Function to check if user already completed today's challenge
//   const hasCompletedToday = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return challenges.completedDates.includes(today);
//   };

//   // Function to add notifications
//   const addNotification = (message) => {
//     const newNotification = {
//       id: Date.now(),
//       message,
//       timestamp: new Date()
//     };
    
//     setNotifications(prev => [newNotification, ...prev].slice(0, 5));
//   };

//   // Function to handle task completion
//   const handleTaskCompletion = (taskId) => {
//     if (challenges.streakBroken) {
//       addNotification("⚠️ You need to restore your streak first!");
//       return;
//     }

//     setTasks(prev => 
//       prev.map(task => 
//         task.id === taskId 
//           ? { ...task, completed: !task.completed }
//           : task
//       )
//     );

//     addNotification("✅ Task completed!");
//   };

//   // Function to handle streak completion
//   const handleStreakCompletion = (index) => {
//     if (challenges.streakBroken) {
//       addNotification("⚠️ You need to restore your streak first!");
//       return;
//     }

//     const today = new Date().toISOString().split('T')[0];
    
//     // Check if already completed today
//     if (hasCompletedToday()) {
//       addNotification("⚠️ You've already completed today's challenge!");
//       return;
//     }

//     // Can only check the next unchecked box
//     const nextUncheckedIndex = challenges.completedDays.findIndex(day => !day);
//     if (index !== nextUncheckedIndex) {
//       addNotification("⚠️ Please complete days in order!");
//       return;
//     }

//     setChallenges(prev => {
//       const updatedCompletedDays = [...prev.completedDays];
//       const updatedCompletedDates = [...prev.completedDates];
//       updatedCompletedDays[index] = true;
//       updatedCompletedDates[index] = today;

//       const newProgress = updatedCompletedDays.filter(Boolean).length;

//       return {
//         ...prev,
//         completedDays: updatedCompletedDays,
//         completedDates: updatedCompletedDates,
//         currentProgress: newProgress,
//         lastCompletedDate: today
//       };
//     });

//     addNotification("🎉 Great job! You've completed today's challenge!");
//   };

//   // Function to restore streak
//   const restoreStreak = () => {
//     if (!user.streakRestoreAvailable) {
//       addNotification("❌ You've already used your streak restore!");
//       return;
//     }

//     setChallenges(prev => ({
//       ...prev,
//       streakBroken: false
//     }));

//     setUser(prev => ({
//       ...prev,
//       streakRestoreAvailable: false
//     }));

//     addNotification("🔄 Your streak has been restored!");
//     setShowModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
//       <div className="container mx-auto p-6 space-y-6">
//         {/* Header Section */}
//         <header className="flex justify-between items-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
//           <div className="flex items-center gap-4">
//             <img
//               src={user.avatar}
//               alt={user.name}
//               className="w-12 h-12 rounded-full border-2 border-purple-500"
//             />
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Welcome back, {user.toUpperCase()}!
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
//           {/* Current Challenge Section */}
//           <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <Trophy className="w-6 h-6 text-purple-400" />
//               <h2 className="text-xl font-semibold">Current Challenge</h2>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-300">{challenges.totalDays}-day Challenge</span>
//                 <span className="text-purple-400 font-semibold">
//                   {challenges.currentProgress}/{challenges.totalDays}
//                 </span>
//               </div>
//               <Progress 
//                 value={(challenges.currentProgress / challenges.totalDays) * 100} 
//                 className="h-3 bg-gray-700"
//               />
//               {challenges.streakBroken && user.streakRestoreAvailable && (
//                 <Button
//                   onClick={() => setShowModal(true)}
//                   className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
//                 >
//                   Restore Streak (One-time use)
//                 </Button>
//               )}
//             </div>
//           </Card>

//           {/* Daily Tasks Section */}
//           <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <Target className="w-6 h-6 text-purple-400" />
//               <h2 className="text-xl font-semibold">Today's Tasks</h2>
//             </div>
//             <div className="space-y-4">
//               {tasks.map(task => (
//                 <div
//                   key={task.id}
//                   className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
//                 >
//                   <input
//                     type="checkbox"
//                     className="w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
//                     checked={task.completed}
//                     onChange={() => handleTaskCompletion(task.id)}
//                     disabled={challenges.streakBroken}
//                   />
//                   <div className="flex-1">
//                     <span className={`block ${task.completed ? 'line-through text-gray-400' : ''}`}>
//                       {task.name}
//                     </span>
//                     <span className="text-sm text-gray-400">{task.category}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </main>

        // {/* Streaks Overview */}
        // <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
        //   <div className="flex items-center gap-3 mb-6">
        //     <Award className="w-6 h-6 text-purple-400" />
        //     <h2 className="text-xl font-semibold">Streaks Overview</h2>
        //   </div>
        //   <div className="grid grid-cols-7 gap-2">
        //     {challenges.completedDays.map((completed, index) => (
        //       <div
        //         key={index}
        //         className={`aspect-square rounded-lg flex items-center justify-center relative
        //           ${completed 
        //             ? 'bg-purple-500/20 border-2 border-purple-500' 
        //             : 'bg-gray-700/30 border-2 border-transparent hover:border-gray-600'
        //           } 
        //           ${!completed && index === challenges.completedDays.findIndex(day => !day) && !hasCompletedToday()
        //             ? 'cursor-pointer hover:bg-gray-700/50'
        //             : 'cursor-not-allowed'
        //           }
        //           transition-all duration-200`}
        //         onClick={() => handleStreakCompletion(index)}
        //       >
        //         {completed && (
        //           <CheckCircle className="w-6 h-6 text-purple-400" />
        //         )}
        //         <span className="absolute -top-2 -right-2 text-xs bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
        //           {index + 1}
        //         </span>
        //       </div>
        //     ))}
        //   </div>
        // </Card>

//         {/* Notifications Panel */}
//         <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <Bell className="w-6 h-6 text-purple-400" />
//             <h2 className="text-xl font-semibold">Notifications</h2>
//           </div>
//           <div className="space-y-3">
//             {notifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
//               >
//                 <span>{notification.message}</span>
//                 <span className="text-sm text-gray-400">
//                   {notification.timestamp.toLocaleString()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </Card>

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

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Bell, Calendar, CheckCircle, Trophy, Target, Award ,AlertTriangle} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../features/authSlice.js';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust based on your API setup

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  // State management
  const [dashboardData, setDashboardData] = useState({
    tasks: [],
    notifications: [],
    streaks: {
      totalDays: 21,
      completedDays: new Array(21).fill(false),
      completedDates: new Array(21).fill(null),
      currentProgress: 0,
      streakBroken: false,
      lastCompletedDate: null
    }
  });
  
  const [showModal, setShowModal] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/dashboard`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setDashboardData({
        tasks: response.data.tasks,
        notifications: response.data.notifications,
        streaks: {
          ...dashboardData.streaks,
          currentProgress: response.data.user.streaks?.length || 0,
          streakBroken: !response.data.user.streakActive,
          lastCompletedDate: response.data.user.lastStreakDate,
          habitId: response.data.user.habitId // Adding habitId here
        }
      });
    } catch (err) {
      setError('Failed to fetch dashboard data');
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Add this function to check if a day can be completed
  const hasCompletedToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return dashboardData.streaks.lastCompletedDate === today;
  };

  // Update the streak completion handler to work with daily tracking
  const handleDailyStreakCompletion = async (index) => {
    // Don't proceed if streak is broken
    if (dashboardData.streaks.streakBroken) {
      toast.error("You need to restore your streak first!");
      return;
    }

    // Check if already completed today
    if (hasCompletedToday()) {
      toast.error("You've already completed today's challenge!");
      return;
    }

    // Can only check the next unchecked box
    const nextUncheckedIndex = dashboardData.streaks.completedDays.findIndex(day => !day);
    if (index !== nextUncheckedIndex) {
      toast.error("Please complete days in order!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/dashboard/streak/complete`,
        { 
          habitId: dashboardData.streaks.habitId, // Assuming you have habitId in your data
          dayIndex: index 
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Update local state to reflect the completion
      setDashboardData(prev => {
        const updatedCompletedDays = [...prev.streaks.completedDays];
        const updatedCompletedDates = [...prev.streaks.completedDates];
        updatedCompletedDays[index] = true;
        updatedCompletedDates[index] = new Date().toISOString().split('T')[0];

        return {
          ...prev,
          streaks: {
            ...prev.streaks,
            completedDays: updatedCompletedDays,
            completedDates: updatedCompletedDates,
            currentProgress: updatedCompletedDays.filter(Boolean).length,
            lastCompletedDate: new Date().toISOString()
          }
        };
      });
      
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error completing daily streak');
    }
  };

  // Handle task completion
  const handleTaskCompletion = async (taskId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/dashboard/task/complete`,
        { taskId },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Update local state with the response
      setDashboardData(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => 
          task._id === taskId ? response.data.task : task
        )
      }));
      
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error completing task');
    }
  };
console.log(dashboardData)
  // Handle streak completion
  const handleStreakCompletion = async (habitId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/dashboard/streak/complete`,
        { habitId },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Update local state
      setDashboardData(prev => ({
        ...prev,
        streaks: {
          ...prev.streaks,
          currentProgress: prev.streaks.currentProgress + 1,
          lastCompletedDate: new Date().toISOString()
        }
      }));
      
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error completing streak');
    }
  };

  // Restore streak
  // const restoreStreak = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/dashboard/streak/restore`,
  //       {},
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       }
  //     );
      
  //     setDashboardData(prev => ({
  //       ...prev,
  //       streaks: {
  //         ...prev.streaks,
  //         streakBroken: false,
  //         lastCompletedDate: new Date().toISOString()
  //       }
  //     }));
      
  //     toast.success('Streak restored successfully! Keep up the momentum!');
  //     setShowModal(false);
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || 'Error restoring streak');
  //   }
  // };
  const restoreStreak = async () => {
    try {
      // Ensure we have the habitId in the dashboardData
      if (!dashboardData.streaks.habitId) {
        throw new Error('Habit ID not found');
      }

      const response = await axios.post(
        `${API_BASE_URL}/dashboard/streak/restore`,
        {
          habitId: dashboardData.streaks.habitId
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setDashboardData(prev => ({
        ...prev,
        streaks: {
          ...prev.streaks,
          streakBroken: false,
          lastCompletedDate: new Date().toISOString()
        }
      }));
      
      toast.success('🎯Streak restored successfully! Keep up the momentum!');
      setShowModal(false);
    } catch (err) {
      console.error('Restore streak error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Error restoring streak';
      toast.error(errorMessage);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">{error}</h2>
          <Button 
            onClick={fetchDashboardData}
            className="mt-4 bg-purple-500 hover:bg-purple-600"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto p-6 space-y-6">
         {/* Header Section */}
         <header className="flex justify-between items-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || "/api/placeholder/150/150"}
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-purple-500"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome back, {user}!
              </h1>
              <p className="text-gray-400">Keep up the great work!</p>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            {dashboardData.notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs">
                {dashboardData.notifications.length}
              </span>
            )}
          </div>
        </header>

        {/* Streak Status Alert - New Section */}
        {dashboardData.streaks.streakBroken && (
          <Alert className="bg-yellow-500/20 border-yellow-500 text-yellow-200">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Your streak has been broken! Don't worry - you can restore it and keep going.</span>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 p-2 text-black ml-4"
              >
                Restore Streak
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <main className="grid lg:grid-cols-2 gap-6">
          {/* Current Challenge Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Current Challenge</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">
                  {dashboardData.streaks.totalDays}-day Challenge
                </span>
                <span className="text-purple-400 font-semibold">
                  {dashboardData.streaks.currentProgress}/{dashboardData.streaks.totalDays}
                </span>
              </div>
              <Progress 
                value={(dashboardData.streaks.currentProgress / dashboardData.streaks.totalDays) * 100} 
                className="h-3 bg-gray-700"
              />
              {/* Streak Status */}
              <div className={`p-3 rounded-lg ${
                dashboardData.streaks.streakBroken 
                  ? 'bg-red-500/20 border border-red-500' 
                  : 'bg-green-500/20 border border-green-500'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle className={`w-5 h-5 ${
                    dashboardData.streaks.streakBroken ? 'text-red-400' : 'text-green-400'
                  }`} />
                  <span>
                    {dashboardData.streaks.streakBroken 
                      ? 'Streak broken - Restore to continue!' 
                      : 'Streak active - Keep going!'}
                  </span>
                </div>
              </div>
              {/* Restore Button - Now always visible if streak is broken */}
              {dashboardData.streaks.streakBroken && (
                <Button
                  onClick={() => setShowModal(true)}
                  className="w-full mt-4 p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Restore Streak
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
              {dashboardData.tasks.map(task => (
                <div
                  key={task._id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
                    checked={task.completed}
                    onChange={() => handleTaskCompletion(task._id)}
                    disabled={dashboardData.streaks.streakBroken}
                  />
                  <div className="flex-1">
                    <span className={`block ${task.completed ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </span>
                    <span className="text-sm text-gray-400">{task.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
              {/* Add the Streaks Overview section after the main grid */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">Streaks Overview</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {dashboardData.streaks.completedDays.map((completed, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg flex items-center justify-center relative
                  ${completed 
                    ? 'bg-purple-500/20 border-2 border-purple-500' 
                    : 'bg-gray-700/30 border-2 border-transparent hover:border-gray-600'
                  } 
                  ${!completed && index === dashboardData.streaks.completedDays.findIndex(day => !day) && !hasCompletedToday()
                    ? 'cursor-pointer hover:bg-gray-700/50'
                    : 'cursor-not-allowed'
                  }
                  transition-all duration-200`}
                onClick={() => handleDailyStreakCompletion(index)}
                title={completed 
                  ? `Completed on ${new Date(dashboardData.streaks.completedDates[index]).toLocaleDateString()}`
                  : index === dashboardData.streaks.completedDays.findIndex(day => !day) && !hasCompletedToday()
                    ? "Click to complete today's challenge"
                    : "Not available yet"
                }
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
          
          {/* Optional: Add a legend or helper text */}
          <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <span>Complete one challenge per day to maintain your streak!</span>
          </div>
        </Card>
        {/* Notifications Panel */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-3">
            {dashboardData.notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
              >
                <span>{notification.message}</span>
                <span className="text-sm text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Restore Streak Dialog */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-purple-400">
                Restore Your Streak
              </DialogTitle>
              <DialogDescription className="text-gray-300 space-y-4">
                <p>
                  Everyone misses a day sometimes! Restoring your streak will:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reset your streak status to active</li>
                  <li>Allow you to continue your progress</li>
                  <li>Keep your current progress intact</li>
                </ul>
                <Alert className="bg-yellow-500/20 border-yellow-500 mt-4">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-200">
                    Remember: This is a one-time opportunity to restore your streak!
                  </AlertDescription>
                </Alert>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowModal(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={restoreStreak} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-2"
              >
                Restore My Streak
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};