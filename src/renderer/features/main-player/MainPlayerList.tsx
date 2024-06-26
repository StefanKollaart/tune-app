import styled from 'styled-components';
import MainPlayerListHeader from './MainPlayerListHeader';
import MainPlayerListItem from './MainPlayerListItem';
import { useMainPlayer } from './useMainPlayer';

const MainPlayerListContainer = styled.div`
  grid-column: span 2;
  background: var(--dark-grey);
  padding: 1rem;
  border-radius: var(--border-radius);
`;

function MainPlayerList() {
  const { playlist } = useMainPlayer();

  return (
    <MainPlayerListContainer>
      <MainPlayerListHeader />
      {playlist.map((item) => (
        <MainPlayerListItem 
          artwork={item.artwork}
          title={item.title} 
          artist={item.artist} 
          duration={item.duration} 
        />
      ))}
    </MainPlayerListContainer>
  );
}

export default MainPlayerList;
