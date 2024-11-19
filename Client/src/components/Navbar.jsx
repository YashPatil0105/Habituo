import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectCurrentUser } from "../features/authSlice";
import {
  Menu,
  X,
  LayoutDashboard,
  Target,
  Trophy,
  User,
  LogOut,
  LogIn,
  ShoppingBag,
  Bell,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetNotificationsQuery } from "../features/notificationsApiSlice"; // Import the hook for fetching notifications


export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = Boolean(user);

  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);

  const { data: notifications = [], isLoading, isError } = useGetNotificationsQuery(); // Use the hook here

  useEffect(() => {
    setMenuOpen(false);
    setNotificationsOpen(false);
    setUserDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle notifications click outside
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
      // Handle user dropdown click outside
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    setUserDropdownOpen(false);
  };

  const navItems = [
    {
      path: "/planCreatorPage",
      title: "Strategize",
      icon: <Target className="w-4 h-4" />,
      tooltip: "Create your plan here",
      highlights: "New templates available!",
    },
    {
      path: "/dashboardPage",
      title: "InsightBoard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      tooltip: "Track your progress and stats",
      highlights: "3 milestones reached",
    },
    {
      path: "/challengePage",
      title: "PeakTrack",
      icon: <Trophy className="w-4 h-4" />,
      tooltip: "Track your 21/45/90 day challenges",
      highlights: "Day 15 of 21",
    },
    {
      path: "/merchandise",
      title: "HabitStore",
      icon: <ShoppingBag className="w-4 h-4" />,
      tooltip: "Browse our merchandise collection",
      highlights: "New arrivals!",
      badge: cartCount,
    },
  ];

 

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-b border-gray-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg">
              H
            </div>
            Habituo
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-200" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                title={item.tooltip}
                className={({ isActive }) =>
                  `relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.title}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-pink-500/20">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center ml-6 space-x-4">
                {/* Notifications */}
                <div 
                  className="relative" 
                  ref={notificationsRef}
                  onMouseEnter={() => setNotificationsOpen(true)}
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <Link 
                    to="/notificationCenter"
                    onClick={() => setNotificationsOpen(false)}
                    className="relative p-2 rounded-lg hover:bg-white/5 transition-colors block"
                  >
                    <Bell className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-blue-500/20">
                      {notifications.length}
                    </span>
                  </Link>


                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 rounded-lg bg-gray-800/95 backdrop-blur-md shadow-xl border border-gray-700/50"
                      >
                        <div className="p-3 border-b border-gray-700/50">
                          <h3 className="text-white font-medium">
                            Notifications
                          </h3>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="p-3 hover:bg-white/5 transition-colors border-b border-gray-700/50 last:border-none"
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="text-white text-sm font-medium">
                                  {notification.title}
                                </h4>
                                <span className="text-xs text-gray-400">
                                  {notification.time}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm mt-1">
                                {notification.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-6 w-px bg-gray-600/50" />

                {/* User Dropdown */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {user?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm text-gray-300 hover:text-white transition-colors">
                      {user?.toUpperCase() || "User"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                  </button>

                  {/* User Menu Dropdown */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800/95 backdrop-blur-md shadow-xl border border-gray-700/50"
                      >
                        <div className="p-2">
                          <Link
                            to="/userProfile"
                            className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-colors"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center  px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 ml-4"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-lg">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <div className="space-y-2 pt-2 border-t border-gray-700/50">
                  <div className="px-3 py-2 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {user?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm text-gray-300">
                      {user?.toUpperCase() || "User"}
                    </span>
                  </div>
                  {/* Add this before the logout button in mobile menu */}
                  <Link
                    to="/userProfile"
                    className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-red-500 to-rose-600 text-white transition-all hover:shadow-lg hover:shadow-red-500/20"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center px-3 py-2 mt-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <LogIn className="w-4 h-4  mr-2" />
                  Sign In
                </Link>
              )}

              {/* Mobile Notifications */}
              {isAuthenticated && (
                <div className="mt-4 border-t border-gray-700/50 pt-4">
                  <div className="px-3">
                    <h3 className="text-white font-medium text-sm mb-2">
                      Notifications
                    </h3>
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="text-white text-sm font-medium">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// export default Navbar;
// import React, { useState, useEffect, useRef } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logOut, selectCurrentUser } from "../features/authSlice";
// import { Bell, ChevronDown, LogOut, User, LayoutDashboard, Target, Trophy, ShoppingBag, X, Menu } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useGetNotificationsQuery } from "../features/notificationsApiSlice"; // Import the hook for fetching notifications

// export const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(3);
//   const [notificationsOpen, setNotificationsOpen] = useState(false);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const user = useSelector(selectCurrentUser);
//   const isAuthenticated = Boolean(user);

//   const notificationsRef = useRef(null);
//   const userDropdownRef = useRef(null);

//   const { data: notifications = [], isLoading, isError } = useGetNotificationsQuery(); // Use the hook here

//   useEffect(() => {
//     setMenuOpen(false);
//     setNotificationsOpen(false);
//     setUserDropdownOpen(false);
//   }, [location]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationsRef.current &&
//         !notificationsRef.current.contains(event.target)
//       ) {
//         setNotificationsOpen(false);
//       }
//       if (
//         userDropdownRef.current &&
//         !userDropdownRef.current.contains(event.target)
//       ) {
//         setUserDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logOut());
//     setUserDropdownOpen(false);
//   };

//   const navItems = [
//     {
//       path: "/planCreatorPage",
//       title: "Strategize",
//       icon: <Target className="w-4 h-4" />,
//       tooltip: "Create your plan here",
//       highlights: "New templates available!",
//     },
//     {
//       path: "/dashboardPage",
//       title: "InsightBoard",
//       icon: <LayoutDashboard className="w-4 h-4" />,
//       tooltip: "Track your progress and stats",
//       highlights: "3 milestones reached",
//     },
//     {
//       path: "/challengePage",
//       title: "PeakTrack",
//       icon: <Trophy className="w-4 h-4" />,
//       tooltip: "Track your 21/45/90 day challenges",
//       highlights: "Day 15 of 21",
//     },
//     {
//       path: "/merchandise",
//       title: "HabitStore",
//       icon: <ShoppingBag className="w-4 h-4" />,
//       tooltip: "Browse our merchandise collection",
//       highlights: "New arrivals!",
//       badge: cartCount,
//     },
//   ];

//   return (
//     <nav className="backdrop-blur-md bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-b border-gray-500/30 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link
//             to="/"
//             className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity flex items-center gap-2"
//           >
//             <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg">
//               H
//             </div>
//             Habituo
//           </Link>

//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
//           >
//             {menuOpen ? <X className="w-6 h-6 text-gray-200" /> : <Menu className="w-6 h-6 text-gray-200" />}
//           </button>

//           <div className="hidden lg:flex lg:items-center lg:space-x-1">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 title={item.tooltip}
//                 className={({ isActive }) =>
//                   `relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
//                   ${isActive ? "text-white bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/10" : "text-gray-300 hover:text-white hover:bg-white/5"}`
//                 }
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 <span>{item.title}</span>
//                 {item.badge && (
//                   <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-pink-500/20">
//                     {item.badge}
//                   </span>
//                 )}
//               </NavLink>
//             ))}

//             {isAuthenticated ? (
//               <div className="flex items-center ml-6 space-x-4">
//                 <div
//                   className="relative"
//                   ref={notificationsRef}
//                   onMouseEnter={() => setNotificationsOpen(true)}
//                   onMouseLeave={() => setNotificationsOpen(false)}
//                 >
//                   <Link
//                     to="/notificationCenter"
//                     onClick={() => setNotificationsOpen(false)}
//                     className="relative p-2 rounded-lg hover:bg-white/5 transition-colors block"
//                   >
//                     <Bell className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
//                     <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-blue-500/20">
//                       {notifications.length}
//                     </span>
//                   </Link>

//                   <AnimatePresence>
//                     {notificationsOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="absolute right-0 mt-2 w-80 rounded-lg bg-gray-800/95 backdrop-blur-md shadow-xl border border-gray-700/50"
//                       >
//                         <div className="p-3 border-b border-gray-700/50">
//                           <h3 className="text-white font-medium">Notifications</h3>
//                         </div>
//                         <div className="max-h-[300px] overflow-y-auto">
//                           {isLoading ? (
//                             <div className="text-gray-400 text-center py-3">Loading...</div>
//                           ) : isError ? (
//                             <div className="text-red-500 text-center py-3">Error fetching notifications</div>
//                           ) : (
                            // notifications.map((notification) => (
                              // <div
                              //   key={notification.id}
                              //   className="p-3 hover:bg-white/5 transition-colors border-b border-gray-700/50 last:border-none"
                              // >
                              //   <div className="flex justify-between items-start">
                              //     <h4 className="text-white text-sm font-medium">{notification.title}</h4>
                              //     <span className="text-xs text-gray-400">{notification.time}</span>
                              //   </div>
                              //   <p className="text-gray-300 text-sm mt-1">{notification.message}</p>
                              // </div>
                            // ))
//                           )}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* User Dropdown */}
//                 <div className="relative" ref={userDropdownRef}>
//                   <button
//                     onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                     className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/5 transition-colors"
//                   >
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
//                       {user?.[0]?.toUpperCase() || "U"}
//                     </div>
//                     <ChevronDown className="w-5 h-5 text-gray-300" />
//                   </button>

//                   <AnimatePresence>
//                     {userDropdownOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800/95 backdrop-blur-md shadow-xl border border-gray-700/50"
//                       >
//                         <div className="p-3 border-b border-gray-700/50">
//                           <h3 className="text-white font-medium">Account</h3>
//                         </div>
//                         <div className="p-3 hover:bg-white/5 transition-colors">
//                           <Link to="/userProfile" className="block text-gray-300">
//                             Profile
//                           </Link>
//                         </div>
//                         <div className="p-3 hover:bg-white/5 transition-colors">
//                           <button
//                             onClick={handleLogout}
//                             className="w-full text-left text-gray-300"
//                           >
//                             Log Out
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
//                   Log In
//                 </Link>
//                 <Link to="/signUp" className="text-gray-300 hover:text-white transition-colors">
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };
