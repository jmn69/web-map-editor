import React from 'react';
import T from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';

import Circle from 'common/components/Circle';
import { ToolbarActionEnum } from 'common/constants';

import { Container, CircleWrapper, ButtonContainer } from './Toolbar.s';

const Toolbar = ({
  onActionClick,
  currentAction,
  onDownloadClick,
  isDownloadEnabled,
  onUploadClick,
}) => {
  const handleDownloadClick = () => {
    if (isDownloadEnabled) {
      onDownloadClick();
    }
 else {
      toast.warn(
        'Veuillez remplir toutes les cellules avec un paysage pour télécharger le fichier json'
      );
    }
  };

  return (
    <Container>
      <ButtonContainer>
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
      </ButtonContainer>
      <ButtonContainer>
        <CircleWrapper>
          <Circle
            onClick={handleDownloadClick}
            data-tip
            data-for='download'
            bg='white'
            disableBorder
            isHover={isDownloadEnabled}
          >
            <FontAwesomeIcon size='2x' color='gray' icon='file-download' />
          </Circle>
        </CircleWrapper>
        <CircleWrapper>
          <Circle
            onClick={() => document.getElementById('file').click()}
            data-tip
            data-for='upload'
            bg='white'
            disableBorder
            isHover
          >
            <FontAwesomeIcon size='2x' color='gray' icon='file-upload' />
          </Circle>
        </CircleWrapper>
        <input
          accept='application/JSON'
          type='file'
          id='file'
          style={{ display: 'none' }}
          onChange={event => {
            const reader = new FileReader();
            reader.onload = onUploadClick;
            reader.readAsText(event.target.files[0]);
          }}
        />
      </ButtonContainer>
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
      <ReactTooltip
        className='menuTooltip'
        id='download'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Téléchargement du fichier json
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='upload'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Chargement du fichier json
      </ReactTooltip>
    </Container>
  );
};

Toolbar.propTypes = {
  onActionClick: T.func.isRequired,
  currentAction: T.number,
  onDownloadClick: T.func.isRequired,
  isDownloadEnabled: T.bool.isRequired,
};

Toolbar.defaultProps = {
  currentAction: null,
};

export default Toolbar;
