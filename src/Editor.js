import React, { useState, useEffect } from 'react';
import T from 'prop-types';
import Select, { components } from 'react-select';

import {
  Container,
  Card,
  Title,
  CellNumber,
  CellNumberContainer,
  ContentContainer,
  EmptyCellText,
  Gutter,
  Label,
} from './Editor.s';

const fieldTypeOptions = [
  { value: '0', label: 'Plaine' },
  { value: '1', label: 'Désert' },
  { value: '2', label: 'Eau' },
];

const fieldsLabel = {
  '0': 'Plaine',
  '1': 'Désert',
  '2': 'Eau',
};

const styles = {
  container: base => ({
    ...base,
    width: '100%',
  }),
  menu: base => ({
    ...base,
    bottom: 'none',
  }),
};

const MenuPortal = props => {
  return (
    components.Menu && (
      <components.Menu {...props}>{props.children}</components.Menu>
    )
  );
};

const Editor = ({ selectedCell, map, onMapChange }) => {
  const [selectedFieldType, setSelectedFieldType] = useState(null);
  const [lastSelectedCell, setLastSeletecCell] = useState(null);

  useEffect(() => {
    if (selectedCell !== lastSelectedCell) {
      setSelectedFieldType(null);
      setLastSeletecCell(selectedCell);
    }
  }, [selectedCell, lastSelectedCell]);

  const onFieldTypeChange = selectedOption => {
    const mapToUpdate = { ...map };
    const foundCell = mapToUpdate.cells.find(
      cell =>
        cell.column === selectedCell.column && cell.row === selectedCell.row
    );
    const cellToUpdate = {
      ...foundCell,
      fieldType: selectedOption.value,
      column: selectedCell.column,
      row: selectedCell.row,
    };

    if (foundCell) {
      mapToUpdate.cells = map.cells.filter(
        cell =>
          cell.column !== selectedCell.column || cell.row !== selectedCell.row
      );
    }
    mapToUpdate.cells.push(cellToUpdate);

    onMapChange(mapToUpdate);
    setSelectedFieldType(selectedOption);
  };

  const renderEditorContent = selectedCell => {
    return selectedCell ? (
      <ContentContainer>
        <Label>Paysage</Label>
        <Select
          styles={styles}
          value={selectedFieldType}
          onChange={onFieldTypeChange}
          options={fieldTypeOptions}
          components={{ MenuPortal }}
          menuPortalTarget={document.body}
          menuPlacement='auto'
          menuPosition='absolute'
          placeholder='Sélectionnez un élément de paysage'
        />
        {selectedFieldType && selectedFieldType.label}
      </ContentContainer>
    ) : (
      <EmptyCellText>Sélectionnez une cellule pour l&apos;éditer</EmptyCellText>
    );
  };

  let foundCell = null;
  if (selectedCell) {
    foundCell = map.cells.find(
      cell =>
        cell.column === selectedCell.column && cell.row === selectedCell.row
    );
  }

  return (
    <Container>
      {selectedCell ? (
        <CellNumberContainer>
          <CellNumber>{`${selectedCell.column}-${selectedCell.row}`}</CellNumber>
        </CellNumberContainer>
      ) : null}
      {foundCell ? (
        <Title>
          {foundCell.fieldType
            ? fieldsLabel[foundCell.fieldType]
            : 'Paysage non sélectionné'}
        </Title>
      ) : (
        <Gutter />
      )}
      <Card>{renderEditorContent(selectedCell)}</Card>
    </Container>
  );
};

Editor.propTypes = {
  selectedCell: T.object,
  map: T.object.isRequired,
  onMapChange: T.func.isRequired,
};

Editor.defaultProps = {
  selectedCell: null,
};

export default Editor;
