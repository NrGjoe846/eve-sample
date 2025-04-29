// src/components/courses/MyCourses.tsx
import React from 'react';
import { BookOpen, Trophy, Star, Clock, Zap, Skull, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  xp: number;
  progress: number;
  language: string;
  chapters: Chapter[];
  path?: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: number;
  completed: number;
  unlocked: boolean;
}

// Sample data: Filtering courses with progress > 0 to simulate "enrolled" courses
const allCourses: Course[] = [
  {
    id: 'python-101',
    title: 'Quest for Python’s Ancient Codex',
    description: 'Unravel the secrets of Python through daring trials and epic projects',
    level: 'Beginner',
    duration: '8 weeks',
    xp: 1200,
    progress: 45,
    language: 'Python',
    path: '/courses/python-fundamentals',
    chapters: [
      { id: 'py-ch1', title: 'Initiation into the Codex', lessons: 5, completed: 5, unlocked: true },
      { id: 'py-ch2', title: 'Runes of Data and Variables', lessons: 8, completed: 6, unlocked: true },
      { id: 'py-ch3', title: 'Paths of Flow and Cycles', lessons: 10, completed: 0, unlocked: false },
    ],
  },
  {
    id: 'java-mastery',
    title: 'Java: Cyber Circuit Championship',
    description: 'Race through Java’s digital highways, mastering circuits of code',
    level: 'Beginner',
    duration: '12 weeks',
    xp: 1500,
    progress: 25,
    language: 'Java',
    path: '/courses/java-programming',
    chapters: [
      { id: 'java-ch1', title: 'Java Bootcamp: Circuit Start', lessons: 6, completed: 6, unlocked: true },
      { id: 'java-ch2', title: 'Object-Oriented Overdrive', lessons: 12, completed: 3, unlocked: true },
    ],
  },
  {
    id: 'c-programming',
    title: 'C: Haunted Code Mausoleum',
    description: 'Survive the horrors of C, mastering its cursed depths',
    level: 'Beginner',
    duration: '10 weeks',
    xp: 2000,
    progress: 10,
    language: 'C',
    path: '/courses/c-programming',
    chapters: [
      { id: 'c-ch1', title: 'Echoes of the Basics', lessons: 5, completed: 2, unlocked: true },
      { id: 'c-ch2', title: 'Shadows of Memory', lessons: 8, completed: 0, unlocked: false },
    ],
  },
];

// Filter for "My Courses" (progress > 0)
const myCourses = allCourses.filter((course) => course.progress > 0);

