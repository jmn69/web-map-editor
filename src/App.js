import React, { useState } from 'react';

import {
  Container,
  AppContainer,
  MapContainer,
  HexagoneWrapper,
  Hexagone,
  ContentWrapper,
  EditorContainer,
  MapInnerContainer,
} from './App.s';
import Editor from './Editor';

const VERTICAL_SPACE = 50;
const HORIZONTAL_SPACE = 30;
const WIDTH = 60;

export default () => {
  const [isHoverCell, setIsHoverCell] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  const hexes = [];

  let lastHorizontalSpace = 0;
  for (let row = 0; row < 17; row++) {
    let lastVerticalSpace = 20;
    for (let column = 0; column < 21; column++) {
      hexes.push(
        <HexagoneWrapper
          onClick={() => setSelectedCell(`${column}-${row}`)}
          key={`${column}-${row}`}
          bottom={lastVerticalSpace}
          left={lastHorizontalSpace + (column % 2 === 0 ? 0 : HORIZONTAL_SPACE)}
        >
          <Hexagone isHover={isHoverCell === `${column}-${row}`} />
        </HexagoneWrapper>
      );
      hexes.push(
        <ContentWrapper
          onClick={() => setSelectedCell(`${column}-${row}`)}
          onMouseEnter={() => setIsHoverCell(`${column}-${row}`)}
          onMouseLeave={() => setIsHoverCell(null)}
          key={`${column}-${row}-content`}
          bottom={lastVerticalSpace + 25}
          left={lastHorizontalSpace + (column % 2 === 0 ? 0 : HORIZONTAL_SPACE)}
        >{`${column}-${row}`}</ContentWrapper>
      );
      lastVerticalSpace += VERTICAL_SPACE;
    }
    lastHorizontalSpace += WIDTH;
  }

  return (
    <Container>
      <AppContainer>
        <EditorContainer>
          <Editor selectedCell={selectedCell} />
        </EditorContainer>
        <MapContainer>
          <MapInnerContainer>{hexes}</MapInnerContainer>
        </MapContainer>
      </AppContainer>
    </Container>
  );
};
