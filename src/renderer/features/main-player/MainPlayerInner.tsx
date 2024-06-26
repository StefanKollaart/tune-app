import styled from "styled-components";
import Player from "../player/Player";
import MainPlayerList from "./MainPlayerList";
import MixEditor from "../mix-editor/MixEditor";
import { useMainPlayer } from "./useMainPlayer";

const MainPlayerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

export default function MainPlayerInner() {
  const { player1Data, player2Data } = useMainPlayer();

  if (!player1Data || !player2Data) {
    return null;
  }

  return (
    <MainPlayerContainer>
      <Player
        artist={player1Data.artist}
        title={player1Data.title}
        filePath={player1Data.filePath}
        artwork={player1Data.artwork}
        audio={player1Data.audio}
        identifierColor="var(--primary-color)"
        identifier="A"
      />
      <Player
        artist={player2Data.artist}
        title={player2Data.title}
        filePath={player2Data.filePath}
        artwork={player2Data.artwork}
        audio={player2Data.audio}
        identifierColor="var(--tertiary-color)"
        identifier="B"
      />
      <MainPlayerList />
      <MixEditor />
    </MainPlayerContainer>
  );
}
