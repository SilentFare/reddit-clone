import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

import styles from './ReplyEditor.module.css';
import RichEditor from '../RichEditor';
import Button from '../Button';

export const ReplyEditor = () => {
  const [editor, setEditor] = useState(
    EditorState.moveFocusToEnd(EditorState.createEmpty())
  );

  const handleFormSubmit = event => {
    event.preventDefault();
  };

  return (
    <form className={styles.editor__form}>
      <RichEditor editor={editor} setEditor={setEditor} />
      <Button type='submit' className={styles.editor__submit} label='Reply' />
    </form>
  );
};
