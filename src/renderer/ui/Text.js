import styled, { css } from 'styled-components';

const Text = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
  color: ${(props) => (props.color ? props.color : 'var(--text-color)')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}rem` : '1rem')};
  margin-top: ${(props) =>
    props.marginTop ? `${props.marginTop}rem` : '0rem'};
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}rem` : '0rem'};
  margin-left: ${(props) =>
    props.marginLeft ? `${props.marginLeft}rem` : '0rem'};
  margin-right: ${(props) =>
    props.marginRight ? `${props.marginRight}rem` : '0rem'};
`;

export default Text;
