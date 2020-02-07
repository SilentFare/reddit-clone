import React from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';

import styles from './ToolbarButton.module.css';

export const ToolbarButton = ({
  children,
  pattern,
  onMouseDown,
  editorState,
  block
}) => {
  const actives = block
    ? RichUtils.getCurrentBlockType(editorState)
    : editorState.getCurrentInlineStyle();

  return (
    <button
      data-style={pattern}
      onMouseDown={onMouseDown}
      className={`${styles.toolbar__button} ${(block
        ? actives === pattern
        : actives.has(pattern)) && styles.toolbar__button_active}`}
      onClick={e => e.preventDefault()}
    >
      {children}
    </button>
  );
};

ToolbarButton.propTypes = {
  children: PropTypes.node.isRequired,
  pattern: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  block: PropTypes.bool
};
