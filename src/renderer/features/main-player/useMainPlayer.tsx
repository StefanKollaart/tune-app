import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';

const MainPlayerContext = createContext(undefined);

function MainPlayerProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);
  const [player1Id, setPlayer1Id] = useState(null);
  const [player2Id, setPlayer2Id] = useState(null);

  const addItemToPlaylist = async (filePath) => {
    const metadataFromFilesystem = await window.API.fetchMetadata(filePath);

    const metaDataFromFilesystemWithIds = {
      ...metadataFromFilesystem,
      filePath,
      id: Math.random().toString(36).substring(7),
    };

    return metaDataFromFilesystemWithIds;
  }

  const addItemsToPlaylist = async () => {
    const filePaths = [
      "/Users/stefankollaart/Temp/tune-music/Zoë Tauran, Jonna Fraser - Stiekem ‘24.mp3",
      "/Users/stefankollaart/Temp/tune-music/VOILÀ, Chrissy Costanza, Against The Current - Caught It.mp3",
      "/Users/stefankollaart/Temp/tune-music/Dua Lipa - These Walls.mp3",
      "/Users/stefankollaart/Temp/tune-music/TWRP, Montaigne, Tom Cardy - Online.mp3",
      "/Users/stefankollaart/Temp/tune-music/The Indien - How Many Nights.mp3",
    ];

    const playlistItems = await Promise.all(filePaths.map(itemFilePath => addItemToPlaylist(itemFilePath)));

    // Set player1Id and player2Id based on the first two items in the playlist
    if (playlistItems.length > 0) {
      setPlayer1Id(playlistItems[0]?.id);
      if (playlistItems.length > 1) {
        setPlayer2Id(playlistItems[1]?.id);
      }
    }

    setPlaylist(playlistItems);
  };

  useEffect(() => {
    addItemsToPlaylist();
  }, []);

  // Value & provider
  const value = useMemo(() => {
    return {
      playlist,
      player1Id,
      player2Id
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