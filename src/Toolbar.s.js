import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  height: 80px;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  overflow: ${props => (props.hidden ? 'hidden' : 'unset')};
`;

export const CircleWrapper = styled.div`
  margin-right: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const FloatingMenuContainer = styled.div`
  display: flex;
  position: relative;
  width: 60px;
  margin-right: 20px;
`;
