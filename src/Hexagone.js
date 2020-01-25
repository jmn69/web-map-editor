import React from 'react';
import T from 'prop-types';

import { HORIZONTAL_SPACE } from 'common/constants';

import { Container, HexagoneStyled } from './Hexagone.s';

const Hexagone = ({
  onCellClick,
  column,
  row,
  lastVerticalSpace,
  lastHorizontalSpace,
  foundCellInMap,
  onHexaMouseEnter,
}) => {
  const handleCellClick = () => {
    onCellClick(column, row);
  };

  const handleMouserEnter = () => {
    onHexaMouseEnter(column, row);
  };

  return (
    <Container
      onMouseEnter={handleMouserEnter}
      onClick={handleCellClick}
      bottom={lastVerticalSpace}
      left={lastHorizontalSpace + (column % 2 === 0 ? 10 : HORIZONTAL_SPACE)}
    >
      <HexagoneStyled fieldType={foundCellInMap && foundCellInMap.fieldType} />
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
};

Hexagone.defaultProps = {
  foundCellInMap: null,
};

export default Hexagone;
