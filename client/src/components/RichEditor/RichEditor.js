import React, { useRef } from 'react';
import {
  Editor,
  RichUtils,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil
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

import styles from './RichEditor.module.css';
import ToolbarButton from '../ToolbarButton';

export const RichEditor = ({ editor, setEditor }) => {
  const editorRef = useRef();

  const onChange = editorState => setEditor(editorState);

  const toggleInlineStyle = event => {
    event.preventDefault();

    editorRef.current.focus();
    const style = event.currentTarget.getAttribute('data-style');
    setEditor(
      RichUtils.toggleInlineStyle(EditorState.moveFocusToEnd(editor), style)
    );
  };

  const toggleBlockType = event => {
    event.preventDefault();

    editorRef.current.focus();
    const block = event.currentTarget.getAttribute('data-style');
    setEditor(
      RichUtils.toggleBlockType(EditorState.moveFocusToEnd(editor), block)
    );
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

  return (
    <div className={styles.editor}>
      <div className={styles.editor__toolbar}>
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
      <div className={styles.editor__container}>
        <Editor
          ref={editorRef}
          editorState={editor}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
        />
      </div>
    </div>
  );
};
