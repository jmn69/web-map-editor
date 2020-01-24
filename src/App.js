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
const HORIZONTAL_SPACE = 40;
const WIDTH = 60;
const initialMap = { cells: [] };

export default () => {
  const [map, setMap] = useState(initialMap);
  const [selectedCell, setSelectedCell] = useState(null);

  const hexes = [];

  let lastHorizontalSpace = 0;
  for (let row = 0; row < 17; row++) {
    let lastVerticalSpace = 20;
    for (let column = 0; column < 21; column++) {
      const foundCellInMap = map.cells.find(
        cell => cell.column === column && cell.row === row
      );
      hexes.push(
        <HexagoneWrapper
          onClick={() => setSelectedCell({ column, row })}
          key={`${column}-${row}`}
          bottom={lastVerticalSpace}
          left={
            lastHorizontalSpace + (column % 2 === 0 ? 10 : HORIZONTAL_SPACE)
          }
        >
          <Hexagone fieldType={foundCellInMap && foundCellInMap.fieldType} />
        </HexagoneWrapper>
      );
      hexes.push(
        <ContentWrapper
          onClick={() => setSelectedCell({ column, row })}
          key={`${column}-${row}-content`}
          bottom={lastVerticalSpace + 25}
          left={
            lastHorizontalSpace + (column % 2 === 0 ? 10 : HORIZONTAL_SPACE)
          }
        >
          {`${column}-${row}`}
        </ContentWrapper>
      );
      lastVerticalSpace += VERTICAL_SPACE;
    }
    lastHorizontalSpace += WIDTH;
  }

  return (
    <Container>
      <AppContainer>
        <EditorContainer>
          <Editor
            map={map}
            onMapChange={map => setMap(map)}
            selectedCell={selectedCell}
          />
        </EditorContainer>
        <MapContainer>
          <MapInnerContainer>{hexes}</MapInnerContainer>
        </MapContainer>
      </AppContainer>
    </Container>
  );
};
