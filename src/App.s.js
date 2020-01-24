import styled, { css } from 'styled-components/macro';

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

export const HexagoneWrapper = styled.div`
  position: absolute;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
`;

const hexaMixin = css`
  content: '';
  position: absolute;
  z-index: 1;
  width: 42.43px;
  height: 42.43px;
  -webkit-transform: scaleY(0.5774) rotate(-45deg);
  -ms-transform: scaleY(0.5774) rotate(-45deg);
  transform: scaleY(0.5774) rotate(-45deg);
  background-color: inherit;
  left: 7.7868px;
`;

const selectBackgroundByFieldType = fieldType => {
  switch (fieldType) {
    case '0':
      return '#00D41B';
    case '1':
      return '#FFF6A0';
    case '2':
      return '#1C9EFF';
    default:
      return 'white';
  }
};

export const Hexagone = styled.div`
  position: relative;
  width: 60px;
  height: 34.64px;
  margin: 17.32px 0;
  border-left: solid 1px ${props => props.theme.colors.black};
  border-right: solid 1px ${props => props.theme.colors.black};
  cursor: pointer;
  z-index: 1;

  background-color: ${props => selectBackgroundByFieldType(props.fieldType)};

  &:hover {
    border-left: solid 1px ${props => props.theme.colors.primary};
    border-right: solid 1px ${props => props.theme.colors.primary};
    z-index: 9999;
    background-color: rgb(33, 150, 243);
    opacity: 0.3;
  }

  &:hover:before {
    border-top: solid 1.4142px ${props => props.theme.colors.primary};
    border-right: solid 1.4142px ${props => props.theme.colors.primary};
  }

  &:hover:after {
    border-bottom: solid 1.4142px ${props => props.theme.colors.primary};
    border-left: solid 1.4142px ${props => props.theme.colors.primary};
  }

  &:before {
    ${hexaMixin}

    top: -21.2132px;
    border-top: solid 1.4142px ${props => props.theme.colors.black};
    border-right: solid 1.4142px ${props => props.theme.colors.black};
  }

  &:after {
    ${hexaMixin}

    bottom: -21.2132px;
    border-bottom: solid 1.4142px ${props => props.theme.colors.black};
    border-left: solid 1.4142px ${props => props.theme.colors.black};
  }
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
