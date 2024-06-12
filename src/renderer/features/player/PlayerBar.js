import styled from 'styled-components';
import { usePlayer } from './usePlayer';

const PlayerBarContainer = styled.div`
  width: 100%;
  height: 35px;
  background-color: var(--dark-grey);
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

const CurrentTimeBar = styled.div`
  position: absolute;
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: ${(props) => props.color};
`;

const PlayerTimeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`

const PlayerTime = styled.div``


export default function PlayerBar() {
  const player = usePlayer();
  const { currentTime, duration, identifierColor, seekTo } = player;

  const timeBarWidth = currentTime > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  const handleSeek = (event) => {
    const { clientX, currentTarget } = event;
    const parent = currentTarget.parentNode;
    const { left, width } = parent.getBoundingClientRect();
    const percentage = ((clientX - left) / width) * 100;
    seekTo(percentage);
  };

  return (
    <PlayerBarContainer onClick={handleSeek}>
      <CurrentTimeBar width={timeBarWidth} color={identifierColor} />
      <PlayerTimeContainer>
        <PlayerTime>{formatTime(currentTime)}</PlayerTime>
        <PlayerTime>{formatTime(duration)}</PlayerTime>
      </PlayerTimeContainer>
    </PlayerBarContainer>
  );
}
