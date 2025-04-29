import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, PlayCircle, PauseCircle, Maximize2, CheckCircle, Zap } from 'lucide-react';
import installingJavaVideo from '../../assets/videos/installing-java-jdk-jre.mp4';
import settingUpJavaIdeVideo from '../../assets/videos/setting-up-java-ide.mp4';

interface JavaVideoProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  moduleTitle: string;
}

const videoUrlMap: Record<string, string> = {
  "Installing Java (JDK, JRE)": installingJavaVideo,
  "Setting up the IDE (IntelliJ IDEA, Eclipse, or VS Code)": settingUpJavaIdeVideo,
  "default": "https://www.w3schools.com/html/mov_bbb.mp4"
};

const JavaVideo: React.FC<JavaVideoProps> = ({ isOpen, onClose, onComplete, moduleTitle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoUrl = videoUrlMap[moduleTitle] || videoUrlMap["default"];
  console.log(`Loading video for "${moduleTitle}": ${videoUrl}`);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  if (!isOpen) return null;

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Play error:", err);
          setError(`Failed to play video: ${err.message}. Check src/assets/videos/ for ${moduleTitle}.`);
        });
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error("Fullscreen error:", err);
          setError("Fullscreen not supported.");
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setVideoEnded(false);
    setError(null);
    onClose();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoEnded(true);
  };

  const handleMarkComplete = () => {
    if (onComplete) {
      onComplete();
    }
    setVideoEnded(false);
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        className="relative w-full max-w-4xl bg-[#0d1b2a] rounded-2xl shadow-2xl p-6 m-4 max-h-[90vh] overflow-y-auto border-2 border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)] font-sans"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#00d4ff]/20 rounded-lg transition-all text-[#00d4ff]"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#e0f7ff]">{moduleTitle} Pit Stop</h2>
          <p className="text-sm text-[#80deea]">Boost your skills with this cyber training module!</p>
          {error && <p className="text-sm text-[#ff00ff]">{error}</p>}
        </div>

        <div className="relative w-full" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full rounded-lg border border-[#00d4ff]/20"
            src={videoUrl}
            controls={false}
            onEnded={handleVideoEnd}
            onError={(e: any) => {
              console.error("Video load error:", e.nativeEvent);
              setError(`Failed to load video: ${e.nativeEvent.message}. Verify src/assets/videos/${moduleTitle === "Installing Java (JDK, JRE)" ? "installing-java-jdk-jre.mp4" : "setting-up-java-ide.mp4"} exists.`);
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            onClick={handlePlay}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover disabled:opacity-50"
            disabled={isPlaying || videoEnded || error !== null}
          >
            <PlayCircle className="w-5 h-5" />
            Start Engine
          </motion.button>
          <motion.button
            onClick={handlePause}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover disabled:opacity-50"
            disabled={!isPlaying || error !== null}
          >
            <PauseCircle className="w-5 h-5" />
            Pit Stop
          </motion.button>
          <motion.button
            onClick={handleFullscreen}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover disabled:opacity-50"
            disabled={error !== null}
          >
            <Maximize2 className="w-5 h-5" />
            Full Grid
          </motion.button>
          {videoEnded && (
            <motion.button
              onClick={handleMarkComplete}
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255, 0, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#ff00ff] hover:bg-[#e600e6] text-[#0d1b2a] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover"
            >
              <CheckCircle className="w-5 h-5" />
              Finish Lap
            </motion.button>
          )}
          <motion.button
            onClick={handleClose}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover"
          >
            <X className="w-5 h-5" />
            Exit
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JavaVideo;
