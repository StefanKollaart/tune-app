import styled from 'styled-components';
import MainPlayerListItemContainer from './MainPlayerListItemContainer';
import Text from '../../ui/Text';
import { getFormattedDuration } from '../../utils/audio';

const ArtworkPreview = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 0.2rem;
`

export default function MainPlayerListItem({ artwork, title, artist, duration, bgColor, fadeOutPoint }) {
  return (
    <MainPlayerListItemContainer bgColor={bgColor}>
      <ArtworkPreview src={artwork} />
      <Text>{title}</Text>
      <Text>{artist}</Text>
      <Text>{getFormattedDuration(duration)}</Text>
      <Text>
        {fadeOutPoint ? getFormattedDuration(fadeOutPoint) : 'N/A'}
      </Text>
    </MainPlayerListItemContainer>
  );
}
