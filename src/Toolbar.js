import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

import Circle from 'common/components/Circle';

import { Container, CircleWrapper } from './Toolbar.s';

export default () => {
  return (
    <Container>
      <CircleWrapper>
        <Circle data-tip data-for='eraser' bg='white'>
          <FontAwesomeIcon size='lg' color='#e4a1bb' icon='eraser' />
        </Circle>
      </CircleWrapper>
      <CircleWrapper>
        <Circle data-tip data-for='water' bg='white'>
          <FontAwesomeIcon size='2x' color='#1C9EFF' icon='water' />
        </Circle>
      </CircleWrapper>
      <CircleWrapper>
        <Circle data-tip data-for='plain' bg='white'>
          <FontAwesomeIcon size='2x' color='#00D41B' icon='seedling' />
        </Circle>
      </CircleWrapper>
      <CircleWrapper>
        <Circle data-tip data-for='sand' bg='white'>
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
