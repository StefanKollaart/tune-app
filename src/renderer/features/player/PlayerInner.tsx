import styled from 'styled-components';
import PlayerBar from './PlayerBar';
import PlayerMeta from './PlayerMeta';
import { usePlayer } from './usePlayer';
import { getAverageColor, getDominantColors } from '../../utils/image';
import { useEffect, useState } from 'react';

const PlayerContainer = styled.div`
  margin: 0;
  border: 1px solid var(--border-color);
  padding: 15px 20px;
  background-image: ${(props) => props.background};
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border-radius: var(--border-radius);
`;

export default function PlayerInner() {
  const [background, setBackground] = useState('');

  const player = usePlayer();
  const { artwork } = player;

  const fetchDominantColors = async () => {
    const dominantColors = await getDominantColors(artwork);
    setBackground(`linear-gradient(to bottom, rgba(${dominantColors[1]}, 0.5), rgba(${dominantColors[1]}, 0.7))`);
  };

  useEffect(() => {
    if (artwork) fetchDominantColors();
  }, [artwork])

  return (
    <PlayerContainer background={background}>
      <PlayerMeta />
      <PlayerBar />
    </PlayerContainer>
  );
}
