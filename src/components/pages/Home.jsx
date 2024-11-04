// import React from "react";

// export const Home = () => {
//   return <h1>Home</h1>;
// };
import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Target, Brain, Calendar, Trophy, Github, Twitter, Linkedin } from 'lucide-react';

export const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Target className="w-12 h-12 text-purple-400" />,
      title: "Challenge System",
      description: "Set and conquer 21, 45, or 90-day challenges to build lasting habits"
    },
    {
      icon: <Brain className="w-12 h-12 text-blue-400" />,
      title: "Smart Tracking",
      description: "Track your progress with intuitive analytics and visual feedback"
    },
    {
      icon: <Calendar className="w-12 h-12 text-green-400" />,
      title: "Custom Planning",
      description: "Create personalized plans for workout, study, or coding goals"
    },
    {
      icon: <Trophy className="w-12 h-12 text-yellow-400" />,
      title: "Gamified Progress",
      description: "Earn rewards, badges, and compete on leaderboards"
    }
  ];

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Software Developer",
      content: "This app helped me maintain a 90-day coding streak. The gamification really keeps you motivated!",
      avatar: "https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Mike R.",
      role: "Fitness Enthusiast",
      content: "The workout planning features are amazing. I've never been more consistent with my fitness goals.",
      avatar: "https://images.unsplash.com/photo-1669475535925-a011d7c31d45?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Lisa M.",
      role: "Graduate Student",
      content: "Perfect for managing study schedules. The streak system keeps me accountable every day.",
      avatar: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`pt-20 pb-12 md:pt-32 md:pb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Transform Your Habits
              <br />
              <span className="text-2xl md:text-4xl">One Day at a Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-center text-gray-300 mb-8">
              Track, plan, and achieve your goals with our intelligent productivity system
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                Get Started <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "1M+", label: "Habits Tracked" },
              { value: "500K+", label: "Goals Achieved" },
              { value: "4.9", label: "Average Rating" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

     
    </div>
  );
};

// export default HomePage;