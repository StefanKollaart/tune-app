import styled from 'styled-components';
import PlayerBar from './PlayerBar';
import PlayerMeta from './PlayerMeta';
import { usePlayer } from './usePlayer';

const PlayerContainer = styled.div`
  margin: 0;
  border: 1px solid var(--border-color);
  background: ${(props) => props.background};
`;

export default function PlayerInner() {
  const player = usePlayer();
  const { bgColorFromArtwork } = player;

  return (
    <PlayerContainer background={bgColorFromArtwork}>
      <PlayerMeta />
      <PlayerBar />
    </PlayerContainer>
  );
}
