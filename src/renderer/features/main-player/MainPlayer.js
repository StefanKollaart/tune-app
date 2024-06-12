import styled from 'styled-components';
import Player from '../player/Player';
import MainPlayerList from './MainPlayerList';

const MainPlayerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

function MainPlayer() {
  return (
    <MainPlayerContainer>
      <Player
        filePath="/Users/stefankollaart/Temp/aura.mp3"
        identifierColor="var(--primary-color)"
        identifier="A"
      />
      <Player
        filePath="/Users/stefankollaart/Temp/darkskies.mp3"
        identifierColor="var(--tertiary-color)"
        identifier="B"
      />
      <MainPlayerList />
    </MainPlayerContainer>
  );
}

export default MainPlayer;
