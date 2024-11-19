// import React, { useState, useEffect } from 'react';
// import { CheckCircle, Trophy, Flame, Calendar, Settings, Edit, Zap, ArrowRight, Menu, X } from 'lucide-react';
// import Avatar from 'react-avatar';
// import { Modal } from 'react-bootstrap';

// export const UserProfilePage = () => {
//   const [user, setUser] = useState({
//     username: '',
//     points: 0,
//     badges: [],
//     streaks: [],
//     bio: 'Neural architect | Digital innovator'
//   });

//   const [editProfile, setEditProfile] = useState({
//     username: '',
//     bio: ''
//   });

//   const [activeSection, setActiveSection] = useState('overview');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userData = {
//         username: 'CyberNinja',
//         points: 750,
//         bio: 'Neural architect | Digital innovator',
//         badges: [
//           { badgeName: 'Quantum Achiever', dateEarned: new Date(), description: 'Mastered advanced neural networks' },
//           { badgeName: 'Tech Mastery', dateEarned: new Date(), description: 'Pioneered cutting-edge digital solutions' }
//         ],
//         streaks: [
//           { habitId: 'Code Training', streakCount: 25, lastUpdated: new Date(), icon: <Zap className="text-blue-500" /> },
//           { habitId: 'Mind Optimization', streakCount: 30, lastUpdated: new Date(), icon: <Flame className="text-purple-500" /> }
//         ]
//       };
//       setUser(userData);
//       setEditProfile({ 
//         username: userData.username, 
//         bio: userData.bio 
//       });
//     };

//     fetchUserData();
//   }, []);

//   const handleProfileUpdate = () => {
//     setUser(prev => ({
//       ...prev,
//       username: editProfile.username,
//       bio: editProfile.bio
//     }));
//     setModalVisible(false);
//   };

//   const renderContent = () => {
//     switch(activeSection) {
//       case 'overview':
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
//               <Avatar 
//                 name={user.username} 
//                 size="50" 
//                 round={true} 
//                 className="mr-4 ring-2 ring-cyan-500" 
//               />
//               <div>
//                 <h2 className="text-xl font-bold text-cyan-300">{user.username}</h2>
//                 <p className="text-cyan-600 text-xs">{user.bio}</p>
//               </div>
//             </div>
//             <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center">
//               <Flame className="mr-3 text-yellow-500 animate-pulse" />
//               <span className="text-cyan-300">{user.points} Neural Points</span>
//             </div>
//             <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
//               <h3 className="text-xl text-cyan-500 mb-3">Quick Stats</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-[#112240] p-3 rounded-lg text-center">
//                   <span className="block text-cyan-300 text-2xl font-bold">{user.badges.length}</span>
//                   <span className="text-cyan-600 text-sm">Achievements</span>
//                 </div>
//                 <div className="bg-[#112240] p-3 rounded-lg text-center">
//                   <span className="block text-cyan-300 text-2xl font-bold">{user.streaks.length}</span>
//                   <span className="text-cyan-600 text-sm">Active Streams</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case 'badges':
//         return (
//           <div className="space-y-4">
//             {user.badges.map((badge, index) => (
//               <div 
//                 key={index} 
//                 className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center"
//               >
//                 <CheckCircle className="text-cyan-500 mr-4" />
//                 <div>
//                   <h4 className="text-cyan-300 font-semibold">{badge.badgeName}</h4>
//                   <p className="text-cyan-600 text-sm">{badge.description}</p>
//                   <p className="text-xs text-cyan-700 mt-1">
//                     Synchronized: {badge.dateEarned.toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       case 'streaks':
//         return (
//           <div className="space-y-4">
//             {user.streaks.map((streak, index) => (
//               <div 
//                 key={index} 
//                 className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center justify-between"
//               >
//                 <div className="flex items-center">
//                   {streak.icon}
//                   <span className="ml-3 text-cyan-300">{streak.habitId} Stream</span>
//                 </div>
//                 <span className="text-cyan-500 font-bold">{streak.streakCount} Cycles</span>
//               </div>
//             ))}
//           </div>
//         );
//       case 'settings':
//         return (
//           <div className="space-y-4">
//             <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
//               <h3 className="text-cyan-500 mb-3">System Configuration</h3>
//               <p className="text-cyan-600">Neural Network Synchronized</p>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0A1128] via-[#1A2B4A] to-[#2C3E5A] text-cyan-300 font-mono tracking-tight py-16 px-4">
//       <div className="container mx-auto max-w-6xl">
//         {/* Mobile Header */}
//         <div className="md:hidden bg-[#112240] border border-cyan-800 rounded-xl mb-4">
//           <div className="flex justify-between items-center p-4">
//             <div className="flex items-center space-x-4">
//               <Avatar 
//                 name={user.username} 
//                 size="50" 
//                 round={true} 
//                 className="ring-2 ring-cyan-500" 
//               />
//               <div>
//                 <h2 className="text-xl font-bold text-cyan-300">{user.username}</h2>
//                 <p className="text-cyan-600 text-xs">{user.bio}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={() => setModalVisible(true)}
//                 className="bg-cyan-900/50 text-cyan-300 p-2 rounded-full hover:bg-cyan-800/50 transition border border-cyan-700"
//               >
//                 <Edit className="w-4 h-4" />
//               </button>
//               <button 
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="bg-cyan-900/50 text-cyan-300 p-2 rounded-full hover:bg-cyan-800/50 transition border border-cyan-700"
//               >
//                 {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div className="bg-[#0A1128] border-t border-cyan-800">
//               {['overview', 'badges', 'streaks', 'settings'].map((section) => (
//                 <button
//                   key={section}
//                   onClick={() => {
//                     setActiveSection(section);
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`w-full text-left p-4 border-b border-cyan-800 transition-colors ${
//                     activeSection === section 
//                       ? 'bg-cyan-800/30 text-cyan-200' 
//                       : 'text-cyan-500 hover:bg-cyan-800/20'
//                   }`}
//                 >
//                   <span className="capitalize">{section}</span>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Desktop Layout */}
//         <div className="hidden md:grid md:grid-cols-[250px_1fr] gap-6">
//           {/* Sidebar Navigation */}
//           <div className="bg-[#112240] border border-cyan-800 rounded-xl p-4 space-y-2">
//             {['overview', 'badges', 'streaks', 'settings'].map((section) => (
//               <button
//                 key={section}
//                 onClick={() => setActiveSection(section)}
//                 className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
//                   activeSection === section 
//                     ? 'bg-cyan-800/30 text-cyan-200 border border-cyan-700' 
//                     : 'text-cyan-500 hover:bg-cyan-800/20'
//                 }`}
//               >
//                 <span className="capitalize">{section}</span>
//                 <ArrowRight className="w-5 h-5" />
//               </button>
//             ))}
//           </div>

