import styled from 'styled-components';
import { usePlayer } from './usePlayer';

const ArtworkContainer = styled.div`
  aspect-ratio: 1/1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Artwork = styled.img`
  width: ${(props) => (props.isPlaying ? '100%' : '90%')};
  height: ${(props) => (props.isPlaying ? '100%' : '90%')};
  transition: width 0.4s, height 0.4s;
  object-fit: cover;
  aspect-ratio: 1/1;
  border-radius: 5px;
`;

// component PlayerArtwork that gets send a src as a base64 string
export default function PlayerArtwork() {
  const { metadata, isPlaying } = usePlayer();

  if (metadata === null) return null;

  return (
    <ArtworkContainer>
      <Artwork isPlaying={isPlaying} src={metadata.artwork} />
    </ArtworkContainer>
  );
}
