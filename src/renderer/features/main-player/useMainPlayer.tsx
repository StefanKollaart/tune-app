import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { findFadeOutPoint } from '../../utils/audio';

const MainPlayerContext = createContext(undefined);

function MainPlayerProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);
  const [player1Id, setPlayer1Id] = useState(null);
  const [player2Id, setPlayer2Id] = useState(null);

  // Computed Properties
  const player1Data = playlist.find((item) => item.id === player1Id);
  const player2Data = playlist.find((item) => item.id === player2Id);

  // Functions
  const addItemToPlaylist = async (filePath) => {
    const metadataFromFilesystem = await window.API.fetchMetadata(filePath);
    const id = Math.random().toString(36).substring(7);

    const metaDataFromFilesystemWithIds = {
      ...metadataFromFilesystem,
      filePath,
      id: id,
    };

    findFadeOutPoint(filePath).then((fadeOutPoint) => {
      console.log('fadeOutPoint', fadeOutPoint);
      setPlaylist((prev) => {
        return prev.map((item) => {
          console.log(item.id, id);
          if (item.id === id) {
            console.log('found item');
            return {
              ...item,
              fadeOutPoint,
            };
          }

          return item;
        });
      })
    });

    setPlaylist((prev) => [...prev, metaDataFromFilesystemWithIds]);
  }

  const addItemsToPlaylist = async () => {
    const filePaths = [
      "/Users/stefankollaart/Temp/tune-music/Dua Lipa - These Walls.mp3",
      "/Users/stefankollaart/Temp/tune-music/VOILÀ, Chrissy Costanza, Against The Current - Caught It.mp3",
      "/Users/stefankollaart/Temp/tune-music/Zoë Tauran, Jonna Fraser - Stiekem ‘24.mp3",
      "/Users/stefankollaart/Temp/tune-music/TWRP, Montaigne, Tom Cardy - Online.mp3",
      "/Users/stefankollaart/Temp/tune-music/The Indien - How Many Nights.mp3",
    ];

    filePaths.forEach(itemFilePath => addItemToPlaylist(itemFilePath));
  };

  useEffect(() => {
    const newPlaylist = playlist.map((item) => {
      if (item.id === player1Id) {
        return {
          ...item,
          bgColor: "var(--primary-color)",
        };
      }

      if (item.id === player2Id) {
        return {
          ...item,
          bgColor: "var(--tertiary-color)",
        };
      }

      return item;
    });

    setPlaylist(newPlaylist);
  }, [player1Id, player2Id])

  useEffect(() => {
    addItemsToPlaylist();
  }, []);

  useEffect(() => {
    if (playlist.length > 0 && !player1Id) {
      setPlayer1Id(playlist[0]?.id);
    }

    if (playlist.length > 1 && !player2Id) {
      setPlayer2Id(playlist[1]?.id);
    }
  }, [playlist])

  // Value & provider
  const value = useMemo(() => {
    return {
      playlist,
      player1Data,
      player2Data
    };
  }, [playlist]);

  return (
    <MainPlayerContext.Provider value={value}>{children}</MainPlayerContext.Provider>
  );
}

function useMainPlayer() {
  const context = useContext(MainPlayerContext);
  if (context === undefined)
    throw new Error(
      'MainPlayerContext was used outside of the MainPlayerProvider',
    );
  return context;
}

export { MainPlayerProvider, useMainPlayer };