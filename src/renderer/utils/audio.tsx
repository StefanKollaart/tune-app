export const getMetadataByFilePath = async (filePath) => {
  const metadataFromAudioFile =
    await window.audioMetadata.getAudioMetadataFromFile(filePath);

  const title =
    metadataFromAudioFile.title ??
    filePath.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');

  const metadata = { ...metadataFromAudioFile, title, id: uuidv4() };

  return metadata;
};

export const getFormattedDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

// Audio analysing
export const createAudioContext = (audio) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  return { audioContext, analyser };
};

export const getVolume = (analyser) => {
  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);

  const volume = frequencyData.reduce((a, b) => a + b) / frequencyData.length;

  return Math.floor(volume / 10);
};

export const findFadeOutPoint = (filePath) => {
  return new Promise((resolve, reject) => {
    const audioElement = new Audio(`file://${filePath}`);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audioElement);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);

    audioElement.play();

    audioElement.addEventListener("loadeddata", () => {
      audioElement.currentTime = audioElement.duration - 10;
    });

    audioElement.addEventListener("error", (e) => {
      reject(e); // Reject the promise on audio loading error
    });

    let beneathThresholdCounter = 0; // Counter for volume beneath 7
    let lastUpdateTime = 0; // Initialize outside the event listener

    audioElement.addEventListener('timeupdate', () => {
      const currentTime = Date.now(); // Get current timestamp
      const timeDifference = currentTime - lastUpdateTime; // Calculate difference
      lastUpdateTime = currentTime; // Update lastUpdateTime for the next event

      const volume = getVolume(analyser);
      if (volume < 5) {
        beneathThresholdCounter += 1;
        if (beneathThresholdCounter >= 5) {
          audioElement.pause();
          const currentTimeMinusUpdateCounter = audioElement.currentTime - (beneathThresholdCounter * (timeDifference / 1000));
          resolve(currentTimeMinusUpdateCounter); // Resolve the promise with the current time
        }
      } else {
        beneathThresholdCounter = 0; // Reset counter if volume goes above 7
      }
    });
  });
}