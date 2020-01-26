import React, { useState } from 'react';
import T from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';

import Circle from 'common/components/Circle';
import { ToolbarActionEnum } from 'common/constants';

import { Container, CircleWrapper, ButtonContainer } from './Toolbar.s';

const fieldTypeActionIcon = {
  [ToolbarActionEnum.water]: (
    <FontAwesomeIcon size='2x' color='#1C9EFF' icon='water' />
  ),
  [ToolbarActionEnum.plain]: (
    <FontAwesomeIcon size='2x' color='#00D41B' icon='seedling' />
  ),
  [ToolbarActionEnum.sand]: (
    <FontAwesomeIcon size='2x' color='#FFF6A0' icon='umbrella-beach' />
  ),
  null: <FontAwesomeIcon size='2x' color='gray' icon='plus' />,
};

const Toolbar = ({
  onActionFieldTypeClick,
  currentFieldTypeAction,
  onDownloadClick,
  isDownloadEnabled,
  onUploadClick,
  onEraserClick,
  isEraserEnabled,
  isCoordsEnabled,
  onCoordsClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleWaterClick = () => {
    onActionFieldTypeClick(ToolbarActionEnum.water);
    setIsOpen(false);
  };

  const handleSandClick = () => {
    onActionFieldTypeClick(ToolbarActionEnum.sand);
    setIsOpen(false);
  };

  const handlePlainClick = () => {
    onActionFieldTypeClick(ToolbarActionEnum.plain);
    setIsOpen(false);
  };

  return (
    <Container>
      <ButtonContainer>
        <CircleWrapper>
          <Circle
            onClick={onCoordsClick}
            data-tip
            data-for='coords'
            bg='white'
            isHover={isCoordsEnabled}
          >
            <FontAwesomeIcon size='lg' color='gray' icon='superscript' />
          </Circle>
        </CircleWrapper>
        <CircleWrapper>
          <Circle
            onClick={onEraserClick}
            data-tip
            data-for='eraser'
            bg='white'
            isHover={isEraserEnabled}
          >
            <FontAwesomeIcon size='lg' color='#e4a1bb' icon='eraser' />
          </Circle>
        </CircleWrapper>
        <ButtonContainer>
          <FloatingMenu
            slideSpeed={500}
            direction='down'
            spacing={8}
            isOpen={isOpen}
            style={{ position: 'absolute', top: 0 }}
          >
            <MainButton
              data-tip
              data-for='fieldType'
              background='white'
              iconResting={fieldTypeActionIcon[currentFieldTypeAction]}
              iconActive={
                <FontAwesomeIcon size='2x' color='gray' icon='times' />
              }
              icon={fieldTypeActionIcon[currentFieldTypeAction]}
              onClick={() => setIsOpen(!isOpen)}
              size={60}
            />
            <ChildButton
              data-tip
              data-for='water'
              icon={
                currentFieldTypeAction === ToolbarActionEnum.water ? (
                  <FontAwesomeIcon size='2x' color='gray' icon='undo-alt' />
                ) : (
                  <FontAwesomeIcon size='2x' color='#1C9EFF' icon='water' />
                )
              }
              background='white'
              size={45}
              onClick={handleWaterClick}
            />
            <ChildButton
              data-tip
              data-for='plain'
              icon={
                currentFieldTypeAction === ToolbarActionEnum.plain ? (
                  <FontAwesomeIcon size='2x' color='gray' icon='undo-alt' />
                ) : (
                  <FontAwesomeIcon size='2x' color='#00D41B' icon='seedling' />
                )
              }
              background='white'
              size={45}
              onClick={handlePlainClick}
            />
            <ChildButton
              data-tip
              data-for='sand'
              icon={
                currentFieldTypeAction === ToolbarActionEnum.sand ? (
                  <FontAwesomeIcon size='2x' color='gray' icon='undo-alt' />
                ) : (
                  <FontAwesomeIcon
                    size='2x'
                    color='#FFF6A0'
                    icon='umbrella-beach'
                  />
                )
              }
              background='white'
              size={45}
              onClick={handleSandClick}
            />
          </FloatingMenu>
        </ButtonContainer>
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
        place='right'
        type='dark'
        effect='solid'
      >
        {currentFieldTypeAction === ToolbarActionEnum.water
          ? "Désactiver l'éditeur d'eau"
          : 'Eau'}
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='plain'
        place='right'
        type='dark'
        effect='solid'
      >
        {currentFieldTypeAction === ToolbarActionEnum.plain
          ? "Désactiver l'éditeur de plaine"
          : 'Plaine'}
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='sand'
        place='right'
        type='dark'
        effect='solid'
      >
        {currentFieldTypeAction === ToolbarActionEnum.sand
          ? "Désactiver l'éditeur de désert"
          : 'Désert'}
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
      <ReactTooltip
        className='menuTooltip'
        id='fieldType'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Paysages
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='coords'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Coordonnées
      </ReactTooltip>
    </Container>
  );
};

Toolbar.propTypes = {
  onEraserClick: T.func.isRequired,
  isEraserEnabled: T.bool.isRequired,
  onActionFieldTypeClick: T.func.isRequired,
  currentFieldTypeAction: T.number,
  onDownloadClick: T.func.isRequired,
  isDownloadEnabled: T.bool.isRequired,
  isCoordsEnabled: T.bool.isRequired,
  onCoordsClick: T.func.isRequired,
};

Toolbar.defaultProps = {
  currentFieldTypeAction: null,
};

export default Toolbar;
