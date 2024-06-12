import styled from 'styled-components';
import Player from '../player/Player';
import MainPlayerList from './MainPlayerList';

const MainPlayerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

function MainPlayer() {
  return (
    <MainPlayerContainer>
      <Player
        filePath="/Users/stefankollaart/Temp/tune-music/Dua Lipa - These Walls.mp3"
        identifierColor="var(--primary-color)"
        identifier="A"
      />
      <Player
        filePath="/Users/stefankollaart/Temp/tune-music/VOILÀ, Chrissy Costanza, Against The Current - Caught It.mp3"
        identifierColor="var(--tertiary-color)"
        identifier="B"
      />
      <MainPlayerList />
    </MainPlayerContainer>
  );
}

export default MainPlayer;
