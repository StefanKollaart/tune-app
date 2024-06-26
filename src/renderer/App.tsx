import styled from 'styled-components';

import MainPlayer from './features/main-player/MainPlayer';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--bg-color);
  padding: 1rem;
  box-sizing: border-box;
`;

const AppLayout = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 70rem 1fr;
  grid-auto-rows: max-content;
`;

export default function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <AppLayout>
        <MainPlayer />
      </AppLayout>
    </AppContainer>
  );
}
