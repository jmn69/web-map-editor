import React from 'react';
import T from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

import Circle from 'common/components/Circle';
import { ToolbarActionEnum } from 'common/constants';

import { Container, CircleWrapper } from './Toolbar.s';

const Toolbar = ({ onActionClick, currentAction }) => {
  return (
    <Container>
      <CircleWrapper>
        <Circle
          onClick={() => onActionClick(ToolbarActionEnum.eraser)}
          data-tip
          data-for='eraser'
          bg='white'
          isHover={currentAction === ToolbarActionEnum.eraser}
        >
          <FontAwesomeIcon size='lg' color='#e4a1bb' icon='eraser' />
        </Circle>
      </CircleWrapper>
      <CircleWrapper>
        <Circle
          onClick={() => onActionClick(ToolbarActionEnum.water)}
          data-tip
          data-for='water'
          bg='white'
          isHover={currentAction === ToolbarActionEnum.water}
        >
          <FontAwesomeIcon size='2x' color='#1C9EFF' icon='water' />
        </Circle>
      </CircleWrapper>
      <CircleWrapper>
        <Circle
          onClick={() => onActionClick(ToolbarActionEnum.plain)}
          data-tip
          data-for='plain'
          bg='white'
          isHover={currentAction === ToolbarActionEnum.plain}
        >
          <FontAwesomeIcon size='2x' color='#00D41B' icon='seedling' />
        </Circle>
      </CircleWrapper>
      <CircleWrapper>
        <Circle
          onClick={() => onActionClick(ToolbarActionEnum.sand)}
          data-tip
          data-for='sand'
          bg='white'
          isHover={currentAction === ToolbarActionEnum.sand}
        >
          <FontAwesomeIcon size='2x' color='#FFF6A0' icon='umbrella-beach' />
        </Circle>
      </CircleWrapper>
      <ReactTooltip
        className='menuTooltip'
        id='eraser'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Réinitialise la cellule
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='water'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Eau
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='plain'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Plaine
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='sand'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Désert
      </ReactTooltip>
    </Container>
  );
};

Toolbar.propTypes = {
  onActionClick: T.func.isRequired,
  currentAction: T.number,
};

Toolbar.defaultProps = {
  currentAction: null,
};

export default Toolbar;
