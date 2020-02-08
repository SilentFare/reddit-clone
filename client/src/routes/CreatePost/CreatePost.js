import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';

import styles from './CreatePost.module.css';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import RichEditor from '../../components/RichEditor';

export const CreatePost = ({ createPost, communities }) => {
  const [editor, setEditor] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [community, setCommunity] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      title,
      community
    };
    if (editor.getCurrentContent().hasText()) {
      data.text = convertToRaw(editor.getCurrentContent());
    }
    createPost(data);
  };

  return (
    <div className={styles.create__post}>
      <form className={styles.post__form} onSubmit={handleSubmit}>
        <Dropdown
          selected={community}
          setSelected={setCommunity}
          options={Object.values(communities)}
          placeholder='Select Community'
        />
        <div className={styles.title__container}>
          <label htmlFor='title' className={styles.label}>
            Title
          </label>
          <textarea
            id='title'
            placeholder='Enter Title'
            className={styles.post__form__title}
            onChange={event => setTitle(event.target.value)}
            value={title}
          />
        </div>
        <div className={styles.editor__container}>
          <label className={styles.label}>Text</label>
          <RichEditor editor={editor} setEditor={setEditor} />
        </div>
        <Button type='submit' label='Submit' />
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  communities: PropTypes.object.isRequired
};