//           {/* Main Content */}
//           <div className="bg-[#112240] border border-cyan-800 rounded-xl overflow-hidden">
//             <div className="p-6">
//               {renderContent()}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Content */}
//         <div className="md:hidden bg-[#112240] border border-cyan-800 rounded-xl">
//           <div className="p-6">
//             {renderContent()}
//           </div>
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       <Modal 
//         show={modalVisible} 
//         onHide={() => setModalVisible(false)}
//         centered
//         dialogClassName="modal-90w"
//       >
//         {/* Modal content remains the same as previous version */}
//         <Modal.Header closeButton className="bg-[#0A1128] border-b border-cyan-800">
//           <Modal.Title className="text-cyan-500">Matrix Modification</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-[#0A1128]">
//           <div className="space-y-4">
//             <div>
//               <label className="block mb-2 text-cyan-400">Username Override</label>
//               <input 
//                 type="text" 
//                 value={editProfile.username}
//                 onChange={(e) => setEditProfile(prev => ({
//                   ...prev, 
//                   username: e.target.value
//                 }))}
//                 className="w-full p-2 bg-[#112240] text-cyan-300 border border-cyan-700 rounded focus:ring-2 focus:ring-cyan-500"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-cyan-400">Bio Update</label>
//               <textarea 
//                 value={editProfile.bio}
//                 onChange={(e) => setEditProfile(prev => ({
//                   ...prev, 
//                   bio: e.target.value
//                 }))}
//                 className="w-full p-2 bg-[#112240] text-cyan-300 border border-cyan-700 rounded focus:ring-2 focus:ring-cyan-500"
//                 rows={3}
//               />
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="bg-[#0A1128] border-t border-cyan-800">
//           <button 
//             onClick={() => setModalVisible(false)}
//             className="bg-[#112240] text-cyan-400 px-4 py-2 rounded mr-2 hover:bg-cyan-800/20 transition border border-cyan-700"
//           >
//             Abort
//           </button>
//           <button 
//             onClick={handleProfileUpdate}
//             className="bg-cyan-900/50 text-cyan-200 px-4 py-2 rounded hover:bg-cyan-800/50 transition border border-cyan-600"
//           >
//             Synchronize
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default UserProfilePage;
import React, { useState, useEffect } from 'react';
import { CheckCircle, Flame, Zap, Edit, Menu, X } from 'lucide-react';
import Avatar from 'react-avatar';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

