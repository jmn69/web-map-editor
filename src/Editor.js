import React from 'react';
import T from 'prop-types';

import { Container } from './Editor.s';

const Editor = ({ selectedCell }) => {
  if (!selectedCell) {
    return <Container>Sélectionnez une cellule pour l&apos;éditer</Container>;
  }

  return <Container>{selectedCell}</Container>;
};

Editor.propTypes = {
  selectedCell: T.string,
};

Editor.defaultProps = {
  selectedCell: null,
};

export default Editor;
