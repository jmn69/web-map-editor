import styled from 'styled-components';

export default styled.div`
  background: ${props => (props.bg ? props.bg : props.theme.colors.darkGray)};
  border-radius: 50%;
  height: 60px;
  padding: 2px;
  display: flex;
  color: ${props => (props.color ? props.color : props.theme.colors.white)};
  justify-content: center;
  align-items: center;
  width: 60px;
  font-size: ${props => props.theme.fontSizes.large};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  opacity: ${props => (props.isHover ? '1' : '0.7')};

  border: ${props =>
    props.isHover && !props.disableBorder
      ? `2px solid ${props.theme.colors.accentLight}`
      : 'none'};

  &:hover {
    border: 3px solid ${props => props.theme.colors.accentLight};
  }
`;
