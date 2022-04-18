import React, { useCallback, useMemo } from "react";
import { Editable, withReact, Slate, useSlate, ReactEditor } from "slate-react";
import { BaseEditor, createEditor, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Box, ToggleButton, Divider } from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
const RichEditor = ({ value, setValue }: any) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Box p={1} m={2} border={1} borderColor="grey.500" borderRadius={4}>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          setValue(value);
        }}
      >
        <Toolbar>
          <MarkButton format="bold">
            <FormatBoldIcon />
          </MarkButton>
          <MarkButton format="italic">
            <FormatItalicIcon />
          </MarkButton>
          <MarkButton format="underline">
            <FormatUnderlinedIcon />
          </MarkButton>
          <MarkButton format="code">
            <CodeIcon />
          </MarkButton>
          <BlockButton format="heading-one">
            <LooksOneIcon />
          </BlockButton>
          <BlockButton format="heading-two">
            <LooksTwoIcon />
          </BlockButton>
          <BlockButton format="block-quote">
            <FormatQuoteIcon />
          </BlockButton>
          <BlockButton format="numbered-list">
            <FormatListNumberedIcon />
          </BlockButton>
          <BlockButton format="bulleted-list">
            <FormatListBulletedIcon />
          </BlockButton>
        </Toolbar>
        <Box pl={1}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
          />
        </Box>
      </Slate>
    </Box>
  );
};

export const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, children }: any) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

const MarkButton = ({ format, children }: any) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

const Menu = React.forwardRef(({ children, ...props }: any, ref): any => (
  <>
    <Box
      sx={{
        display: "flex",
        direction: "row",
        justify: "flex-start",
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >
      {children}
    </Box>
    <Box pt={2}>
      <Divider variant="middle" />
    </Box>
  </>
));

const Toolbar = React.forwardRef(({ className, ...props }: any, ref): any => (
  <Menu {...props} ref={ref} />
));

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor: any, format: any) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === format
  });
  return !!match;
};

const isMarkActive = (editor: any, format: any) => {
  const marks: any = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: any) => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export default RichEditor;
