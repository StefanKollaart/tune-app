import styled from 'styled-components';
import { usePlayer } from './usePlayer';

const PlayerBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: var(--dark-grey);
`;

const CurrentTimeBar = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: ${(props) => props.color};
`;

export default function PlayerBar() {
  const player = usePlayer();
  const { currentTime, duration, identifierColor, seekTo } = player;

  const timeBarWidth = currentTime > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (event) => {
    const { clientX, target } = event;
    const { left, width } = target.getBoundingClientRect();
    const percentage = ((clientX - left) / width) * 100;
    seekTo(percentage);
  };

  return (
    <PlayerBarContainer onClick={handleSeek}>
      <CurrentTimeBar width={timeBarWidth} color={identifierColor} />
    </PlayerBarContainer>
  );
}
