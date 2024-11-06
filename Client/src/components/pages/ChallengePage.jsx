
import React, { useState } from 'react';
import { 
  Calendar, 
  Trophy, 
  Target, 
  Plus, 
  Book, 
  Code, 
  Dumbbell, 
  AlertCircle,
  ChevronRight,
  X,
  Flame,
  Filter,
  Search
} from 'lucide-react';

export const ChallengePage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const predefinedChallenges = [
    {
      id: 1,
      title: "100 Push-ups Challenge",
      category: "Fitness",
      duration: 21,
      participants: 1234,
      icon: <Dumbbell className="w-6 h-6" />,
      description: "Build strength with daily push-ups",
      difficulty: "Intermediate",
      milestones: [
        { day: 7, reward: "Week Warrior Badge" },
        { day: 14, reward: "Consistency Master Badge" },
        { day: 21, reward: "Challenge Complete Trophy" }
      ]
    },
    {
      id: 2,
      title: "LeetCode Daily",
      category: "Coding",
      duration: 90,
      participants: 892,
      icon: <Code className="w-6 h-6" />,
      description: "Solve one coding problem every day",
      difficulty: "Hard",
      milestones: [
        { day: 30, reward: "Code Ninja Badge" },
        { day: 60, reward: "Algorithm Master Badge" },
        { day: 90, reward: "Elite Coder Trophy" }
      ]
    },
    {
      id: 3,
      title: "Study Streak",
      category: "Education",
      duration: 45,
      participants: 567,
      icon: <Book className="w-6 h-6" />,
      description: "Maintain daily study habits",
      difficulty: "Easy",
      milestones: [
        { day: 15, reward: "Knowledge Seeker Badge" },
        { day: 30, reward: "Study Master Badge" },
        { day: 45, reward: "Scholar Trophy" }
      ]
    }
  ];

  const activeChallenge = {
    id: 1,
    title: "100 Push-ups Challenge",
    currentStreak: 7,
    bestStreak: 12,
    startDate: "2024-10-20",
    progress: 33,
    lastUpdate: "2024-10-27",
    badges: [
      { id: 1, name: "Week Warrior", icon: "🏆" },
      { id: 2, name: "Early Bird", icon: "🌅" },
      { id: 3, name: "Consistency King", icon: "👑" }
    ],
    calendar: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 9, i + 1),
      status: i < 27 ? (Math.random() > 0.2 ? 'completed' : 'missed') : 'upcoming'
    })),
    upcomingMilestone: {
      days: 14,
      reward: "Consistency Master Badge"
    }
  };

  const Alert = ({ children, variant = "default" }) => {
    const variants = {
      default: "bg-purple-500/10 border-purple-500/20 text-purple-300",
      warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-300",
      destructive: "bg-red-500/10 border-red-500/20 text-red-300"
    };
    
    return (
      <div className={`p-4 rounded-lg border ${variants[variant]} flex items-center space-x-2`}>
        {children}
      </div>
    );
  };

  const Button = ({ children, variant = "default", className = "", onClick }) => {
    const variants = {
      default: "bg-purple-500 hover:bg-purple-600",
      outline: "bg-transparent border border-purple-500/20 hover:border-purple-500/40 text-purple-300",
      ghost: "bg-transparent hover:bg-purple-500/10 text-purple-300"
    };
    
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg transition-all ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  const ChallengeCard = ({ challenge }) => (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            {challenge.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-100">{challenge.title}</h3>
            <p className="text-purple-300/60 text-sm">{challenge.category}</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-purple-500/10 rounded-full text-purple-300 text-sm">
          {challenge.duration} Days
        </div>
      </div>
      
      <p className="text-gray-300/80 mb-4">{challenge.description}</p>
      
      <div className="space-y-2">
        <div className="text-sm text-purple-300/60">
          Next Milestone: {challenge.milestones[0].reward} (Day {challenge.milestones[0].day})
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-purple-300/60">
            {challenge.participants.toLocaleString()} participants
          </span>
          <div className={`px-3 py-1 rounded-full text-sm ${
            challenge.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' :
            challenge.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
            'bg-red-500/10 text-red-400'
          }`}>
            {challenge.difficulty}
          </div>
        </div>
      </div>
    </div>
  );

  const ProgressCalendar = ({ days }) => (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => (
        <div
          key={index}
          className={`aspect-square rounded-lg flex items-center justify-center text-sm border ${
            day.status === 'completed' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
            day.status === 'missed' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
            'bg-purple-500/10 border-purple-500/20 text-purple-300'
          }`}
        >
          {day.date.getDate()}
        </div>
      ))}
    </div>
  );

  const Progress = ({ value }) => (
    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-500 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const CreateChallengeModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 rounded-xl border border-purple-500/20 max-w-2xl w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Create Custom Challenge</h2>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-purple-300/60 hover:text-purple-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">Challenge Title</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500/40 text-gray-100"
              placeholder="Enter challenge title..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">Category</label>
            <select className="w-full bg-gray-800 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500/40 text-gray-100">
              <option>Fitness</option>
              <option>Coding</option>
              <option>Education</option>
              <option>Custom</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">Duration</label>
            <div className="flex space-x-4">
              {[21, 45, 90].map(days => (
                <button
                  key={days}
                  className="flex-1 bg-gray-800 border border-purple-500/20 rounded-lg px-4 py-2 hover:border-purple-500/40 transition-colors text-gray-100"
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300">Daily Goal Description</label>
            <textarea
              className="w-full bg-gray-800 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500/40 text-gray-100 h-24"
              placeholder="Describe what needs to be done each day..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowCreateModal(false)}
            >
              Create Challenge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const ResetWarningModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <p>Your streak is at risk! Complete today's challenge before midnight to maintain your 7-day streak.</p>
      </Alert>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900/10 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Challenges
            </h1>
            <p className="text-purple-300/60">
              Discover or create challenges to boost your productivity
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Challenge</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search challenges..."
              className="w-full bg-gray-800 border border-purple-500/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500/40 text-gray-100"
            />
          </div>
          <div className="flex space-x-2">
            {['all', 'fitness', 'coding', 'education'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  activeFilter === filter 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-800 text-purple-300 hover:bg-gray-700 border border-purple-500/20'
                } transition-colors`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Active Challenge Section */}
        <div className="bg-gray-900/50 rounded-xl border border-purple-500/20 p-6 mb-12 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6">Active Challenge</h2>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">{activeChallenge.title}</h3>
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-orange-400">
                  <Flame className="w-4 h-4" />
                  <span>{activeChallenge.currentStreak} day streak</span>
                </div>
                <div className="text-purple-300/60">
                  Best: {activeChallenge.bestStreak} days
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <Progress value={activeChallenge.progress} />
              </div>
              <div className="text-sm text-purple-300/60">
                {activeChallenge.progress}% Complete
              </div>
            </div>
          </div>
          {/* Calendar */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-purple-300 mb-4">Progress Calendar</h4>
            <ProgressCalendar days={activeChallenge.calendar} />
          </div>

          {/* Badges */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-purple-300 mb-4">Earned Badges</h4>
            <div className="flex space-x-4">
              {activeChallenge.badges.map(badge => (
                <div 
                  key={badge.id}
                  className="p-3 bg-purple-500/10 rounded-lg text-center"
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-sm text-purple-300">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Milestone */}
          <Alert>
            <Target className="w-4 h-4" />
            <span>
              Next milestone in {activeChallenge.upcomingMilestone.days} days: 
              {' '}{activeChallenge.upcomingMilestone.reward}
            </span>
          </Alert>
        </div>

        {/* Available Challenges */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Available Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predefinedChallenges.map(challenge => (
              <ChallengeCard 
                key={challenge.id} 
                challenge={challenge}
                onClick={() => setSelectedChallenge(challenge)}
              />
            ))}
          </div>
        </div>

        {/* Modals */}
        {showCreateModal && <CreateChallengeModal />}
        {showResetWarning && <ResetWarningModal />}
      </div>
    </div>
  );
};