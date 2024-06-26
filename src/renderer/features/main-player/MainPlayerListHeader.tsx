import MainPlayerListItemContainer from './MainPlayerListItemContainer';
import Text from '../../ui/Text';

export default function MainPlayerListHeader() {
  return (
    <MainPlayerListItemContainer>
      <Text fontWeight={700} />
      <Text fontWeight={700}>Titel</Text>
      <Text fontWeight={700}>Artiest</Text>
      <Text fontWeight={700}>Duur</Text>
      <Text fontWeight={700}>Mixpunt</Text>
    </MainPlayerListItemContainer>
  );
}
