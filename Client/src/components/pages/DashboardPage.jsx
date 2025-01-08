import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Bell,
  Calendar,
  CheckCircle,
  Trophy,
  Target,
  Award,
  AlertTriangle,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice.js";
import axios from "axios";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "http://localhost:8000";


export const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId,setUserId] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const [dashboardData, setDashboardData] = useState({
    tasks: [],
    notifications: [],
    streaks: {
      totalDays: 0,
      completedDays: [],
      completedDates: [],
      currentProgress: 0,
      streakBroken: false,
      lastCompletedDate: null,
      habitId: null,
    },
  });
  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Decode the token to get user information
        const decoded = jwtDecode(token);
        // Access the id from the UserInfo object in the token
        const userId = decoded.UserInfo.id;
        setUserId(userId);
  
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [dailyPlans, setDailyPlans] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboardResponse, plansResponse, challengesResponse] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/api/dashboard`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${API_BASE_URL}/plans?planType=daily`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${API_BASE_URL}/api/challenges`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

      const { tasks, notifications, user: userData } = dashboardResponse.data;
      const dailyPlans = plansResponse.data;
      const challenges = challengesResponse.data;
      //TODO : check
    //   const userChallenges = challenges.filter((challenge) =>
    //     challenge.participants.includes(userId)
    // );
    
    
    // console.log(challenges)
      setChallenges(challenges);
      setSelectedChallenge(challenges[0]);
      setDashboardData((prev) => ({
        tasks,
        notifications,
        streaks: {
          totalDays: challenges[0].duration,
          currentProgress: userData.streaks?.length || 0,
          completedDays:
            userData.streaks?.map((streak) => !!streak) ||
            new Array(challenges[0].duration).fill(false),
          completedDates:
            userData.streaks?.map((streak) => streak?.date) ||
            new Array(challenges[0].duration).fill(null),
          streakBroken: !userData.streakActive,
          lastCompletedDate: userData.lastStreakDate,
          habitId: userData.habitId,
        },
      }));

      setDailyPlans(dailyPlans);
    } catch (err) {
      setError("Failed to fetch dashboard data");
      toast.error("Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleChallengeChange = (challengeId) => {
    const newSelectedChallenge = challenges.find(
      (challenge) => challenge._id === challengeId
    );
    setSelectedChallenge(newSelectedChallenge);
    setDashboardData((prev) => ({
      ...prev,
      streaks: {
        ...prev.streaks,
        totalDays: newSelectedChallenge.duration,
        completedDays: new Array(newSelectedChallenge.duration).fill(false),
        completedDates: new Array(newSelectedChallenge.duration).fill(null),
      },
    }));
  };

  const hasCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return dashboardData.streaks.lastCompletedDate === today;
  };

  const handleDailyStreakCompletion = async (index) => {
    if (dashboardData.streaks.streakBroken) {
      toast.error("You need to restore your streak first!");
      return;
    }

    if (hasCompletedToday()) {
      toast.error("You've already completed today's challenge!");
      return;
    }

    const nextUncheckedIndex = dashboardData.streaks.completedDays.findIndex(
      (day) => !day
    );
    if (index !== nextUncheckedIndex) {
      toast.error("Please complete days in order!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/dashboard/streak/complete`,
        {
          habitId: dashboardData.streaks.habitId,
          dayIndex: index,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDashboardData((prev) => {
        const updatedCompletedDays = [...prev.streaks.completedDays];
        const updatedCompletedDates = [...prev.streaks.completedDates];
        updatedCompletedDays[index] = true;
        updatedCompletedDates[index] = new Date().toISOString().split("T")[0];

        return {
          ...prev,
          streaks: {
            ...prev.streaks,
            completedDays: updatedCompletedDays,
            completedDates: updatedCompletedDates,
            currentProgress: updatedCompletedDays.filter(Boolean).length,
            lastCompletedDate: new Date().toISOString(),
          },
        };
      });

      toast.success(response.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error completing daily streak"
      );
    }
  };

  const handleTaskCompletion = async (taskId, planId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/plans/${planId}/tasks/${taskId}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDailyPlans((prev) =>
        prev.map((plan) =>
          plan._id === planId
            ? {
                ...plan,
                tasks: plan.tasks.map((task) =>
                  task._id === taskId ? { ...task, completed: true } : task
                ),
              }
            : plan
        )
      );

      toast.success("Task completed successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error completing task");
    }
  };

  // const restoreStreak = async () => {
  //   try {
  //     if (!dashboardData.streaks.habitId) {
  //       throw new Error("Habit ID not found");
  //     }

  //     const response = await axios.post(
  //       `${API_BASE_URL}/api/dashboard/streak/restore`,
  //       {
  //         habitId: dashboardData.streaks.habitId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     setDashboardData((prev) => ({
  //       ...prev,
  //       streaks: {
  //         ...prev.streaks,
  //         streakBroken: false,
  //         lastCompletedDate: new Date().toISOString(),
  //       },
  //     }));

  //     toast.success("🎯 Streak restored successfully! Keep up the momentum!");
  //     setShowModal(false);
  //   } catch (err) {
  //     console.error("Restore streak error:", err);
  //     const errorMessage =
  //       err.response?.data?.message || err.message || "Error restoring streak";
  //     toast.error(errorMessage);
  //   }
  // };
  const restoreStreak = async () => {
    try {
      if (!selectedChallenge?._id) {
        throw new Error("No challenge selected");
      }

      console.log("Attempting to restore streak for challenge:", selectedChallenge._id);
      console.log("userId : ",userId)
      const response = await axios.post(
        `${API_BASE_URL}/api/challenges/restore`,
        {
          userId :userId,
          challengeId: selectedChallenge._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Streak restore response:", response.data);

      setDashboardData((prev) => ({
        ...prev,
        streaks: {
          ...prev.streaks,
          currentProgress: 0,
          completedDays: new Array(prev.streaks.totalDays).fill(false),
          completedDates: new Array(prev.streaks.totalDays).fill(null),
          streakBroken: false,
          lastCompletedDate: null,
        },
      }));

      setUser((prev) => ({    // look at this later
        ...prev,
        streakRestoreAvailable: false,
      }));

      toast.success("🔄 Your streak has been restored! Start fresh from today.");
      setShowModal(false);
      fetchDashboardData();
    } catch (err) {
      console.error("Restore streak error:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
      } else if (err.request) {
        console.error("Error request:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
      const errorMessage =
        err.response?.data?.message || err.message || "Error restoring streak";
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
              src={user.avatar || "/avatar.png"}
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

        {/* Streak Status Alert */}
        {dashboardData.streaks.streakBroken && (
          <Alert className="bg-yellow-500/20 border-yellow-500 text-yellow-200">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                Your streak has been broken! Don't worry - you can restore it
                and keep going.
              </span>
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
              {challenges.length > 0 && (
                <Select
                  onValueChange={(value) => handleChallengeChange(value)}
                  defaultValue={selectedChallenge?._id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    {challenges.map((challenge) => (
                      <SelectItem key={challenge._id} value={challenge._id}>
                        {challenge.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-300">
                  {selectedChallenge?.title} - {selectedChallenge?.duration}-day
                  Challenge
                </span>
                <span className="text-purple-400 font-semibold">
                  {dashboardData.streaks.currentProgress}/
                  {dashboardData.streaks.totalDays}
                </span>
              </div>
              <Progress
                value={
                  (dashboardData.streaks.currentProgress /
                    dashboardData.streaks.totalDays) *
                  100
                }
                className="h-3 bg-gray-700"
              />
              {/* Streak Status */}
              <div
                className={`p-3 rounded-lg ${
                  dashboardData.streaks.streakBroken
                    ? "bg-red-500/20 border border-red-500"
                    : "bg-green-500/20 border border-green-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-5 h-5 ${
                      dashboardData.streaks.streakBroken
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  />
                  <span>
                    {dashboardData.streaks.streakBroken
                      ? "Streak broken - Restore to continue!"
                      : "Streak active - Keep going!"}
                  </span>
                </div>
              </div>
              {/* Restore Button */}
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
              {dailyPlans.map((plan) =>
                plan.tasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
                      checked={task.completed}
                      onChange={() => handleTaskCompletion(task._id, plan._id)}
                      disabled={dashboardData.streaks.streakBroken}
                    />
                    <div className="flex-1">
                      <span
                        className={`block ${
                          task.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {task.description}
                      </span>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full`}
                      style={{ backgroundColor: task.color }}
                    ></div>
                  </div>
                ))
              )}
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
            {Array.from({ length: selectedChallenge?.duration || 0 }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center relative
                  ${
                    dashboardData.streaks.completedDays[index]
                      ? "bg-purple-500/20 border-2 border-purple-500"
                      : "bg-gray-700/30 border-2 border-transparent hover:border-gray-600"
                  } 
                  ${
                    !dashboardData.streaks.completedDays[index] &&
                    index ===
                      dashboardData.streaks.completedDays.findIndex(
                        (day) => !day
                      ) &&
                    !hasCompletedToday()
                      ? "cursor-pointer hover:bg-gray-700/50"
                      : "cursor-not-allowed"
                  }
                  transition-all duration-200`}
                  onClick={() => handleDailyStreakCompletion(index)}
                  title={
                    dashboardData.streaks.completedDays[index]
                      ? `Completed on ${new Date(
                          dashboardData.streaks.completedDates[index]
                        ).toLocaleDateString()}`
                      : index ===
                          dashboardData.streaks.completedDays.findIndex(
                            (day) => !day
                          ) && !hasCompletedToday()
                      ? "Click to complete today's challenge"
                      : "Not available yet"
                  }
                >
                  {dashboardData.streaks.completedDays[index] && (
                    <CheckCircle className="w-6 h-6 text-purple-400" />
                  )}
                  <span className="absolute -top-2 -right-2 text-xs bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
              )
            )}
          </div>

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
                    Remember: This is a one-time opportunity to restore your
                    streak!
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

// // export default DashboardPage;
// import React, { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Bell, Calendar, CheckCircle, Trophy, Target, Award, AlertTriangle } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Progress } from "@/components/ui/progress";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useSelector, useDispatch } from "react-redux";
// import { selectCurrentUser } from "../../features/authSlice.js";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";

// const API_BASE_URL = "http://localhost:8000";

// export const DashboardPage = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectCurrentUser);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState('');
//   const [challenges, setChallenges] = useState([]);
//   const [selectedChallenge, setSelectedChallenge] = useState(null);
//   const [dailyPlans, setDailyPlans] = useState([]);

//   const [dashboardData, setDashboardData] = useState({
//     tasks: [],
//     notifications: [],
//     streaks: {
//       totalDays: 0,
//       completedDays: [],
//       completedDates: [],
//       currentProgress: 0,
//       streakBroken: false,
//       lastCompletedDate: null,
//       habitId: null,
//     },
//   });

//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
    
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const userId = decoded.UserInfo.id;
//         setUserId(userId);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const [dashboardResponse, plansResponse, challengesResponse] =
//         await Promise.all([
//           axios.get(`${API_BASE_URL}/api/dashboard`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }),
//           axios.get(`${API_BASE_URL}/plans?planType=daily`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }),
//           axios.get(`${API_BASE_URL}/api/challenges`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//               "Content-Type": "application/json",
//             },
//           }),
//         ]);

//       const { tasks, notifications, user: userData } = dashboardResponse.data;
//       const dailyPlans = plansResponse.data;
//       const challenges = challengesResponse.data;
      
//       setChallenges(challenges);
//       setSelectedChallenge(challenges[0]);
//       setDashboardData((prev) => ({
//         tasks,
//         notifications,
//         streaks: {
//           totalDays: challenges[0].duration,
//           currentProgress: userData.streaks?.length || 0,
//           completedDays:
//             userData.streaks?.map((streak) => !!streak) ||
//             new Array(challenges[0].duration).fill(false),
//           completedDates:
//             userData.streaks?.map((streak) => streak?.date) ||
//             new Array(challenges[0].duration).fill(null),
//           streakBroken: !userData.streakActive,
//           lastCompletedDate: userData.lastStreakDate,
//           habitId: userData.habitId,
//         },
//       }));

//       setDailyPlans(dailyPlans);
//     } catch (err) {
//       setError("Failed to fetch dashboard data");
//       toast.error("Error loading dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const handleChallengeChange = (challengeId) => {
//     const newSelectedChallenge = challenges.find(
//       (challenge) => challenge._id === challengeId
//     );
//     setSelectedChallenge(newSelectedChallenge);
//     setDashboardData((prev) => ({
//       ...prev,
//       streaks: {
//         ...prev.streaks,
//         totalDays: newSelectedChallenge.duration,
//         completedDays: new Array(newSelectedChallenge.duration).fill(false),
//         completedDates: new Array(newSelectedChallenge.duration).fill(null),
//       },
//     }));
//   };

//   const hasCompletedToday = () => {
//     const today = new Date().toISOString().split("T")[0];
//     return dashboardData.streaks.lastCompletedDate === today;
//   };

//   const handleDailyStreakCompletion = async (index) => {
//     if (dashboardData.streaks.streakBroken) {
//       toast.error("You need to restore your streak first!");
//       return;
//     }

//     if (hasCompletedToday()) {
//       toast.error("You've already completed today's challenge!");
//       return;
//     }

//     const nextUncheckedIndex = dashboardData.streaks.completedDays.findIndex(
//       (day) => !day
//     );
//     if (index !== nextUncheckedIndex) {
//       toast.error("Please complete days in order!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/dashboard/streak/complete`,
//         {
//           challengeId: selectedChallenge._id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setDashboardData((prev) => {
//         const updatedCompletedDays = [...prev.streaks.completedDays];
//         const updatedCompletedDates = [...prev.streaks.completedDates];
//         updatedCompletedDays[index] = true;
//         updatedCompletedDates[index] = new Date().toISOString().split("T")[0];

//         return {
//           ...prev,
//           streaks: {
//             ...prev.streaks,
//             completedDays: updatedCompletedDays,
//             completedDates: updatedCompletedDates,
//             currentProgress: updatedCompletedDays.filter(Boolean).length,
//             lastCompletedDate: new Date().toISOString(),
//           },
//         };
//       });

//       toast.success(response.data.message);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Error completing daily streak"
//       );
//     }
//   };

//   const handleTaskCompletion = async (taskId, planId) => {
//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/plans/${planId}/tasks/${taskId}`,
//         { completed: true },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setDailyPlans((prev) =>
//         prev.map((plan) =>
//           plan._id === planId
//             ? {
//                 ...plan,
//                 tasks: plan.tasks.map((task) =>
//                   task._id === taskId ? { ...task, completed: true } : task
//                 ),
//               }
//             : plan
//         )
//       );

//       toast.success("Task completed successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error completing task");
//     }
//   };

//   const restoreStreak = async () => {
//     try {
//       if (!selectedChallenge?._id) {
//         throw new Error("No challenge selected");
//       }

//       console.log("Attempting to restore streak for challenge:", selectedChallenge._id);
//       console.log("userId : ", userId);
//       const response = await axios.post(
//         `${API_BASE_URL}/api/challenges/restore`,
//         {
//           userId: userId,
//           challengeId: selectedChallenge._id
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Streak restore response:", response.data);

//       setDashboardData((prev) => ({
//         ...prev,
//         streaks: {
//           ...prev.streaks,
//           streakBroken: false,
//           lastCompletedDate: new Date().toISOString(),
//         },
//       }));

//       toast.success("🔄 Your streak has been restored! Start fresh from today.");
//       setShowModal(false);
//       fetchDashboardData();
//     } catch (err) {
//       console.error("Restore streak error:", err);
//       if (err.response) {
//         console.error("Error response:", err.response.data);
//         console.error("Error status:", err.response.status);
//         console.error("Error headers:", err.response.headers);
//       } else if (err.request) {
//         console.error("Error request:", err.request);
//       } else {
//         console.error("Error message:", err.message);
//       }
//       const errorMessage =
//         err.response?.data?.message || err.message || "Error restoring streak";
//       toast.error(errorMessage);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-500">{error}</h2>
//           <Button
//             onClick={fetchDashboardData}
//             className="mt-4 bg-purple-500 hover:bg-purple-600"
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
//       <div className="container mx-auto p-6 space-y-6">
//         {/* Header Section */}
//         <header className="flex justify-between items-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
//           <div className="flex items-center gap-4">
//             <img
//               src={user.avatar || "/avatar.png"}
//               alt={user.name}
//               className="w-12 h-12 rounded-full border-2 border-purple-500"
//             />
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Welcome back, {user.name}!
//               </h1>
//               <p className="text-gray-400">Keep up the great work!</p>
//             </div>
//           </div>
//           <div className="relative">
//             <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
//             {dashboardData.notifications.length > 0 && (
//               <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs">
//                 {dashboardData.notifications.length}
//               </span>
//             )}
//           </div>
//         </header>

//         {/* Streak Status Alert */}
//         {dashboardData.streaks.streakBroken && (
//           <Alert className="bg-yellow-500/20 border-yellow-500 text-yellow-200">
//             <AlertTriangle className="w-4 h-4" />
//             <AlertDescription className="flex items-center justify-between">
//               <span>
//                 Your streak has been broken! Don't worry - you can restore it
//                 and keep going.
//               </span>
//               <Button
//                 onClick={() => setShowModal(true)}
//                 className="bg-yellow-500 hover:bg-yellow-600 p-2 text-black ml-4"
//               >
//                 Restore Streak
//               </Button>
//             </AlertDescription>
//           </Alert>
//         )}

//         <main className="grid lg:grid-cols-2 gap-6">
//           {/* Current Challenge Section */}
//           <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <Trophy className="w-6 h-6 text-purple-400" />
//               <h2 className="text-xl font-semibold">Current Challenge</h2>
//             </div>
//             <div className="space-y-4">
//               {challenges.length > 0 && (
//                 <Select
//                   onValueChange={(value) => handleChallengeChange(value)}
//                   defaultValue={selectedChallenge?._id}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select a challenge" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {challenges.map((challenge) => (
//                       <SelectItem key={challenge._id} value={challenge._id}>
//                         {challenge.title}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-300">
//                   {selectedChallenge?.title} - {selectedChallenge?.duration}-day
//                   Challenge
//                 </span>
//                 <span className="text-purple-400 font-semibold">
//                   {dashboardData.streaks.currentProgress}/
//                   {dashboardData.streaks.totalDays}
//                 </span>
//               </div>
//               <Progress
//                 value={
//                   (dashboardData.streaks.currentProgress /
//                     dashboardData.streaks.totalDays) *
//                   100
//                 }
//                 className="h-3 bg-gray-700"
//               />
//               {/* Streak Status */}
//               <div
//                 className={`p-3 rounded-lg ${
//                   dashboardData.streaks.streakBroken
//                     ? "bg-red-500/20 border border-red-500"
//                     : "bg-green-500/20 border border-green-500"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <CheckCircle
//                     className={`w-5 h-5 ${
//                       dashboardData.streaks.streakBroken
//                         ? "text-red-400"
//                         : "text-green-400"
//                     }`}
//                   />
//                   <span>
//                     {dashboardData.streaks.streakBroken
//                       ? "Streak broken - Restore to continue!"
//                       : "Streak active - Keep going!"}
//                   </span>
//                 </div>
//               </div>
//               {/* Restore Button */}
//               {dashboardData.streaks.streakBroken && (
//                 <Button
//                   onClick={() => setShowModal(true)}
//                   className="w-full mt-4 p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
//                 >
//                   Restore Streak
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
//               {dailyPlans.map((plan) =>
//                 plan.tasks.map((task) => (
//                   <div
//                     key={task._id}
//                     className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
//                   >
//                     <input
//                       type="checkbox"
//                       className="w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
//                       checked={task.completed}
//                       onChange={() => handleTaskCompletion(task._id, plan._id)}
//                       disabled={dashboardData.streaks.streakBroken}
//                     />
//                     <div className="flex-1">
//                       <span
//                         className={`block ${
//                           task.completed ? "line-through text-gray-400" : ""
//                         }`}
//                       >
//                         {task.name}
//                       </span>
//                       <span className="text-sm text-gray-400">
//                         {task.description}
//                       </span>
//                     </div>
//                     <div
//                       className={`w-3 h-3 rounded-full`}
//                       style={{ backgroundColor: task.color }}
//                     ></div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </Card>
//         </main>

//         {/* Streaks Overview */}
//         <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <Award className="w-6 h-6 text-purple-400" />
//             <h2 className="text-xl font-semibold">Streaks Overview</h2>
//           </div>
//           <div className="grid grid-cols-7 gap-2">
//             {Array.from({ length: selectedChallenge?.duration || 0 }).map(
//               (_, index) => (
//                 <div
//                   key={index}
//                   className={`aspect-square rounded-lg flex items-center justify-center relative
//                   ${
//                     dashboardData.streaks.completedDays[index]
//                       ? "bg-purple-500/20 border-2 border-purple-500"
//                       : "bg-gray-700/30 border-2 border-transparent hover:border-gray-600"
//                   } 
//                   ${
//                     !dashboardData.streaks.completedDays[index] &&
//                     index === dashboardData.streaks.completedDays.findIndex((day) => !day) &&
//                     !hasCompletedToday()
//                       ? "cursor-pointer hover:bg-gray-700/50"
//                       : "cursor-not-allowed"
//                   }
//                   transition-all duration-200`}
//                   onClick={() => handleDailyStreakCompletion(index)}
//                   title={
//                     dashboardData.streaks.completedDays[index]
//                       ? `Completed on ${new Date(
//                           dashboardData.streaks.completedDates[index]
//                         ).toLocaleDateString()}`
//                       : index === dashboardData.streaks.completedDays.findIndex((day) => !day) &&
//                         !hasCompletedToday()
//                       ? "Click to complete today's challenge"
//                       : "Not available yet"
//                   }
//                 >
//                   {dashboardData.streaks.completedDays[index] && (
//                     <CheckCircle className="w-6 h-6 text-purple-400" />
//                   )}
//                   <span className="absolute -top-2 -right-2 text-xs bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
//                     {index + 1}
//                   </span>
//                 </div>
//               )
//             )}
//           </div>
//           <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
//             <CheckCircle className="w-4 h-4 text-purple-400" />
//             <span>Complete one challenge per day to maintain your streak!</span>
//           </div>
//         </Card>

//         {/* Notifications Panel */}
//         <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <Bell className="w-6 h-6 text-purple-400" />
//             <h2 className="text-xl font-semibold">Notifications</h2>
//           </div>
//           <div className="space-y-3">
//             {dashboardData.notifications.map((notification) => (
//               <div
//                 key={notification._id}
//                 className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
//               >
//                 <span>{notification.message}</span>
//                 <span className="text-sm text-gray-400">
//                   {new Date(notification.createdAt).toLocaleString()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Restore Streak Dialog */}
//         <Dialog open={showModal} onOpenChange={setShowModal}>
//           <DialogContent className="bg-gray-800 text-white border-gray-700">
//             <DialogHeader>
//               <DialogTitle className="text-xl font-bold text-purple-400">
//                 Restore Your Streak
//               </DialogTitle>
//               <DialogDescription className="text-gray-300 space-y-4">
//                 <p>
//                   You have a single chance to restore your streak within 24 hours of missing a day.
//                 </p>
//                 <ul className="list-disc pl-6 space-y-2">
//                   <li>Your streak will be reactivated</li>
//                   <li>You can continue your progress from where you left off</li>
//                   <li>This is a one-time opportunity per challenge</li>
//                 </ul>
//                 <Alert className="bg-yellow-500/20 border-yellow-500 mt-4">
//                   <AlertTriangle className="w-4 h-4 text-yellow-500" />
//                   <AlertDescription className="text-yellow-200">
//                     If you don't restore your streak within 24 hours, all progress will be reset!
//                   </AlertDescription>
//                 </Alert>
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter className="space-x-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowModal(false)}
//                 className="border-gray-600 text-gray-300 hover:bg-gray-700"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={restoreStreak}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-2"
//               >
//                 Restore My Streak
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