const MyCourses = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/originals/e2/86/14/e28614bd3f7f44fc686a28d14063e5b8.jpg')] bg-cover bg-center text-gray-200 p-8 font-sans">
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-all duration-300 shadow-md font-bold"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#f4e4bc]">My Realms of Code Mastery</h2>
        <p className="text-[#80deea]">Continue your epic quests in coding</p>
      </div>

      {myCourses.length === 0 ? (
        <div className="text-center text-[#f4e4bc]">
          <p className="text-xl">No courses enrolled yet!</p>
          <p className="text-[#80deea]">Explore courses to begin your journey.</p>
          <Link
            to="/courses"
            className="mt-4 inline-block px-6 py-3 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-all duration-300 shadow-md font-bold"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {myCourses.map((course) => {
            const isPythonFundamentals = course.id === 'python-101';
            const isJavaCyber = course.id === 'java-mastery';
            const isCHorror = course.id === 'c-programming';

            let cardTheme = 'parchment-bg shadow-lg border-[#8b5e3c] hover:border-[#a67c00]';
            let glowTheme = 'bg-gradient-to-r from-[#8b5e3c]/20 to-[#a67c00]/20';
            let textTheme = 'text-[#3c2f2f]';
            let secondaryTextTheme = 'text-[#6b4e31]';
            let progressBg = 'bg-[#d3c092]';
            let progressFill = 'bg-gradient-to-r from-[#8b5e3c] to-[#a67c00]';
            let buttonTheme = 'bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc]';
            let disabledButtonTheme = 'bg-[#6b4e31]/50 text-[#f4e4bc]/50 cursor-not-allowed';
            let chapterBgUnlocked = 'bg-[#f4e4bc]/80 border border-[#8b5e3c]';
            let chapterBgLocked = 'bg-[#d3c092]/50';
            let borderTheme = 'border-[#8b5e3c]';
            let iconColor = 'text-[#8b5e3c]';

            if (isJavaCyber) {
              cardTheme = 'bg-[#0d1b2a]/90 border-[#00d4ff]/30 hover:border-[#00d4ff]/50 shadow-[0_0_15px_rgba(0,212,255,0.2)]';
              glowTheme = 'bg-gradient-to-r from-[#00d4ff]/20 to-[#ff00ff]/20';
              textTheme = 'text-[#e0f7ff]';
              secondaryTextTheme = 'text-[#80deea]';
              progressBg = 'bg-[#1e3d59]';
              progressFill = 'bg-gradient-to-r from-[#00d4ff] to-[#ff00ff]';
              buttonTheme = 'bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a]';
              disabledButtonTheme = 'bg-[#1e3d59]/50 text-[#80deea]/50 cursor-not-allowed';
              chapterBgUnlocked = 'bg-[#00d4ff]/10 border border-[#00d4ff]/20';
              chapterBgLocked = 'bg-[#1e3d59]/50';
              borderTheme = 'border-[#00d4ff]/30';
              iconColor = 'text-[#00d4ff]';
            } else if (isCHorror) {
              cardTheme = 'horror-bg bg-[#1C2526]/90 border-[#468284]/30 hover:border-[#8B0000]/50 shadow-[0_0_15px_rgba(139,0,0,0.2)]';
              glowTheme = 'bg-gradient-to-r from-[#8B0000]/20 to-[#468284]/20';
              textTheme = 'text-[#F5F6F5]';
              secondaryTextTheme = 'text-[#468284]';
              progressBg = 'bg-[#2E2E2E]';
              progressFill = 'bg-gradient-to-r from-[#8B0000] to-[#468284]';
              buttonTheme = 'bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5]';
              disabledButtonTheme = 'bg-[#468284]/50 text-[#F5F6F5]/50 cursor-not-allowed';
              chapterBgUnlocked = 'bg-[#468284]/10 border border-[#468284]/20';
              chapterBgLocked = 'bg-[#2E2E2E]/50';
              borderTheme = 'border-[#468284]/30';
              iconColor = 'text-[#8B0000]';
            }

            return (
              <div key={course.id} className="group relative h-[600px]">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 ${glowTheme} rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10`}
                />
                {/* Course Card */}
                <div
                  className={`relative rounded-xl border overflow-hidden transition-all duration-300 h-full flex flex-col ${cardTheme} z-20`}
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          isPythonFundamentals
                            ? 'bg-[#6b4e31]/20 text-[#f4e4bc]'
                            : course.level === 'Beginner'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {course.level}
                      </span>
                      <div className={`flex items-center gap-2 text-sm ${secondaryTextTheme}`}>
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${textTheme}`}>{course.title}</h3>
                    <p className={`text-sm mb-4 ${secondaryTextTheme}`}>{course.description}</p>

                    <div className="mb-4">
                      <div className={`flex justify-between text-sm mb-1 ${secondaryTextTheme}`}>
                        <span>
                          {isPythonFundamentals
                            ? 'Journey Progress'
                            : isJavaCyber
                            ? 'Race Progress'
                            : 'Survival Progress'}
                        </span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className={`h-2 ${progressBg} rounded-full overflow-hidden`}>
                        <div
                          className={`h-full ${progressFill} rounded-full transition-all duration-500`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {course.chapters.map((chapter) => (
                        <div
                          key={chapter.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            chapter.unlocked ? chapterBgUnlocked : chapterBgLocked
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isJavaCyber ? (
                              <Zap className={`w-4 h-4 ${iconColor}`} />
                            ) : isCHorror ? (
                              <Skull className={`w-4 h-4 ${iconColor}`} />
                            ) : (
                              <BookOpen className={`w-4 h-4 ${iconColor}`} />
                            )}
                            <div>
                              <p className={`text-sm font-medium ${textTheme}`}>{chapter.title}</p>
                              <p className={`text-xs ${secondaryTextTheme}`}>
                                {chapter.completed}/{chapter.lessons}{' '}
                                {isPythonFundamentals
                                  ? 'trials'
                                  : isJavaCyber
                                  ? 'laps'
                                  : 'echoes'}
                              </p>
                            </div>
                          </div>
                          {chapter.unlocked ? (
                            <Trophy
                              className={`w-4 h-4 ${
                                chapter.completed === chapter.lessons
                                  ? isPythonFundamentals
                                    ? 'text-[#a67c00]'
                                    : isJavaCyber
                                    ? 'text-[#00d4ff]'
                                    : 'text-[#8B0000]'
                                  : isPythonFundamentals
                                  ? 'text-[#6b4e31]'
                                  : isJavaCyber
                                  ? 'text-[#80deea]'
                                  : 'text-[#468284]'
                              }`}
                            />
                          ) : (
                            <div className={`w-4 h-4 ${secondaryTextTheme}`}>🔒</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-6 border-t ${borderTheme}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star
                          className={`w-5 h-5 ${
                            isPythonFundamentals
                              ? 'text-[#a67c00]'
                              : isJavaCyber
                              ? 'text-[#00d4ff]'
                              : 'text-[#8B0000]'
                          }`}
                        />
                        <span className={textTheme}>
                          {course.xp}{' '}
                          {isPythonFundamentals ? 'Valor' : isJavaCyber ? 'Speed' : 'Dread'}
                        </span>
                      </div>
                      {course.path ? (
                        <Link
                          to={course.path}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-md ${buttonTheme} font-bold glow-hover`}
                        >
                          {isPythonFundamentals
                            ? 'Continue Quest'
                            : isJavaCyber
                            ? 'Resume Race'
                            : 'Re-enter Mausoleum'}
                        </Link>
                      ) : (
                        <button
                          className={`px-4 py-2 rounded-lg ${disabledButtonTheme} font-bold`}
                          disabled
                        >
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>
        {`
          .parchment-bg {
            background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png');
            background-color: #f4e4bc;
            color: #3c2f2f;
            border: 2px solid #8b5e3c;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
          }
          .horror-bg {
            background-image: url('https://www.transparenttextures.com/patterns/dark-mosaic.png');
            background-size: 100px 100px;
          }
          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px rgba(139, 0, 0, 0.4); }
            50% { box-shadow: 0 0 15px rgba(139, 0, 0, 0.8); }
            100% { box-shadow: 0 0 5px rgba(139, 0, 0, 0.4); }
          }
          .glow-hover:hover {
            animation: glowPulse 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default MyCourses;
