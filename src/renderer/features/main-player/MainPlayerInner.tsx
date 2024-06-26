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
  const { playlist, player1Id, player2Id } = useMainPlayer();

  if (!player1Id || !player2Id) {
    return null;
  }

  const player1Data = playlist.find((item) => item.id === player1Id);
  const player2Data = playlist.find((item) => item.id === player2Id);

  return (
    <MainPlayerContainer>
      <Player
        artist={player1Data?.artist}
        title={player1Data?.title}
        filePath={player1Data?.filePath}
        artwork={player1Data?.artwork}
        audio={player1Data?.audio}
        identifierColor="var(--primary-color)"
        identifier="A"
      />
      <Player
        artist={player2Data?.artist}
        title={player2Data?.title}
        filePath={player2Data?.filePath}
        artwork={player2Data?.artwork}
        audio={player2Data?.audio}
        identifierColor="var(--tertiary-color)"
        identifier="B"
      />
      <MainPlayerList />
      <MixEditor />
    </MainPlayerContainer>
  );
}
