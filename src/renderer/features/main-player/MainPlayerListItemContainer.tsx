import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: 60px 2fr 1.5fr 50px 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: ${(props) => props.bgColor};
  border-radius: var(--border-radius);
  margin-bottom: 0.5rem;
`;