import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { getAverageColor, getContrastColor, getDominantColors } from '../../utils/image';

const PlayerContext = createContext(undefined);

function PlayerProvider({ artist, title, filePath, artwork, identifierColor, identifier, children }) {
  // Audio object
  const [audio, setAudio] = useState(null);

  // Play state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeBars, setVolumeBars] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // External Functions
  const play = () => {
    audio.play();
  };

  const pause = () => {
    audio.pause();
  }

  const seekTo = (percentage) => {
    const time = (percentage / 100) * duration;
    audio.currentTime = time;
  };

  // Effects
  useEffect(() => {
    const newAudio = new Audio(`file://${filePath}`);
    setAudio(newAudio);
  }, [filePath]);

  useEffect(() => {
    if (audio) {
      // Create and connect the AnalyserNode
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      const update = () => {
        setCurrentTime(audio.currentTime);
        setIsPlaying(!audio.paused);
        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencyData);

        const volume =
          frequencyData.reduce((a, b) => a + b) / frequencyData.length;
        setVolumeBars(Math.floor(volume / 8));

        // Call update again on the next frame
        requestAnimationFrame(update);
      };

      // Start the update loop
      update();

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        cancelAnimationFrame(update);
      };
    }
  }, [audio]);

  // Value & provider
  const value = useMemo(() => {
    return {
      audio,
      currentTime,
      duration,
      identifierColor,
      identifier,
      volumeBars,
      isPlaying,
      artwork,
      artist,
      title,
      play,
      pause,
      seekTo,
    };
  }, [title, artist, artwork, audio, currentTime]);

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined)
    throw new Error('PlayerContext was used outside of the PlayerProvider');
  return context;
}

export { PlayerProvider, usePlayer };
6