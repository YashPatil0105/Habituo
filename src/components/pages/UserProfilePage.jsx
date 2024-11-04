// import React, { useState } from 'react';
// import Avatar  from 'react-avatar'; // Using react-avatar for profile pictures
// import { Modal } from 'react-bootstrap'; // Modal component from react-bootstrap
// import { CheckCircle, XCircle } from 'lucide-react'; // Icons for achievements

// const achievementsData = [
//   { id: 1, name: '21-Day Fitness Master', earned: true },
//   { id: 2, name: '10,000 Steps a Day', earned: false },
//   { id: 3, name: 'Daily Meditator', earned: true },
// ];

// const challengesData = [
//   { id: 1, name: '30-Day Yoga Challenge', status: 'Ongoing' },
//   { id: 2, name: 'Weekly Reading Challenge', status: 'Completed' },
// ];

// export const UserProfilePage = () => {
//   const [user, setUser] = useState({
//     username: 'JaneDoe',
//     bio: 'Fitness enthusiast and nature lover.',
//     profilePicture: '', // URL for the profile picture
//   });
  
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newUsername, setNewUsername] = useState(user.username);
//   const [newBio, setNewBio] = useState(user.bio);
//   const [darkMode, setDarkMode] = useState(true); // Default to dark mode
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);

//   const handleEditProfile = () => {
//     setUser({ ...user, username: newUsername, bio: newBio });
//     setShowEditModal(false);
//   };

//   return (
//     <div className={`min-h-screen p-5 ${darkMode ? 'bg-gray-900' : 'bg-white'} text-white`}>
//       <header className="flex justify-between items-center mb-5">
//         <h1 className="text-2xl font-bold">User Profile</h1>
//       </header>

//       <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
//         <h2 className="text-xl font-semibold mb-4">User Information</h2>
//         <div className="flex items-center mb-4">
//           <Avatar name={user.username} size="60" round={true} />
//           <div className="ml-4">
//             <h3 className="text-lg">{user.username}</h3>
//             <p className="text-gray-400">{user.bio}</p>
//           </div>
//         </div>
//         <button
//           onClick={() => setShowEditModal(true)}
//           className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//         >
//           Edit Profile
//         </button>
//       </section>

//       <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
//         <h2 className="text-xl font-semibold mb-4">Achievements / Badges</h2>
//         <ul className="flex flex-col gap-2">
//           {achievementsData.map((achievement) => (
//             <li key={achievement.id} className="flex items-center">
//               {achievement.earned ? (
//                 <CheckCircle className="text-green-500 mr-2" />
//               ) : (
//                 <XCircle className="text-red-500 mr-2" />
//               )}
//               <span className={achievement.earned ? 'text-white' : 'text-gray-400'}>
//                 {achievement.name}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
//         <h2 className="text-xl font-semibold mb-4">Current Challenges Overview</h2>
//         <ul className="flex flex-col gap-2">
//           {challengesData.map((challenge) => (
//             <li key={challenge.id} className="flex justify-between items-center">
//               <span className="text-white">{challenge.name}</span>
//               <span className={`font-semibold ${challenge.status === 'Ongoing' ? 'text-yellow-500' : 'text-gray-400'}`}>
//                 {challenge.status}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
//         <h2 className="text-xl font-semibold mb-4">Settings</h2>
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-white">Dark Mode</span>
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={() => setDarkMode(!darkMode)}
//             className="cursor-pointer"
//           />
//         </div>
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-white">Notifications</span>
//           <input
//             type="checkbox"
//             checked={notificationsEnabled}
//             onChange={() => setNotificationsEnabled(!notificationsEnabled)}
//             className="cursor-pointer"
//           />
//         </div>
//       </section>

