import React, { useState, useEffect } from 'react';
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

import {
  Container,
  CircleWrapper,
  ButtonContainer,
  FloatingMenuContainer,
} from './Toolbar.s';

const actionIcons = {
  [ToolbarActionEnum.water]: (
    <FontAwesomeIcon size='2x' color='#1C9EFF' icon='water' />
  ),
  [ToolbarActionEnum.plain]: (
    <FontAwesomeIcon size='2x' color='#00D41B' icon='seedling' />
  ),
  [ToolbarActionEnum.sand]: (
    <FontAwesomeIcon size='2x' color='#FFF6A0' icon='umbrella-beach' />
  ),
  [ToolbarActionEnum.sandbag]: (
    <FontAwesomeIcon size='2x' color='#100916' icon='suitcase' />
  ),
  [ToolbarActionEnum.barbed]: (
    <FontAwesomeIcon size='2x' color='#100916' icon='won-sign' />
  ),
  null: <FontAwesomeIcon size='2x' color='#ff5613' icon='plus' />,
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
  currentFieldObjectAction,
  onActionFieldObjectClick,
}) => {
  const [isFieldTypeOpen, setFieldTypeIsOpen] = useState(false);
  const [isFieldObjectOpen, setFieldObjectIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let timer;
    if (!isFieldTypeOpen && !isFieldObjectOpen) {
      timer = setTimeout(() => {
        setIsHidden(true);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isFieldObjectOpen, isFieldTypeOpen]);

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
    setFieldTypeIsOpen(false);
  };

  const handleSandClick = () => {
    onActionFieldTypeClick(ToolbarActionEnum.sand);
    setFieldTypeIsOpen(false);
  };

  const handlePlainClick = () => {
    onActionFieldTypeClick(ToolbarActionEnum.plain);
    setFieldTypeIsOpen(false);
  };

  const handleBarbedClick = () => {
    onActionFieldObjectClick(ToolbarActionEnum.barbed);
    setFieldObjectIsOpen(false);
  };

  const handleSandbagClick = () => {
    onActionFieldObjectClick(ToolbarActionEnum.sandbag);
    setFieldObjectIsOpen(false);
  };

  return (
    <Container hidden={isHidden}>
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
        <FloatingMenuContainer>
          <FloatingMenu
            slideSpeed={500}
            direction='down'
            spacing={8}
            isOpen={isFieldTypeOpen}
            style={{ position: 'absolute', top: 0 }}
          >
            <MainButton
              data-tip
              data-for='fieldType'
              background='white'
              iconResting={actionIcons[currentFieldTypeAction]}
              iconActive={
                <FontAwesomeIcon size='2x' color='gray' icon='times' />
              }
              onClick={() => {
                setFieldTypeIsOpen(!isFieldTypeOpen);
                if (!isFieldObjectOpen) {
                  setIsHidden(false);
                }
              }}
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
        </FloatingMenuContainer>
        <FloatingMenuContainer>
          <FloatingMenu
            slideSpeed={500}
            direction='down'
            spacing={8}
            isOpen={isFieldObjectOpen}
            style={{ position: 'absolute', top: 0 }}
          >
            <MainButton
              data-tip
              data-for='fieldObject'
              background='white'
              iconResting={actionIcons[currentFieldObjectAction]}
              iconActive={
                <FontAwesomeIcon size='2x' color='gray' icon='times' />
              }
              onClick={() => {
                setFieldObjectIsOpen(!isFieldTypeOpen);
                if (!isFieldObjectOpen) {
                  setIsHidden(false);
                }
              }}
              size={60}
            />
            <ChildButton
              data-tip
              data-for='barbed'
              icon={
                currentFieldObjectAction === ToolbarActionEnum.barbed ? (
                  <FontAwesomeIcon size='2x' color='gray' icon='undo-alt' />
                ) : (
                  <FontAwesomeIcon size='2x' color='#100916' icon='won-sign' />
                )
              }
              background='white'
              size={45}
              onClick={handleBarbedClick}
            />
            <ChildButton
              data-tip
              data-for='sandbag'
              icon={
                currentFieldObjectAction === ToolbarActionEnum.sandbag ? (
                  <FontAwesomeIcon size='2x' color='gray' icon='undo-alt' />
                ) : (
                  <FontAwesomeIcon size='2x' color='#100916' icon='suitcase' />
                )
              }
              background='white'
              size={45}
              onClick={handleSandbagClick}
            />
          </FloatingMenu>
        </FloatingMenuContainer>
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
      <ReactTooltip
        className='menuTooltip'
        id='fieldObject'
        place='bottom'
        type='dark'
        effect='solid'
      >
        Objets / Obstacles
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='sandbag'
        place='right'
        type='dark'
        effect='solid'
      >
        Sacs de sables
      </ReactTooltip>
      <ReactTooltip
        className='menuTooltip'
        id='barbed'
        place='right'
        type='dark'
        effect='solid'
      >
        Barbelés
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
  currentFieldObjectAction: T.number,
  onActionFieldObjectClick: T.func.isRequired,
};

Toolbar.defaultProps = {
  currentFieldTypeAction: null,
  currentFieldObjectAction: null,
};

export default Toolbar;
