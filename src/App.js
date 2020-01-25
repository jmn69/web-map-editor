import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer } from 'react-toastify';
import {
  faCircleNotch,
  faWater,
  faEraser,
  faSeedling,
  faUmbrellaBeach,
  faFileDownload,
  faFileUpload,
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

import {
  VERTICAL_SPACE,
  HORIZONTAL_SPACE,
  WIDTH,
  COLUMNS,
  ROWS,
} from 'common/constants';

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

library.add(
  faCircleNotch,
  faWater,
  faEraser,
  faSeedling,
  faUmbrellaBeach,
  faFileDownload,
  faFileUpload
);

const initialMap = { cells: [] };

const actionTofieldType = {
  O: null, // Eraser
  '1': '0', // Plain
  '2': '1', // Sand
  '3': '2', // Water
  null: null, // No action
};

const numberOfCells = COLUMNS * ROWS;

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

  const handleDownloadClick = () => {
    const jsonMap = JSON.stringify(map);
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      jsonMap
    )}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'map.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleUploadClick = event => {
    const map = JSON.parse(event.target.result);
    setMap(map);
  };

  const hexes = [];

  let lastHorizontalSpace = 0;
  for (let row = 0; row < ROWS; row++) {
    let lastVerticalSpace = 20;
    for (let column = 0; column < COLUMNS; column++) {
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
      <ToastContainer autoClose={8000} style={{ zIndex: 30000 }} />
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
                onDownloadClick={handleDownloadClick}
                onUploadClick={handleUploadClick}
                isDownloadEnabled={numberOfCells === map.cells.length}
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
