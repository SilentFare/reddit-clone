import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

import styles from './CommentEditor.module.css';
import Button from '../Button';
import RichEditor from '../RichEditor';

export const CommentEditor = ({
  auth,
  toggleLogin,
  toggleRegister,
  create,
  post_id,
  community
}) => {
  const [editor, setEditor] = useState(
    EditorState.moveFocusToEnd(EditorState.createEmpty())
  );

  const handleFormSubmit = event => {
    event.preventDefault();

    const text = convertToRaw(editor.getCurrentContent());

    create({
      post_id,
      text,
      community
    });
    const clearedEditor = EditorState.push(
      editor,
      ContentState.createFromText(''),
      'remove-range'
    );
    setEditor(clearedEditor);
  };

  if (auth) {
    return (
      <form className={styles.editor__container} onSubmit={handleFormSubmit}>
        <RichEditor editor={editor} setEditor={setEditor} />
        <Button
          type='submit'
          className={styles.editor__comment}
          label='Comment'
        />
      </form>
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
