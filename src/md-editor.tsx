import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export function MdEditor() {
  const [markdown, setMarkdown] = useState('');
  const [showPreview, setShowPreview] = useState(false);
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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button onClick={() => handleFormatText('bold')} title="Bold">
            B
          </button>
          <button onClick={() => handleFormatText('italic')} title="Italic">
            <i>I</i>
          </button>
          <button
            onClick={() => handleFormatText('bullet-list')}
            title="Bullet List"
          >
            • List
          </button>
          <button
            onClick={() => handleFormatText('number-list')}
            title="Numbered List"
          >
            1. List
          </button>
          <button onClick={() => handleFormatText('link')} title="Link">
            🔗
          </button>
          <button onClick={() => handleFormatText('image')} title="Image">
            🖼️
          </button>
          <button onClick={() => handleFormatText('code')} title="Code">
            `Code`
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            title={showPreview ? 'Hide Preview' : 'Show Preview'}
          >
            {showPreview ? '🙈' : '👁️'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <textarea
            ref={textFieldRef}
            style={{
              flex: 1,
              height: '300px',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            placeholder="Write your markdown here..."
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          {showPreview && (
            <div
              style={{
                flex: 1,
                height: '300px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '0.5rem',
                background: '#f9f9f9',
              }}
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MdEditor;
