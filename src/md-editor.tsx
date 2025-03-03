import React, { useState, useRef } from 'react';
import {
  Container,
  TextField,
  Paper,
  IconButton,
  Stack,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  Link as LinkIcon,
  Image,
  Code,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

export const MdEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const handleFormatText = (format: string) => {
    if (!textFieldRef.current) return;

    const textField = textFieldRef.current;
    const start = textField.selectionStart;
    const end = textField.selectionEnd;
    const selectedText = markdown.substring(start, end);

    let formattedText = '';
    let cursorOffset = 0;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorOffset = 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorOffset = 1;
        break;
      case 'bullet-list':
        formattedText = selectedText
          .split('\n')
          .map((line) => `- ${line}`)
          .join('\n');
        cursorOffset = 2;
        break;
      case 'number-list':
        formattedText = selectedText
          .split('\n')
          .map((line, i) => `${i + 1}. ${line}`)
          .join('\n');
        cursorOffset = 3;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        cursorOffset = 1;
        break;
      case 'image':
        formattedText = `![${selectedText}](image-url)`;
        cursorOffset = 2;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        cursorOffset = 1;
        break;
      default:
        return;
    }

    const newText =
      markdown.substring(0, start) + formattedText + markdown.substring(end);
    setMarkdown(newText);

    // Set cursor position after the operation
    setTimeout(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
        if (selectedText) {
          textFieldRef.current.setSelectionRange(
            start + formattedText.length,
            start + formattedText.length,
          );
        } else {
          textFieldRef.current.setSelectionRange(
            start + cursorOffset,
            start + cursorOffset,
          );
        }
      }
    }, 0);
  };

  return (
    <Container style={{ padding: '2rem' }}>
      <Paper style={{ width: 960, padding: '1rem', marginBottom: '1rem' }}>
        <Stack direction="row" spacing={1} style={{ marginBottom: '1rem' }}>
          <Tooltip title="Bold">
            <IconButton onClick={() => handleFormatText('bold')}>
              <FormatBold />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton onClick={() => handleFormatText('italic')}>
              <FormatItalic />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bullet List">
            <IconButton onClick={() => handleFormatText('bullet-list')}>
              <FormatListBulleted />
            </IconButton>
          </Tooltip>
          <Tooltip title="Numbered List">
            <IconButton onClick={() => handleFormatText('number-list')}>
              <FormatListNumbered />
            </IconButton>
          </Tooltip>
          <Tooltip title="Link">
            <IconButton onClick={() => handleFormatText('link')}>
              <LinkIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Image">
            <IconButton onClick={() => handleFormatText('image')}>
              <Image />
            </IconButton>
          </Tooltip>
          <Tooltip title="Code">
            <IconButton onClick={() => handleFormatText('code')}>
              <Code />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip title={showPreview ? 'Hide Preview' : 'Show Preview'}>
            <IconButton onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" gap={2}>
          <div style={{ flex: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              placeholder="Write your markdown here..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              inputRef={textFieldRef}
            />
          </div>
          {showPreview && (
            <div
              style={{
                flex: 1,
                border: '1px solid #e0e0e0',
                padding: '8px',
                borderRadius: '4px',
                overflow: 'auto',
              }}
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default MdEditor;
