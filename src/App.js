import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleNotch,
  faWater,
  faEraser,
  faSeedling,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';

import { VERTICAL_SPACE, HORIZONTAL_SPACE, WIDTH } from 'common/constants';

import {
  Container,
  AppContainer,
  MapContainer,
  ContentWrapper,
  EditorContainer,
  MapInnerContainer,
  ToolbarWrapper,
} from './App.s';
import Editor from './Editor';
import Toolbar from './Toolbar';
import Hexagone from './Hexagone';

library.add(faCircleNotch, faWater, faEraser, faSeedling, faUmbrellaBeach);

const initialMap = { cells: [] };

const actionTofieldType = {
  O: null, // Eraser
  '1': '0', // Plain
  '2': '1', // Sand
  '3': '2', // Water
  null: null, // No action
};

export default () => {
  const [map, setMap] = useState(initialMap);
  const [selectedCell, setSelectedCell] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [isShiftHold, setIsShiftHold] = useState(false);

  useEffect(() => {
    document.addEventListener('keyup', event => {
      if (event.defaultPrevented) {
        return;
      }

      const key = event.key || event.keyCode;

      if (key === 'Shift' || key === 16) {
        setIsShiftHold(false);
      }
    });

    document.addEventListener('keydown', event => {
      if (event.defaultPrevented) {
        return;
      }

      const key = event.key || event.keyCode;

      if (key === 'Shift' || key === 16) {
        setIsShiftHold(true);
      }
    });
  }, []);

  const handleActionClick = action => {
    if (currentAction === action) {
      setCurrentAction(null);
    }
 else {
      setCurrentAction(action);
    }
  };

  const handleHexaMouseEnter = (column, row) => {
    if (currentAction !== null && currentAction !== undefined && isShiftHold) {
      const mapToUpdate = { ...map };
      const foundCell = mapToUpdate.cells.find(
        cell => cell.column === column && cell.row === row
      );
      const cellToUpdate = {
        ...foundCell,
        fieldType: actionTofieldType[currentAction],
        column,
        row,
      };

      if (foundCell) {
        mapToUpdate.cells = map.cells.filter(
          cell => cell.column !== column || cell.row !== row
        );
      }
      mapToUpdate.cells.push(cellToUpdate);
      setMap(mapToUpdate);
    }
  };

  const handleCellClick = (column, row) => {
    setSelectedCell({ column, row });
    if (currentAction !== null && currentAction !== undefined) {
      const mapToUpdate = { ...map };
      const foundCell = mapToUpdate.cells.find(
        cell => cell.column === column && cell.row === row
      );
      const cellToUpdate = {
        ...foundCell,
        fieldType: actionTofieldType[currentAction],
        column,
        row,
      };

      if (foundCell) {
        mapToUpdate.cells = map.cells.filter(
          cell => cell.column !== column || cell.row !== row
        );
      }
      mapToUpdate.cells.push(cellToUpdate);
      setMap(mapToUpdate);
    }
  };

  const hexes = [];

  let lastHorizontalSpace = 0;
  for (let row = 0; row < 17; row++) {
    let lastVerticalSpace = 20;
    for (let column = 0; column < 21; column++) {
      const foundCellInMap = map.cells.find(
        cell => cell.column === column && cell.row === row
      );
      hexes.push(
        <Hexagone
          column={column}
          onHexaMouseEnter={handleHexaMouseEnter}
          row={row}
          onCellClick={handleCellClick}
          key={`${column}-${row}`}
          lastVerticalSpace={lastVerticalSpace}
          lastHorizontalSpace={lastHorizontalSpace}
          foundCellInMap={foundCellInMap}
        />
      );
      hexes.push(
        <ContentWrapper
          onMouseEnter={() => handleHexaMouseEnter(column, row)}
          onClick={() => handleCellClick(column, row)}
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
          <MapInnerContainer>
            <ToolbarWrapper>
              <Toolbar
                onActionClick={handleActionClick}
                currentAction={currentAction}
              />
            </ToolbarWrapper>
            {hexes}
          </MapInnerContainer>
        </MapContainer>
      </AppContainer>
    </Container>
  );
};
