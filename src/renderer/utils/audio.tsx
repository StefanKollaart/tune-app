export const getMetadataByFilePath = async (filePath) => {
  const metadataFromAudioFile =
    await window.audioMetadata.getAudioMetadataFromFile(filePath);

  const title =
    metadataFromAudioFile.title ??
    filePath.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');

  const metadata = { ...metadataFromAudioFile, title, id: uuidv4() };

  return metadata;
};

export const test = 'lol';
