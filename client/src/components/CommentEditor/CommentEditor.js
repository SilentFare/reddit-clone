import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';

import styles from './CommentEditor.module.css';
import Button from '../Button';
import RichEditor from '../RichEditor';

export const CommentEditor = ({ auth, toggleLogin, toggleRegister }) => {
  const [editor, setEditor] = useState(EditorState.createEmpty());

  if (auth) {
    return (
      <div className={styles.editor__container}>
        <RichEditor editor={editor} setEditor={setEditor} />
      </div>
    );
  }

  return (
    <div className={styles.comment__auth__request}>
      <span className={styles.comment__auth__label}>
        Log In or Register to leave a comment.
      </span>
      <div className={styles.comment__auth__buttons}>
        <Button label='Log In' onClick={toggleLogin} />
        <Button label='Register' onClick={toggleRegister} />
      </div>
    </div>
  );
};

CommentEditor.propTypes = {
  auth: PropTypes.bool.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired
};
