import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw
} from 'draft-js';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaHeading,
  FaQuoteLeft,
  FaListUl,
  FaListOl
} from 'react-icons/fa';

import styles from './CreatePost.module.css';
import ToolbarButton from '../../components/ToolbarButton';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

export const CreatePost = ({ createPost, communities }) => {
  const [editor, setEditor] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [community, setCommunity] = useState('');

  const onChange = editorState => setEditor(editorState);

  const toggleInlineStyle = event => {
    event.preventDefault();
    const style = event.currentTarget.getAttribute('data-style');
    setEditor(RichUtils.toggleInlineStyle(editor, style));
  };

  const toggleBlockType = event => {
    event.preventDefault();

    const block = event.currentTarget.getAttribute('data-style');
    setEditor(RichUtils.toggleBlockType(editor, block));
  };

  const handleKeyCommand = command => {
    // inline formatting key commands handles bold, italic, code, underline
    let editorState = RichUtils.handleKeyCommand(editor, command);
    // If RichUtils.handleKeyCommand didn't find anything, check for our custom strikethrough command and call `RichUtils.toggleInlineStyle` if we find it.
    if (!editorState && command === 'strikethrough') {
      editorState = RichUtils.toggleInlineStyle(editor, 'STRIKETHROUGH');
    }

    if (!editorState && command === 'blockquote') {
      editorState = RichUtils.toggleBlockType(editor, 'blockquote');
    }

    if (!editorState && command === 'ordered-list') {
      editorState = RichUtils.toggleBlockType(editor, 'ordered-list-item');
    }

    if (!editorState && command === 'unordered-list') {
      editorState = RichUtils.toggleBlockType(editor, 'unordered-list-item');
    }

    if (editorState) {
      setEditor(editorState);
      return 'handled';
    }

    return 'not-handled';
  };

  const keyBindingFunction = event => {
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === 'x'
    ) {
      return 'strikethrough';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === '7'
    ) {
      return 'ordered-list';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === '8'
    ) {
      return 'unordered-list';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === '9'
    ) {
      return 'blockquote';
    }

    return getDefaultKeyBinding(event);
  };

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
          <div className={styles.post__editor}>
            <div className={styles.post__editor__toolbar}>
              <ToolbarButton
                pattern='BOLD'
                onMouseDown={toggleInlineStyle}
                editorState={editor}
              >
                <FaBold />
              </ToolbarButton>
              <ToolbarButton
                pattern='ITALIC'
                onMouseDown={toggleInlineStyle}
                editorState={editor}
              >
                <FaItalic />
              </ToolbarButton>
              <ToolbarButton
                pattern='UNDERLINE'
                onMouseDown={toggleInlineStyle}
                editorState={editor}
              >
                <FaUnderline />
              </ToolbarButton>
              <ToolbarButton
                pattern='STRIKETHROUGH'
                onMouseDown={toggleInlineStyle}
                editorState={editor}
              >
                <FaStrikethrough />
              </ToolbarButton>
              <ToolbarButton
                pattern='CODE'
                onMouseDown={toggleInlineStyle}
                editorState={editor}
              >
                <FaCode />
              </ToolbarButton>
              <div className={styles.vertical__line} />
              <ToolbarButton
                pattern='header-one'
                onMouseDown={toggleBlockType}
                editorState={editor}
                block={true}
              >
                <FaHeading />
              </ToolbarButton>
              <ToolbarButton
                pattern='blockquote'
                onMouseDown={toggleBlockType}
                editorState={editor}
                block={true}
              >
                <FaQuoteLeft />
              </ToolbarButton>
              <ToolbarButton
                pattern='unordered-list-item'
                onMouseDown={toggleBlockType}
                editorState={editor}
                block={true}
              >
                <FaListUl />
              </ToolbarButton>
              <ToolbarButton
                pattern='ordered-list-item'
                onMouseDown={toggleBlockType}
                editorState={editor}
                block={true}
              >
                <FaListOl />
              </ToolbarButton>
            </div>
            <Editor
              editorState={editor}
              placeholder='Enter Text'
              onChange={onChange}
              handleKeyCommand={handleKeyCommand}
              keyBindingFn={keyBindingFunction}
            />
          </div>
        </div>
        <Button type='submit' label='Submit' />
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  communities: PropTypes.array.isRequired
};
