import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10%;
  min-height: 1200px;
  position: relative;
`;

export const Card = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 4px;
  padding: 20px;

  @media (min-width: 2560px) {
    padding: 40px;
  }
`;

export const Title = styled.span`
  font-size: 48px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
  margin-top: 40px;
`;

export const CellNumber = styled.span`
  font-size: 24px;
  color: ${props => props.theme.colors.black};
`;

export const CellNumberContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  border-bottom-left-radius: 4px;
  padding: 5px 10px;
  min-width: 65px;
  display: flex;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const EmptyCellText = styled.span`
  font-size: 20px;
  color: ${props => props.theme.colors.black};
`;

export const Gutter = styled.div`
  margin-bottom: 118px;
`;

export const Label = styled.div`
  margin-bottom: 7px;
  font-size: ${props => props.theme.fontSizes.medium};
  text-transform: uppercase;
  font-weight: 600;
  line-height: 18px;
  color: ${props => props.theme.colors.black};
  opacity: ${props => (props.isDisabled ? 0.3 : 1)};
`;
