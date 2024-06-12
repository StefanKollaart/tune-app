import styled from 'styled-components';
import { PlayerProvider } from './usePlayer';
import PlayerInner from './PlayerInner';

export default function Player({ filePath, identifierColor, identifier }) {
  return (
    <PlayerProvider
      filePath={filePath}
      identifierColor={identifierColor}
      identifier={identifier}
    >
      <PlayerInner />
    </PlayerProvider>
  );
}
