import React from 'react';
import { GraduationCap, Code, Atom, Trophy, Users, Activity, Terminal, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import LearningPath from './LearningPath';
import ProgressCard from './ProgressCard';
import NextLessonCard from './NextLessonCard';
import DailyChallenge from './DailyChallenge';
import AchievementBadge from './gamification/AchievementBadge';
import FloatingCompiler from './FloatingCompiler';
import CodeMastery from './courses/CodeMastery';
import { difficultyLevels } from './miniproject/projectData'; // Corrected import path

const Dashboard = () => {
  const recentAchievements = [
    { id: 1, title: 'First Code', icon: '🚀', description: 'Wrote your first line of code' },
    { id: 2, title: '7 Day Streak', icon: '🔥', description: 'Coded for 7 days in a row' },
    { id: 3, title: 'Bug Hunter', icon: '🐛', description: 'Fixed 10 coding errors' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B15] text-white overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section with Space Theme */}
      <div className="relative min-h-[90vh] pt-20 pb-16">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="https://v1.pinimg.com/videos/mc/720p/b1/ad/40/b1ad40468f438149cb44ac205b2ff3ec.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B15]/80 via-[#0B0B15]/50 to-[#0B0B15]"></div>
        </div>
        {/* Animated Space Elements */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random(),
                transform: `scale(${Math.random() * 0.5 + 0.5})`
              }}
            />
          ))}
          <div className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-lg animate-float-slow">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-40 left-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-lg animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-6 z-10 relative">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
              EVE
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in">
              Education Via Entertainment
            </p>
          </div>

          {/* Primary Cards Section */}
          <div className="space-y-8">
            {/* Daily Challenge */}
            <section className="animate-slide-up">
              <DailyChallenge />
            </section>

            {/* Progress and Next Lesson Row */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up-delayed">
              <ProgressCard />
              <NextLessonCard />
            </section>
          </div>

          {/* Secondary Content */}
          <div className="mt-12 space-y-12">
            {/* Recent Achievements */}
            <section className="animate-slide-up-delayed-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-purple-400" />
                Recent Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentAchievements.map((achievement) => (
                  <AchievementBadge key={achievement.id} {...achievement} />
                ))}
              </div>
            </section>

            {/* Code Mastery Card */}
            <section className="animate-slide-up-delayed-3">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">Begin Your Coding Quest</h2>
              <CodeMastery />
            </section>

            {/* Explore Learning Paths */}
            <section className="animate-slide-up-delayed-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">Explore Learning Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/miniproject">
                  <LearningPath 
                    icon={<Code2 className="w-8 h-8" />}
                    title="MiniProject.Diy"
                    description="Turn your Imagination into Reality"
                    progress={65}
                  />
                </Link>
                <Link to="/aptitude-test">
                  <LearningPath 
                    icon={<Atom className="w-8 h-8" />}
                    title="Aptitude test"
                    description="Test your self"
                    progress={42}
                  />
                </Link>
                <Link to="/interview-bot">
                  <LearningPath 
                    icon={<Activity className="w-8 h-8" />}
                    title="AI interview BOT"
                    description="Take an interview test from our interview expert"
                    progress={28}
                  />
                </Link>
              </div>
            </section>

            {/* Mini Project Preview */}
            <section className="animate-slide-up-delayed-5">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">Mini Project Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {difficultyLevels.slice(0, 2).map((level, index) => (
                  <div key={index} className="bg-[#1a1a2e]/50 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      {level.icon}
                      <h3 className="text-xl font-bold">{level.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{level.description}</p>
                    <Link to="/miniproject" className="text-blue-400 hover:text-blue-300">
                      Explore Projects →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
       </div>

      {/* Floating Compiler */}
      <FloatingCompiler />

      {/* Animations */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(0.8); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(3deg); }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(5deg); }
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 8s linear infinite;
          }
          .animate-fade-in { animation: fadeIn 1s ease-out; }
          .animate-slide-up { animation: slideUp 0.8s ease-out; }
          .animate-slide-up-delayed { animation: slideUp 0.8s ease-out 0.2s backwards; }
          .animate-slide-up-delayed-2 { animation: slideUp 0.8s ease-out 0.4s backwards; }
          .animate-slide-up-delayed-3 { animation: slideUp 0.8s ease-out 0.6s backwards; }
          .animate-slide-up-delayed-4 { animation: slideUp 0.8s ease-out 0.8s backwards; }
          .animate-slide-up-delayed-5 { animation: slideUp 0.8s ease-out 1s backwards; }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
