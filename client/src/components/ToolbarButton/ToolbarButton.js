import React from 'react';
import { RichUtils } from 'draft-js';

import styles from './ToolbarButton.module.css';

export const ToolbarButton = ({
  children,
  style,
  onMouseDown,
  editorState,
  block
}) => {
  const actives = block
    ? RichUtils.getCurrentBlockType(editorState)
    : editorState.getCurrentInlineStyle();

  return (
    <button
      data-style={style}
      onMouseDown={onMouseDown}
      className={`${styles.toolbar__button} ${(block
        ? actives === style
        : actives.has(style)) && styles.toolbar__button_active}`}
      onClick={e => e.preventDefault()}
    >
      {children}
    </button>
  );
};
