import React from 'react';
import T from 'prop-types';
import get from 'lodash.get';

import { HORIZONTAL_SPACE } from 'common/constants';

import {
  Container,
  HexagoneStyled,
  HexaTopLeft,
  HexaTopRight,
  HexaBottomLeft,
  HexaBottomRight,
  HexaLeft,
  HexaRight,
} from './Hexagone.s';

const Hexagone = ({
  onCellClick,
  column,
  row,
  lastVerticalSpace,
  lastHorizontalSpace,
  foundCellInMap,
  onHexaMouseEnter,
  isSelected,
  onOrientationClick,
}) => {
  const fieldObjectOrientation = get(foundCellInMap, 'fieldObject.orientation');
  const structureOrientation = get(foundCellInMap, 'structure.orientation');
  const orientation = fieldObjectOrientation || structureOrientation;

  const updateOrientationObject = (propObjectName, propOrientationName) => {
    const updatedObject = { ...foundCellInMap[propObjectName] };
    updatedObject.orientation = {
      ...updatedObject.orientation,
      [propOrientationName]: !foundCellInMap[propObjectName].orientation[
        propOrientationName
      ],
    };
    onOrientationClick(column, row, updatedObject, propObjectName);
  };

  const updateOrientation = orientationProp => {
    if (fieldObjectOrientation) {
      updateOrientationObject('fieldObject', orientationProp);
    }
    if (structureOrientation) {
      updateOrientationObject('structure', orientationProp);
    }
  };

  const handleCellClick = () => {
    onCellClick(column, row);
  };

  const handleMouserEnter = () => {
    onHexaMouseEnter(column, row);
  };

  const handleTopLeftClick = e => {
    e.stopPropagation();
    updateOrientation('topLeft');
  };

  const handleTopRightClick = e => {
    e.stopPropagation();
    updateOrientation('topRight');
  };

  const handleBottomLeftClick = e => {
    e.stopPropagation();
    updateOrientation('bottomLeft');
  };

  const handleBottomRightClick = e => {
    e.stopPropagation();
    updateOrientation('bottomRight');
  };

  const handleLeftClick = e => {
    e.stopPropagation();
    updateOrientation('left');
  };

  const handleRightClick = e => {
    e.stopPropagation();
    updateOrientation('right');
  };

  const fieldType = get(foundCellInMap, 'fieldType');

  return (
    <Container
      onMouseEnter={handleMouserEnter}
      onClick={handleCellClick}
      bottom={lastVerticalSpace}
      left={
        lastHorizontalSpace + (column % 2 === 0 ? 10 : HORIZONTAL_SPACE - 1)
      }
    >
      <HexagoneStyled isSelected={isSelected} fieldType={fieldType}>
        {orientation ? (
          <HexaTopLeft
            onClick={handleTopLeftClick}
            isEnabled={orientation.topLeft}
          />
        ) : null}
        {orientation ? (
          <HexaTopRight
            onClick={handleTopRightClick}
            isEnabled={orientation.topRight}
          />
        ) : null}
        {orientation ? (
          <HexaBottomLeft
            onClick={handleBottomLeftClick}
            isEnabled={orientation.bottomLeft}
          />
        ) : null}
        {orientation ? (
          <HexaBottomRight
            onClick={handleBottomRightClick}
            isEnabled={orientation.bottomRight}
          />
        ) : null}
        {orientation ? (
          <HexaLeft onClick={handleLeftClick} isEnabled={orientation.left} />
        ) : null}
        {orientation ? (
          <HexaRight onClick={handleRightClick} isEnabled={orientation.right} />
        ) : null}
      </HexagoneStyled>
    </Container>
  );
};

Hexagone.propTypes = {
  onCellClick: T.func.isRequired,
  onHexaMouseEnter: T.func.isRequired,
  column: T.number.isRequired,
  row: T.number.isRequired,
  lastVerticalSpace: T.number.isRequired,
  lastHorizontalSpace: T.number.isRequired,
  foundCellInMap: T.any,
  isSelected: T.bool,
  onOrientationClick: T.func.isRequired,
};

Hexagone.defaultProps = {
  foundCellInMap: null,
  isSelected: false,
};

export default Hexagone;
