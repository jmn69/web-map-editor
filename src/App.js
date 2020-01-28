import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer } from 'react-toastify';
import {
  faCircleNotch,
  faWater,
  faEraser,
  faSeedling,
  faUmbrellaBeach,
  faFileDownload,
  faFileUpload,
  faPlus,
  faTimes,
  faUndoAlt,
  faSuperscript,
  faSuitcase,
  faWonSign,
  faBuilding,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

import {
  VERTICAL_SPACE,
  HORIZONTAL_SPACE,
  WIDTH,
  COLUMNS,
  ROWS,
  FieldObjectUnityEnum,
  FieldTypetUnityEnum,
  FieldStructureUnityEnum,
  ActionTypeEnum,
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
  faFileUpload,
  faPlus,
  faTimes,
  faUndoAlt,
  faSuperscript,
  faSuitcase,
  faWonSign,
  faBuilding,
  faEyeSlash
);

const initialMap = { cells: [] };

// map action enum to unity value
const actionToUnityValue = {
  '1': FieldTypetUnityEnum.plain.toString(),
  '2': FieldTypetUnityEnum.sand.toString(),
  '3': FieldTypetUnityEnum.water.toString(),
  '6': { id: FieldObjectUnityEnum.barbed.toString() },
  '7': { id: FieldObjectUnityEnum.sandbag.toString(), orientation: {} },
  '8': { id: FieldStructureUnityEnum.building.toString(), orientation: {} },
  '9': { id: FieldStructureUnityEnum.breakeableView.toString() },
  null: null, // No action
};

const unityFieldObjectIcon = {
  [FieldObjectUnityEnum.barbed]: (
    <FontAwesomeIcon size='2x' color='#100916' icon='won-sign' />
  ),
  [FieldObjectUnityEnum.sandbag]: (
    <FontAwesomeIcon size='2x' color='#100916' icon='suitcase' />
  ),
};

const unityStructureIcon = {
  [FieldStructureUnityEnum.building]: (
    <FontAwesomeIcon size='2x' color='#100916' icon='building' />
  ),
  [FieldStructureUnityEnum.breakeableView]: (
    <FontAwesomeIcon size='2x' color='#100916' icon='eye-slash' />
  ),
};

const numberOfCells = COLUMNS * ROWS;

export default () => {
  const [map, setMap] = useState(initialMap);
  const [selectedCell, setSelectedCell] = useState(null);
  const [currentFieldTypeAction, setCurrentFieldTypeAction] = useState(null);
  const [currentFieldObjectAction, setCurrentFieldObjectAction] = useState(
    null
  );
  const [currentStructureAction, setCurrentStructureAction] = useState(null);
  const [isShiftHold, setIsShiftHold] = useState(false);
  const [isEraserEnabled, setIsEraserEnabled] = useState(false);
  const [isCoordsEnabled, setIsCoordsEnabled] = useState(false);

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

      if (key === 'Escape' || key === 27) {
        setIsEraserEnabled(false);
        disableCurrentActions();
        setSelectedCell(null);
      }

      if (key === 'Shift' || key === 16) {
        setIsShiftHold(true);
      }
    });
  }, []);

  const handleOrientationClick = (
    column,
    row,
    updatedObject,
    propObjectName
  ) => {
    updateMapCell(column, row, [
      { propName: propObjectName, value: updatedObject },
    ]);
  };

  const handleActionClick = (action, actionType) => {
    setIsEraserEnabled(false);
    switch (actionType) {
      case ActionTypeEnum.fieldType:
        if (currentFieldTypeAction === action) {
          setCurrentFieldTypeAction(null);
        }
 else {
          setCurrentFieldTypeAction(action);
        }
        break;
      case ActionTypeEnum.fieldObject:
        setCurrentStructureAction(null);
        if (currentFieldObjectAction === action) {
          setCurrentFieldObjectAction(null);
        }
 else {
          setCurrentFieldObjectAction(action);
        }
        break;
      case ActionTypeEnum.structure:
        setCurrentFieldObjectAction(null);
        if (currentStructureAction === action) {
          setCurrentStructureAction(null);
        }
 else {
          setCurrentStructureAction(action);
        }
        break;
      default:
    }
  };

  const updateMapCell = (column, row, fieldsToUpdate) => {
    const mapToUpdate = { ...map };
    const foundCell = mapToUpdate.cells.find(
      cell => cell.column === column && cell.row === row
    );
    const cellToUpdate = {
      ...foundCell,
      column,
      row,
    };
    fieldsToUpdate.forEach(({ propName, value }) => {
      cellToUpdate[propName] = value;
    });

    if (foundCell) {
      mapToUpdate.cells = map.cells.filter(
        cell => cell.column !== column || cell.row !== row
      );
    }
    mapToUpdate.cells.push(cellToUpdate);
    setMap(mapToUpdate);
  };

  const prepareFieldsAndUpdateMap = (column, row) => {
    if (isEraserEnabled) {
      updateMapCell(column, row, [
        { propName: 'fieldType', value: null },
        { propName: 'fieldObject', value: null },
        { propName: 'structure', value: null },
      ]);
    }
 else {
      const fieldsToUpdate = [];
      if (currentFieldTypeAction) {
        fieldsToUpdate.push({
          propName: 'fieldType',
          value: actionToUnityValue[currentFieldTypeAction],
        });
      }
      if (currentFieldObjectAction) {
        fieldsToUpdate.push({
          propName: 'fieldObject',
          value: actionToUnityValue[currentFieldObjectAction],
        });
      }
      if (currentStructureAction) {
        fieldsToUpdate.push({
          propName: 'structure',
          value: actionToUnityValue[currentStructureAction],
        });
      }
      if (fieldsToUpdate.length > 0) {
        updateMapCell(column, row, fieldsToUpdate);
      }
    }
  };

  const handleHexaMouseEnter = (column, row) => {
    if (isShiftHold) {
      prepareFieldsAndUpdateMap(column, row);
    }
  };

  const handleCellClick = (column, row) => {
    setSelectedCell({ column, row });
    prepareFieldsAndUpdateMap(column, row);
  };

  const disableCurrentActions = () => {
    setCurrentFieldTypeAction(null);
    setCurrentFieldObjectAction(null);
    setCurrentStructureAction(null);
  };

  const handleEraserClick = () => {
    disableCurrentActions();
    setIsEraserEnabled(!isEraserEnabled);
  };

  const handleCoordsClick = () => {
    setIsCoordsEnabled(!isCoordsEnabled);
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

  const renderHexaContent = (column, row, foundCellInMap) => {
    if (isCoordsEnabled) {
      return `${column}-${row}`;
    }

    const { fieldObject, structure } = foundCellInMap;
    if (fieldObject) {
      return unityFieldObjectIcon[fieldObject.id];
    }

    if (structure) {
      return unityStructureIcon[structure.id];
    }
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
          onOrientationClick={handleOrientationClick}
          isSelected={
            selectedCell &&
            selectedCell.column === column &&
            selectedCell.row === row
          }
        />
      );
      if (
        isCoordsEnabled ||
        (foundCellInMap && foundCellInMap.fieldObject) ||
        (foundCellInMap && foundCellInMap.structure)
      ) {
        const calcBottom = isCoordsEnabled ? 25 : 22;
        hexes.push(
          <ContentWrapper
            onMouseEnter={() => handleHexaMouseEnter(column, row)}
            onClick={() => handleCellClick(column, row)}
            key={`${column}-${row}-content`}
            bottom={lastVerticalSpace + calcBottom}
            left={
              lastHorizontalSpace +
              (column % 2 === 0 ? 10 : HORIZONTAL_SPACE - 1)
            }
          >
            {renderHexaContent(column, row, foundCellInMap)}
          </ContentWrapper>
        );
      }
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
                isEraserEnabled={isEraserEnabled}
                onEraserClick={handleEraserClick}
                onDownloadClick={handleDownloadClick}
                onUploadClick={handleUploadClick}
                isDownloadEnabled={numberOfCells === map.cells.length}
                onActionClick={handleActionClick}
                currentFieldTypeAction={currentFieldTypeAction}
                onCoordsClick={handleCoordsClick}
                isCoordsEnabled={isCoordsEnabled}
                currentFieldObjectAction={currentFieldObjectAction}
                currentStructureAction={currentStructureAction}
              />
            </ToolbarWrapper>
            {hexes}
          </MapInnerContainer>
        </MapContainer>
      </AppContainer>
    </Container>
  );
};
