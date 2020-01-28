import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
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

const fieldTypes = {
  '0': '#00D41B',
  '1': '#FFF6A0',
  '2': '#1C9EFF',
  null: 'white',
  undefined: 'white',
};

export const HexagoneStyled = styled.div`
  position: relative;
  width: 60px;
  height: 34.64px;
  margin: 17.32px 0;
  border-left: solid 1px ${props => props.theme.colors.black};
  border-right: solid 1px ${props => props.theme.colors.black};
  cursor: pointer;
  z-index: 1;

  background-color: ${props =>
    props.isSelected ? 'rgb(255, 86, 19)' : fieldTypes[props.fieldType]};
  opacity: ${props => (props.isSelected ? '0.4' : '1')};

  &:hover {
    border-left: solid 1px ${props => props.theme.colors.accent};
    border-right: solid 1px ${props => props.theme.colors.accent};
    z-index: 9999;
    background-color: rgb(255, 86, 19);
    opacity: 0.4;
  }

  &:hover:before {
    border-top: solid 1.4142px ${props => props.theme.colors.accent};
    border-right: solid 1.4142px ${props => props.theme.colors.accent};
  }

  &:hover:after {
    border-bottom: solid 1.4142px ${props => props.theme.colors.accent};
    border-left: solid 1.4142px ${props => props.theme.colors.accent};
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

export const HexaTopLeft = styled.div`
  height: 11.3134px;
  width: 43px;
  z-index: 30000;
  background: ${props => (props.isEnabled ? '#616161' : 'none')};
  position: absolute;
  top: -11px;
  left: -3px;
  transform: scaleY(0.5774) rotate(-45deg);

  &:hover {
    background: rgba(97, 97, 97, 1);
  }
`;

export const HexaTopRight = styled.div`
  height: 11.3134px;
  width: 43px;
  z-index: 30000;
  background: ${props => (props.isEnabled ? '#616161' : 'none')};
  position: absolute;
  top: -11px;
  right: -3px;
  transform: scaleY(0.5774) rotate(45deg);

  &:hover {
    background: rgba(97, 97, 97, 1);
  }
`;

export const HexaBottomRight = styled.div`
  height: 11.3134px;
  width: 43px;
  z-index: 30000;
  background: ${props => (props.isEnabled ? '#616161' : 'none')};
  position: absolute;
  bottom: -11.5px;
  right: -3px;
  transform: scaleY(0.5774) rotate(-45deg);

  &:hover {
    background: rgba(97, 97, 97, 1);
  }
`;

export const HexaBottomLeft = styled.div`
  height: 11.3134px;
  width: 43px;
  z-index: 30000;
  background: ${props => (props.isEnabled ? '#616161' : 'none')};
  position: absolute;
  bottom: -11.5px;
  left: -3px;
  transform: scaleY(0.5774) rotate(45deg);

  &:hover {
    background: rgba(97, 97, 97, 1);
  }
`;

export const HexaRight = styled.div`
  height: 35px;
  width: 8px;
  z-index: 30000;
  background: ${props => (props.isEnabled ? '#616161' : 'none')};
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    background: rgba(97, 97, 97, 1);
  }
`;

export const HexaLeft = styled.div`
  height: 35px;
  width: 8px;
  z-index: 30000;
  background: ${props => (props.isEnabled ? '#616161' : 'none')};
  position: absolute;
  top: 0;
  left: 0;

  &:hover {
    background: rgba(97, 97, 97, 1);
  }
`;
