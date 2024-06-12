import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { getAverageColor, getContrastColor } from '../../utils/image';

const PlayerContext = createContext(undefined);

function PlayerProvider({ filePath, identifierColor, identifier, children }) {
  // Audio state
  const [audio, setAudio] = useState(null);

  // Metadata state
  const [metadata, setMetadata] = useState(null);

  // Colors
  const [bgColorFromArtwork, setBgColorFromArtwork] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  // Play state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeBars, setVolumeBars] = useState(0);

  // External Functions
  const play = () => {
    audio.play();
  };

  const seekTo = (percentage) => {
    const time = (percentage / 100) * duration;
    audio.currentTime = time;
  };

  // Internal functions
  const fetchMetadata = async () => {
    const metadataFromFilesystem = await window.API.fetchMetadata(filePath);
    const playerFromFilesystem = new Audio(`file://${filePath}`);
    const averageColor = getAverageColor(metadataFromFilesystem.artwork);
    setBgColorFromArtwork(
      `rgb(${averageColor.r}, ${averageColor.g}, ${averageColor.b})`,
    );
    setTextColor(getContrastColor(averageColor));
    setAudio(playerFromFilesystem);
    setMetadata(metadataFromFilesystem);
  };

  // Effects
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

  useEffect(() => {
    fetchMetadata();
  }, [filePath]);

  // Value & provider
  const value = useMemo(() => {
    return {
      audio,
      metadata,
      currentTime,
      duration,
      identifierColor,
      identifier,
      bgColorFromArtwork,
      volumeBars,
      play,
      seekTo,
      setAudio,
    };
  }, [audio, metadata, currentTime]);

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
