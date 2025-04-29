import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthSystem from './components/AuthSystem';
import Dashboard from './components/Dashboard';
import ProfileDashboard from './components/profile/ProfileDashboard';
import CompilerPage from './components/compiler/CompilerPage';
import PythonFundamentals from './components/courses/PythonFundamentals';
import CProgramming from './components/courses/CProgramming';
import JavaProgramming from './components/courses/JavaProgramming';
import ProgrammingCourses from './components/courses/ProgrammingCourses';
import CodeMastery from './components/courses/CodeMastery';
import ChallengeCategories from './components/challenges/ChallengeCategories';
import LanguageSelection from './components/challenges/LanguageSelection';
import LevelSelection from './components/challenges/LevelSelection';
import DailyChallenge from './components/challenges/DailyChallenge';
import JavaChallenge from './components/challenges/JavaChallenge';
import InterviewBot from './components/interview/InterviewBot';
import AptitudeTest from './components/aptitude/AptitudeTest';
import About from './components/About';
import AchievementsPage from './components/achievements/AchievementsPage';
import RewardsPage from './components/rewards/RewardsPage';
import StoreTheme from './store/StoreTheme';
import GameStore from './store/GameStore';
import Guild from './guild/Guild.tsx';
import CreateGuild from './guild/CreateGuild.tsx';
import JoinGuild from './guild/JoinGuild.tsx';
import MiniProjectPage from './components/miniproject/MiniProjectPage'; // Updated path

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <StoreTheme>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<AuthSystem />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<GameStore />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileDashboard /></ProtectedRoute>} />
            <Route path="/compiler" element={<ProtectedRoute><CompilerPage /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
            <Route path="/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
            <Route path="/guild" element={<ProtectedRoute><Guild /></ProtectedRoute>} />
            <Route path="/guild/create" element={<ProtectedRoute><CreateGuild /></ProtectedRoute>} />
            <Route path="/guild/join" element={<ProtectedRoute><JoinGuild /></ProtectedRoute>} />
            <Route path="/miniproject" element={<ProtectedRoute><MiniProjectPage /></ProtectedRoute>} />

            {/* Courses */}
            <Route path="/courses" element={<ProtectedRoute><ProgrammingCourses /></ProtectedRoute>} />
            <Route path="/courses/python-fundamentals" element={<ProtectedRoute><PythonFundamentals /></ProtectedRoute>} />
            <Route path="/courses/c-programming" element={<ProtectedRoute><CProgramming /></ProtectedRoute>} />
            <Route path="/courses/java-programming" element={<ProtectedRoute><JavaProgramming /></ProtectedRoute>} />

            {/* Challenges */}
            <Route path="/challenges" element={<ProtectedRoute><ChallengeCategories /></ProtectedRoute>} />
            <Route path="/challenges/language-select" element={<ProtectedRoute><LanguageSelection /></ProtectedRoute>} />
            <Route path="/challenges/level-select" element={<ProtectedRoute><LevelSelection /></ProtectedRoute>} />
            <Route path="/challenges/daily" element={<ProtectedRoute><DailyChallenge /></ProtectedRoute>} />
            <Route path="/challenges/java" element={<ProtectedRoute><JavaChallenge /></ProtectedRoute>} />

            {/* Interview Bot */}
            <Route path="/interview-bot" element={<ProtectedRoute><InterviewBot /></ProtectedRoute>} />

            {/* Aptitude Test */}
            <Route path="/aptitude-test" element={<ProtectedRoute><AptitudeTest /></ProtectedRoute>} />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/auth" replace />} />
          </Routes>
        </StoreTheme>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
