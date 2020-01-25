import styled from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  height: 100vh;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: ${props => props.theme.fontSizes.medium};
`;

export const AppContainer = styled.div`
  min-height: min-content;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const MapContainer = styled.div`
  position: relative;
  flex: 2;
  background: ${props => props.theme.colors.lightGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1200px;
`;

export const MapInnerContainer = styled.div`
  position: relative;
  width: 1072px;
  height: 1200px;
`;

export const EditorContainer = styled.div`
  flex: 1;
  background: ${props => props.theme.colors.primary};
  min-height: 1200px;
  min-width: 350px;
`;

export const ContentWrapper = styled.div`
  position: absolute;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
  z-index: 1;
  text-align: center;
  width: 60px;
  cursor: pointer;
`;

export const ToolbarWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 20000;
  height: 80px;
  width: 100%;
`;
