import styled from 'styled-components';
import MainPlayerListItemContainer from './MainPlayerListItemContainer';
import Text from '../../ui/Text';

const ArtworkPreview = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 0.2rem;
`

export default function MainPlayerListItem({ artwork, title, artist, duration }) {
  return (
    <MainPlayerListItemContainer>
      <ArtworkPreview src={artwork} />
      <Text>{title}</Text>
      <Text>{artist}</Text>
      <Text>{duration}</Text>
    </MainPlayerListItemContainer>
  );
}
