import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { getAverageColor, getContrastColor, getDominantColors } from '../../utils/image';
import { createAudioContext, findFadeOutPoint, getVolume } from '../../utils/audio';

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

    if (newAudio) {
      // Create and connect the AnalyserNode
      const {audioContext, analyser } = createAudioContext(newAudio);

      const handleLoadedMetadata = () => {
        setDuration(newAudio.duration);
      };

      newAudio.addEventListener('loadedmetadata', handleLoadedMetadata);

      const update = () => {
        setCurrentTime(newAudio.currentTime);
        setIsPlaying(!newAudio.paused);
        setVolumeBars(getVolume(analyser));

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
  }, [filePath]);

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