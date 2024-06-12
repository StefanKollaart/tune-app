import styled from 'styled-components';
import PlayerBar from './PlayerBar';
import PlayerMeta from './PlayerMeta';
import { usePlayer } from './usePlayer';

const PlayerContainer = styled.div`
  margin: 0;
  border: 1px solid var(--border-color);
  padding: 10px;
  background-image: ${(props) => props.background};
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border-radius: 10px;
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
