import styled from 'styled-components';

const VolumeMeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0.4rem auto;
  margin-top: 0.6rem;
  width: 100%;
  transform: rotate(180deg);
`;

const VolumeMeterBlock = styled.div`
  height: 100%;
  width: 20px;
  border-radius: 1rem;
  margin-bottom: 0.2rem;
  /* background-color: var(--dark-grey); */
  background-color: ${(props) => props.fillColor};
`;

function VolumeMeter({ bars, fillColor }) {
  return (
    <VolumeMeterContainer>
      {[...Array(15)].map((_, index) => (
        <VolumeMeterBlock
          fillColor={index <= bars - 1 ? fillColor : 'var(--dark-grey)'}
          key={index}
        />
      ))}
    </VolumeMeterContainer>
  );
}

export default VolumeMeter;
