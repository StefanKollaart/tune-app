import styled from 'styled-components';
import { PlayerProvider } from './usePlayer';
import PlayerInner from './PlayerInner';

export default function Player({ artist, title, filePath, artwork, audio, identifierColor, identifier }) {
  return (
    <PlayerProvider
      artist={artist}
      title={title}
      filePath={filePath}
      artwork={artwork}
      audio={audio}
      identifierColor={identifierColor}
      identifier={identifier}
    >
      <PlayerInner />
    </PlayerProvider>
  );
}
