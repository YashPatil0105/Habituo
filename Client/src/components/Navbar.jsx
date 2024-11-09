
// import React, { useState } from "react";
// import "./Navbar.css";
// import { Link, NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logOut, selectCurrentUser } from "../features/authSlice.js"; // Import logOut and selectCurrentUser selector

// export const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dispatch = useDispatch();

//   // Access user from Redux store
//   const user = useSelector(selectCurrentUser);
//   const isAuthenticated = Boolean(user); // True if user is logged in

//   const handleLogout = () => {
//     dispatch(logOut()); // Reset auth state by logging out
//   };

//   return (
//     <nav>
//       <Link to="/" className="title">
//         Habituo
//       </Link>
//       <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//       <ul className={menuOpen ? "open" : ""}>
//         <li>
//           <NavLink to="/planCreatorPage" title="Create your plan here">Strategize</NavLink>
//         </li>
//         <li>
//           <NavLink to="/dashboardPage" title="Track your progress and stats">InsightBoard</NavLink>
//         </li>
//         <li>
//           <NavLink to="/challengePage" title="Track your 21/45/90 day challenges">PeakTrack</NavLink>
//         </li>
//         <li>
//           <NavLink to="/userProfile" title="View and edit your profile">MyPath</NavLink>
//         </li>

//         {isAuthenticated ? (
//           <>
//             <li className="welcome">
//               <span>Welcome, {user || "User"}</span>
//             </li>
//             <li>
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <NavLink to="/login" className="auth-btn" title="Sign In to your account">Sign In</NavLink>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };
import React, { useState, useEffect } from "react";
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
  LogIn
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = Boolean(user);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const navItems = [
    {
      path: "/planCreatorPage",
      title: "Strategize",
      icon: <Target className="w-4 h-4" />,
      tooltip: "Create your plan here"
    },
    {
      path: "/dashboardPage",
      title: "InsightBoard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      tooltip: "Track your progress and stats"
    },
    {
      path: "/challengePage",
      title: "PeakTrack",
      icon: <Trophy className="w-4 h-4" />,
      tooltip: "Track your 21/45/90 day challenges"
    },
    {
      path: "/userProfile",
      title: "MyPath",
      icon: <User className="w-4 h-4" />,
      tooltip: "View and edit your profile"
    }
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-500 sticky top-0 z-50 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
          >
            Habituo
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
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
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'text-white bg-gray-800 shadow-lg shadow-blue-500/20' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'}`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.title}
                <div className="absolute hidden group-hover:block bg-gray-900 text-xs text-gray-300 p-2 rounded shadow-lg -bottom-8">
                  {item.tooltip}
                </div>
              </NavLink>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center ml-4 space-x-4">
                <span className="text-sm text-gray-300">
                  Welcome, <span className="font-medium text-white">{user.toUpperCase() || "User"}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity ml-4"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'text-white bg-gray-800 shadow-lg shadow-blue-500/20' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'}`
                  }
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <div className="space-y-2 pt-2 border-t border-gray-800">
                  <div className="px-3 py-2 text-sm text-gray-300">
                    Welcome, <span className="font-medium text-white">{user || "User"}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity mt-2"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};