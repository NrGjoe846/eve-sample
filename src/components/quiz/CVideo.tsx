import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, PlayCircle, PauseCircle, Maximize2, CheckCircle, Flame } from 'lucide-react';
import whatIsCVideo from '../../assets/videos/what-is-c.mp4';
import settingUpCEnvironmentVideo from '../../assets/videos/setting-up-c-environment.mp4';

interface CVideoProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  moduleTitle: string;
}

const videoUrlMap: Record<string, string> = {
  "What is C?": whatIsCVideo,
  "Setting up the C Environment (GCC, Code::Blocks, VS Code)": settingUpCEnvironmentVideo,
  "default": "https://www.w3schools.com/html/mov_bbb.mp4"
};

const CVideo: React.FC<CVideoProps> = ({ isOpen, onClose, onComplete, moduleTitle }) => {
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
        className="relative w-full max-w-4xl horror-bg bg-[#1C2526] rounded-2xl shadow-2xl p-6 m-4 max-h-[90vh] overflow-y-auto border-2 border-[#468284]/30 shadow-[0_0_15px_rgba(139,0,0,0.2)] font-sans"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#8B0000]/20 rounded-lg transition-all text-[#8B0000]"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#F5F6F5]">{moduleTitle} Vision</h2>
          <p className="text-sm text-[#468284]">Gaze into the abyss to learn its secrets!</p>
          {error && <p className="text-sm text-[#8B0000]">{error}</p>}
        </div>

        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full rounded-lg border border-[#468284]/20"
            src={videoUrl}
            controls={false}
            onEnded={handleVideoEnd}
            onError={(e: any) => {
              console.error("Video load error:", e.nativeEvent);
              setError(`Failed to load video: ${e.nativeEvent.message}. Verify src/assets/videos/${moduleTitle === "What is C?" ? "what-is-c.mp4" : "setting-up-c-environment.mp4"} exists.`);
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            onClick={handlePlay}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover disabled:opacity-50"
            disabled={isPlaying || videoEnded || error !== null}
          >
            <PlayCircle className="w-5 h-5" />
            Awaken Vision
          </motion.button>
          <motion.button
            onClick={handlePause}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover disabled:opacity-50"
            disabled={!isPlaying || error !== null}
          >
            <PauseCircle className="w-5 h-5" />
            Silence Spirit
          </motion.button>
          <motion.button
            onClick={handleFullscreen}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover disabled:opacity-50"
            disabled={error !== null}
          >
            <Maximize2 className="w-5 h-5" />
            Full Haunt
          </motion.button>
          {videoEnded && (
            <motion.button
              onClick={handleMarkComplete}
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(70, 130, 132, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#468284] hover:bg-[#5A9A9C] text-[#F5F6F5] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover"
            >
              <CheckCircle className="w-5 h-5" />
              Seal Fate
            </motion.button>
          )}
          <motion.button
            onClick={handleClose}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover"
          >
            <X className="w-5 h-5" />
            Flee
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CVideo;
