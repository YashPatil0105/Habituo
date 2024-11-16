import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, Target, Brain, Calendar, Trophy, 
  Activity, ArrowRight, Users, Sparkles, Star,
  ChevronLeft, ChevronDown, CheckCircle, Zap,
  BarChart, Shield, Clock,ClipboardCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThreeBackground } from './ThreeBackground.jsx';
import { CursorEffect } from './CursorEffect.jsx';
import { Card } from '@/components/ui/card';

export const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      clearInterval(testimonialInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Target className="w-12 h-12 text-purple-400" />,
      title: "Smart Challenge System",
      description: "AI-powered challenge recommendations based on your goals and progress",
      stats: "80% higher completion rate"
    },
    {
      icon: <Brain className="w-12 h-12 text-blue-400" />,
      title: "Intelligent Tracking",
      description: "Real-time progress monitoring with predictive analytics",
      stats: "Personalized insights daily"
    },
    {
      icon: <Calendar className="w-12 h-12 text-green-400" />,
      title: "Adaptive Planning",
      description: "Dynamic scheduling that adapts to your lifestyle and energy levels",
      stats: "45% better habit retention"
    },
    {
      icon: <Trophy className="w-12 h-12 text-yellow-400" />,
      title: "Advanced Gamification",
      description: "Compete in challenges and earn unique rewards",
      stats: "Daily achievements"
    }
  ];

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Fitness Enthusiast",
      content: "This platform completely transformed how I approach my fitness goals. The AI recommendations are spot-on!",
      achievement: "Lost 30 lbs in 6 months"
    },
    {
      name: "Mike R.",
      role: "Software Developer",
      content: "The habit tracking features helped me maintain a consistent coding practice. My productivity has doubled!",
      achievement: "Completed 100 day coding streak"
    },
    {
      name: "Emma L.",
      role: "Student",
      content: "The adaptive planning made it so easy to balance my studies with other activities. My grades improved significantly!",
      achievement: "Improved GPA by 0.8 points"
    }
  ];

  const howItWorks = [
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-400" />,
      title: "Set Your Goals",
      description: "Define your personal, professional, or fitness goals with our intuitive goal-setting framework"
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-blue-400" />,
      title: "Leverage Expert Insights",
      description: "Access curated resources, expert tips, and strategies tailored to help you succeed."
    },
    {
      icon: <BarChart className="w-8 h-8 text-green-400" />,
      title: "Track Progress",
      description: "Monitor your progress with detailed analytics and adjust your plans in real-time"
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      title: "Achieve Results",
      description: "Celebrate your victories and unlock rewards as you reach your milestones"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900/70 text-gray-100">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900 pointer-events-none" style={{ zIndex: 1 }} />
      
      <ThreeBackground />
      <CursorEffect />
      
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Section */}
        <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-gray-900" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient">
                Transform Your Life
              </h1>
              <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Experience the next generation of habit tracking and personal development
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/dashboardPage" className="no-underline">
                  <button className="group relative px-8 py-4 bg-purple-600 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-purple-700">
                    <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                      Start Your Journey <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>
                <a href="#how-it-works" className="no-underline">
                  <button className="px-8 py-4 text-white bg-gray-800 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-purple-500/20">
                    Learn More <ChevronDown className="w-5 h-5 inline-block ml-2" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <Card
                  key={index}
                  className="group relative bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-20 relative bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group relative bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-400 mb-4">{feature.description}</p>
                        <div className="inline-flex items-center gap-2 text-purple-400">
                          <span>{feature.stats}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Success Stories
            </h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Card className="mx-auto max-w-3xl bg-gray-800/50">
                        <div className="p-8 text-center">
                          <p className="text-xl text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-purple-400">{testimonial.name}</h4>
                            <p className="text-gray-400">{testimonial.role}</p>
                          </div>
                          <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                            <Trophy className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium">{testimonial.achievement}</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

       {/* Trust Indicators */}
        <div className="py-20 relative bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "25K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
                { value: "2M+", label: "Habits Tracked", icon: <Activity className="w-6 h-6" /> },
                { value: "1M+", label: "Goals Achieved", icon: <Trophy className="w-6 h-6" /> },
                { value: "4.9", label: "Average Rating", icon: <Star className="w-6 h-6" /> }
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="group relative bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                      {stat.value}
                    </div>
                    <p className="text-gray-400">{stat.label}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Ready to Transform Your Life?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of others who have already started their journey to success.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/login" className="no-underline">
                  <button className="group relative px-8 py-4 bg-purple-600 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-purple-700">
                    <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                      Get Started Now <Sparkles className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>
                <div className="flex items-center gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-400">Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-400">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;