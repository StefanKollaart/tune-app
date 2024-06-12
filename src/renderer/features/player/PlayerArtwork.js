import styled from 'styled-components';
import { usePlayer } from './usePlayer';

const Artwork = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// component PlayerArtwork that gets send a src as a base64 string
export default function PlayerArtwork() {
  const { metadata } = usePlayer();

  if (metadata === null) return null;

  return <Artwork src={metadata.artwork} />;
}
