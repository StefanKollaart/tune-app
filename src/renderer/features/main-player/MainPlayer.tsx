import { MainPlayerProvider } from './useMainPlayer';
import MainPlayerInner from './MainPlayerInner';

export default function MainPlayer() {
  return (
    <MainPlayerProvider>
      <MainPlayerInner />
    </MainPlayerProvider>
  );
}
