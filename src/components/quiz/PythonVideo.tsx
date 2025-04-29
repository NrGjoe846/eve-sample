import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Scroll, PauseCircle, Maximize2, CheckCircle, Map as MapIcon } from 'lucide-react'; // Renamed Map to MapIcon

// Import local video files from src/assets/videos/
import installingPythonVideo from '../../assets/videos/installing-python.mp4';
import settingUpIdeVideo from '../../assets/videos/setting-up-ide.mp4';

interface PythonVideoProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  moduleTitle: string;
}

const videoUrlMap: Record<string, string> = {
  "Installing Python (Anaconda, PyCharm, or basic Python)": installingPythonVideo,
  "Setting up the IDE": settingUpIdeVideo,
  "default": "https://www.w3schools.com/html/mov_bbb.mp4" // Fallback placeholder
};

const PythonVideo: React.FC<PythonVideoProps> = ({ isOpen, onClose, onComplete, moduleTitle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoUrl = videoUrlMap[moduleTitle] || videoUrlMap["default"];

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
          console.error("Error playing video:", err);
          setError("The scroll of knowledge refuses to unfurl. Check its placement in the realm's archives.");
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
          console.error("Error enabling fullscreen:", err);
          setError("The realm’s viewport cannot expand.");
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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        className="relative w-full max-w-4xl bg-[#f4e4bc] rounded-2xl shadow-2xl p-6 m-4 max-h-[90vh] overflow-y-auto border-2 border-[#8b5e3c] font-serif"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }}
      >
        <motion.button
          onClick={handleClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 p-2 hover:bg-[#8b5e3c]/20 rounded-lg transition-all text-[#8b5e3c]"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#3c2f2f]">{moduleTitle} Chronicle</h2>
          <p className="text-sm text-[#6b4e31]">Unfurl the scroll to gain ancient coding wisdom!</p>
          {error && <p className="text-sm text-[#a67c00] italic">{error}</p>}
        </div>

        <div className="relative w-full" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full rounded-lg border border-[#8b5e3c] shadow-inner"
            src={videoUrl}
            controls={false}
            onEnded={handleVideoEnd}
            onError={(e) => {
              console.error("Video error:", e);
              setError("The chronicle cannot be read. Ensure it rests in the realm’s vaults.");
            }}
          >
            Your tome does not support the ancient visions.
          </video>
        </div>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <motion.button
            onClick={handlePlay}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPlaying || videoEnded || error !== null}
          >
            <Scroll className="w-5 h-5" />
            Unfurl Scroll
          </motion.button>
          <motion.button
            onClick={handlePause}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isPlaying || error !== null}
          >
            <PauseCircle className="w-5 h-5" />
            Pause Tale
          </motion.button>
          <motion.button
            onClick={handleFullscreen}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={error !== null}
          >
            <Maximize2 className="w-5 h-5" />
            Expand Vision
          </motion.button>
          {videoEnded && (
            <motion.button
              onClick={handleMarkComplete}
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-2 bg-[#6b4e31] hover:bg-[#8b5e3c] text-[#f4e4bc] rounded-lg flex items-center gap-2 shadow-md"
            >
              <CheckCircle className="w-5 h-5" />
              Mark Conquered
            </motion.button>
          )}
          <motion.button
            onClick={handleClose}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 bg-[#6b4e31] hover:bg-[#8b5e3c] text-[#f4e4bc] rounded-lg flex items-center gap-2 shadow-md"
          >
            <MapIcon className="w-5 h-5" /> {/* Changed Map to MapIcon */}
            Return to Realm
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PythonVideo;
