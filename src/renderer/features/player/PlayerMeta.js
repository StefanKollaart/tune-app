import styled from 'styled-components';
import VolumeMeter from '../../ui/VolumeMeter';
import PlayerData from './PlayerData';
import PlayerArtwork from './PlayerArtwork';
import { usePlayer } from './usePlayer';

const PlayerMetaContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 0.5fr;
`;

const PlayerSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlayerIdentifier = styled.div`
  text-align: center;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  background-color: ${(props) => props.color};
`;

export default function PlayerMeta() {
  const { identifier, identifierColor, volumeBars } = usePlayer();

  return (
    <PlayerMetaContainer>
      <PlayerArtwork />
      <PlayerData />
      <PlayerSide>
        <PlayerIdentifier color={identifierColor}>
          {identifier}
        </PlayerIdentifier>
        <VolumeMeter bars={volumeBars} fillColor={identifierColor} />
      </PlayerSide>
    </PlayerMetaContainer>
  );
}