//       {/* Edit Profile Modal */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="mb-3">
//             <label className="block text-sm">Username</label>
//             <input
//               type="text"
//               value={newUsername}
//               onChange={(e) => setNewUsername(e.target.value)}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="block text-sm">Bio</label>
//             <textarea
//               value={newBio}
//               onChange={(e) => setNewBio(e.target.value)}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <button variant="secondary" onClick={() => setShowEditModal(false)}>
//             Cancel
//           </button>
//           <button variant="primary" onClick={handleEditProfile}>
//             Save Changes
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// // export default UserProfilePage;

import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Modal } from 'react-bootstrap';
import { CheckCircle, XCircle, Bell, Lock } from 'lucide-react';

const achievementsData = [
  { id: 1, name: '21-Day Fitness Master', earned: true },
  { id: 2, name: '10,000 Steps a Day', earned: false },
  { id: 3, name: 'Daily Meditator', earned: true },
];

const challengesData = [
  { id: 1, name: '30-Day Yoga Challenge', status: 'Ongoing' },
  { id: 2, name: 'Weekly Reading Challenge', status: 'Completed' },
  { id: 3, name: 'Daily Running Challenge', status: 'Upcoming' },
];

export const UserProfilePage = () => {
  const [user, setUser] = useState({
    username: 'JaneDoe',
    bio: 'Fitness enthusiast and nature lover.',
    profilePicture: '', // URL for the profile picture
    totalChallengesCompleted: 5,
    totalAchievementsEarned: 3,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newBio, setNewBio] = useState(user.bio);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleEditProfile = () => {
    setUser({ ...user, username: newUsername, bio: newBio });
    setShowEditModal(false);
  };

  return (
    <div className={`min-h-screen p-5 ${darkMode ? 'bg-gray-900' : 'bg-white'} text-white`}>
      <header className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">User Profile</h1>
      </header>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="flex items-center mb-4">
          <Avatar name={user.username} size="60" round={true} />
          <div className="ml-4">
            <h3 className="text-lg">{user.username}</h3>
            <p className="text-gray-400">{user.bio}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <span>Total Challenges Completed: {user.totalChallengesCompleted}</span>
          <span>Total Achievements Earned: {user.totalAchievementsEarned}</span>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition mt-3"
        >
          Edit Profile
        </button>
      </section>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Achievements / Badges</h2>
        <ul className="flex flex-col gap-2">
          {achievementsData.map((achievement) => (
            <li key={achievement.id} className="flex items-center">
              {achievement.earned ? (
                <CheckCircle className="text-green-500 mr-2" />
              ) : (
                <XCircle className="text-red-500 mr-2" />
              )}
              <span className={achievement.earned ? 'text-white' : 'text-gray-400'}>
                {achievement.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Current Challenges Overview</h2>
        <ul className="flex flex-col gap-2">
          {challengesData.map((challenge) => (
            <li key={challenge.id} className="flex justify-between items-center">
              <span className="text-white">{challenge.name}</span>
              <span className={`font-semibold ${challenge.status === 'Ongoing' ? 'text-yellow-500' : 'text-gray-400'}`}>
                {challenge.status}
              </span>
            </li>
          ))}
        </ul>
        <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-3">
          Start New Challenge
        </button>
        <a href="/challenges" className="text-blue-400 mt-2 block">View All Challenges</a>
      </section>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white">Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white">Notifications</span>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="cursor-pointer"
          />
        </div>
        <button className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700 mt-3 flex items-center">
          <Lock className="mr-2" /> Change Password
        </button>
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-3 flex items-center">
          <Bell className="mr-2" /> Manage Notifications
        </button>
      </section>

      <section className="bg-gray-800 rounded-lg shadow-lg p-5 mb-5">
        <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
        <ul className="flex flex-col gap-2">
          <li className="text-white">Joined 30-Day Yoga Challenge</li>
          <li className="text-white">Unlocked "21-Day Fitness Master" badge</li>
          <li className="text-gray-400">Updated profile on [Date]</li>
        </ul>
      </section>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="block text-sm">Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Bio</label>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </button>
          <button variant="primary" onClick={handleEditProfile}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// export default UserProfilePage;
