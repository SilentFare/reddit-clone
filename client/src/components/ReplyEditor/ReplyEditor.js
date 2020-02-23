import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

import styles from './ReplyEditor.module.css';
import RichEditor from '../RichEditor';
import Button from '../Button';

export const ReplyEditor = ({ show, post_id, parentCommentId, create }) => {
  const [editor, setEditor] = useState(
    EditorState.moveFocusToEnd(EditorState.createEmpty())
  );

  const handleFormSubmit = event => {
    event.preventDefault();

    const text = convertToRaw(editor.getCurrentContent());
    create({ post_id, parentCommentId, text });
    setEditor(
      EditorState.push(editor, ContentState.createFromText(''), 'remove-range')
    );
  };

  return show ? (
    <form className={styles.editor__form} onSubmit={handleFormSubmit}>
      <RichEditor editor={editor} setEditor={setEditor} />
      <Button type='submit' className={styles.editor__submit} label='Reply' />
    </form>
  ) : null;
};
