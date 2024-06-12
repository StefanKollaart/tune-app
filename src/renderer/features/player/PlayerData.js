import styled from 'styled-components';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import Text from '../../ui/Text';
import { usePlayer } from './usePlayer';

const PlayerDataContainer = styled.div`
  padding: 1rem;
`;

const PlayerButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function PlayerData() {
  const player = usePlayer();
  const { metadata, audio } = player;

  const isPlaying = audio && !audio.paused;

  return (
    <PlayerDataContainer>
      <Text fontWeight={600} fontSize={1.4} marginBottom={0.5}>
        {(metadata && metadata.title) ?? 'Geen nummer'}
      </Text>
      <Text marginBottom={1}>{(metadata && metadata.artist) ?? ''}</Text>
      <PlayerButtons>
        {isPlaying && <FaPause />}
        {!isPlaying && <FaPlay onClick={player.play} />}
        <FaStop />
      </PlayerButtons>
    </PlayerDataContainer>
  );
}