export const UserProfilePage = () => {
  const [user, setUser] = useState({
    username: '',
    points: 0,
    badges: [],
    streaks: [],
    bio: 'Neural architect | Digital innovator'
  });

  const [editProfile, setEditProfile] = useState({
    username: '',
    bio: ''
  });

  const [activeSection, setActiveSection] = useState('overview');
  const [modalVisible, setModalVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Assuming token is saved in localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        // console.log(response.data);
        setUser(response.data);
        // console.log(response.data);
        setEditProfile({
          username: response.data.username,
          bio: response.data.bio
        });
      } catch (error) {
        if (error.response?.status === 403) {
          console.error("Forbidden: Token is invalid or expired");
          // Optionally log the user out or redirect to login
      } else {
          console.error("Error fetching user data:", error.message);
      }
      }
    };
    if (!authToken) {
      console.error("No auth token found");
      return;
  }
  
    if (authToken) {
      fetchUserData();
    }
  }, [authToken]);

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8000/api/users/profile',
        { username: editProfile.username, bio: editProfile.bio },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      setUser(response.data);
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // const renderContent = () => {
  //   switch (activeSection) {
  //     case 'overview':
  //       return (
  //         <div className="space-y-4">
  //           <div className="flex items-center bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
  //             <Avatar name={user.username} size="50" round={true} className="mr-4 ring-2 ring-cyan-500" />
  //             <div>
  //               <h2 className="text-xl font-bold text-cyan-300">{user.username}</h2>
  //               <p className="text-cyan-600 text-xs">{user.bio}</p>
  //             </div>
  //           </div>
  //           <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center">
  //             <Flame className="mr-3 text-yellow-500 animate-pulse" />
  //             <span className="text-cyan-300">{user.points} Neural Points</span>
  //           </div>
  //           <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
  //             <h3 className="text-xl text-cyan-500 mb-3">Quick Stats</h3>
  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="bg-[#112240] p-3 rounded-lg text-center">
  //                 <span className="block text-cyan-300 text-2xl font-bold">{user.badges.length}</span>
  //                 <span className="text-cyan-600 text-sm">Achievements</span>
  //               </div>
  //               <div className="bg-[#112240] p-3 rounded-lg text-center">
  //                 <span className="block text-cyan-300 text-2xl font-bold">{user.streaks.length}</span>
  //                 <span className="text-cyan-600 text-sm">Active Streams</span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     case 'badges':
  //       return (
  //         <div className="space-y-4">
  //           {user.badges.map((badge, index) => (
  //             <div key={index} className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center">
  //               <CheckCircle className="text-cyan-500 mr-4" />
  //               <div>
  //                 <h4 className="text-cyan-300 font-semibold">{badge.badgeName}</h4>
  //                 <p className="text-cyan-600 text-sm">{badge.description}</p>
  //                 <p className="text-xs text-cyan-700 mt-1">
  //                   Synchronized: {badge.dateEarned.toLocaleDateString()}
  //                 </p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     case 'streaks':
  //       return (
  //         <div className="space-y-4">
  //           {user.streaks.map((streak, index) => (
  //             <div key={index} className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center justify-between">
  //               <div className="flex items-center">
  //                 {streak.icon}
  //                 <span className="ml-3 text-cyan-300">{streak.habitId} Stream</span>
  //               </div>
  //               <span className="text-cyan-500 font-bold">{streak.streakCount} Cycles</span>
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     case 'settings':
  //       return (
  //         <div className="space-y-4">
  //           <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
  //             <h3 className="text-cyan-500 mb-3">System Configuration</h3>
  //             <p className="text-cyan-600">Neural Network Synchronized</p>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div className="flex items-center bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
              <Avatar name={user.username} size="50" round={true} className="mr-4 ring-2 ring-cyan-500" />
              <div>
                <h2 className="text-xl font-bold text-cyan-300">{user.username}</h2>
                <p className="text-cyan-600 text-xs">{user.bio}</p>
              </div>
            </div>
            <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center">
              <Flame className="mr-3 text-yellow-500 animate-pulse" />
              <span className="text-cyan-300">{user.points} Neural Points</span>
            </div>
            <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
              <h3 className="text-xl text-cyan-500 mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#112240] p-3 rounded-lg text-center">
                  <span className="block text-cyan-300 text-2xl font-bold">{user.badges.length}</span>
                  <span className="text-cyan-600 text-sm">Achievements</span>
                </div>
                <div className="bg-[#112240] p-3 rounded-lg text-center">
                  <span className="block text-cyan-300 text-2xl font-bold">{user.streaks.length}</span>
                  <span className="text-cyan-600 text-sm">Active Streams</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'badges':
        return (
          <div className="space-y-4">
            {user.badges.length > 0 ? (
              user.badges.map((badge, index) => (
                <div key={index} className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center">
                  <CheckCircle className="text-cyan-500 mr-4" />
                  <div>
                    <h4 className="text-cyan-300 font-semibold">{badge.badgeName}</h4>
                    <p className="text-cyan-600 text-sm">{badge.description || 'No description available'}</p>
                    <p className="text-xs text-cyan-700 mt-1">
                      Synchronized: {new Date(badge.dateEarned).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-cyan-500">No achievements earned yet.</div>
            )}
          </div>
        );
      case 'streaks':
        return (
          <div className="space-y-4">
            {user.streaks.length > 0 ? (
              user.streaks.map((streak, index) => (
                <div key={index} className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800 flex items-center justify-between">
                  <div className="flex items-center">
                    {streak.icon || <Zap className="text-cyan-500" />}
                    <span className="ml-3 text-cyan-300">{streak.habitId || 'Unnamed Stream'}</span>
                  </div>
                  <span className="text-cyan-500 font-bold">{streak.streakCount || 0} Cycles</span>
                </div>
              ))
            ) : (
              <div className="text-center text-cyan-500">No active streaks yet.</div>
            )}
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-4">
            <div className="bg-[#0A1128] p-4 rounded-lg border border-cyan-800">
              <h3 className="text-cyan-500 mb-3">System Configuration</h3>
              {/* <p className="text-cyan-600">Neural Network Synchronized</p> */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1128] via-[#1A2B4A] to-[#2C3E5A] text-cyan-300 font-mono tracking-tight py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#112240] border border-cyan-800 rounded-xl mb-4">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-4">
              <Avatar name={user.username} size="50" round={true} className="ring-2 ring-cyan-500" />
              <div>
                <h2 className="text-xl font-bold text-cyan-300">{user.username}</h2>
                <p className="text-cyan-600 text-xs">{user.bio}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setModalVisible(true)} className="bg-cyan-900/50 text-cyan-300 p-2 rounded-full hover:bg-cyan-800/50 transition border border-cyan-700">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-cyan-900/50 text-cyan-300 p-2 rounded-full hover:bg-cyan-800/50 transition border border-cyan-700">
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="bg-[#0A1128] border-t border-cyan-800">
              {['overview', 'badges', 'streaks', 'settings'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-4 border-b border-cyan-800 transition-colors ${activeSection === section ? 'bg-cyan-800/30 text-cyan-200' : 'text-cyan-500 hover:bg-cyan-800/20'}`}
                >
                  <span className="capitalize">{section}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar Navigation */}
          <div className="space-y-6 p-4 bg-[#112240] rounded-xl border border-cyan-800">
            {['overview', 'badges', 'streaks', 'settings'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left p-4 border-b border-cyan-800 transition-colors ${activeSection === section ? 'bg-cyan-800/30 text-cyan-200' : 'text-cyan-500 hover:bg-cyan-800/20'}`}
              >
                <span className="capitalize">{section}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">{renderContent()}</div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-cyan-500">Username</label>
              <input
                id="username"
                type="text"
                value={editProfile.username}
                onChange={(e) => setEditProfile({ ...editProfile, username: e.target.value })}
                className="w-full p-2 mt-2 rounded-lg bg-[#0A1128] text-cyan-300 border border-cyan-700"
              />
            </div>
            <div>
              <label htmlFor="bio" className="text-cyan-500">Bio</label>
              <textarea
                id="bio"
                value={editProfile.bio}
                onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                className="w-full p-2 mt-2 rounded-lg bg-[#0A1128] text-cyan-300 border border-cyan-700"
                rows="3"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleProfileUpdate} className="bg-cyan-700 text-cyan-300 p-2 rounded-md">Save Changes</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
