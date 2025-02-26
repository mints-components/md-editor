import React, { useState } from 'react';
import { Container, TextField, Paper, IconButton, Stack } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

export const MdEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(true);

  return (
    <Container style={{ padding: '2rem' }}>
      <Paper style={{ width: 960, padding: '1rem', marginBottom: '1rem' }}>
        <Stack direction="row" spacing={1} style={{ marginBottom: '1rem' }}>
          <IconButton onClick={() => setShowPreview(!showPreview)}>
            <Visibility />
          </IconButton>
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
            />
          </div>
          {showPreview && (
            <div style={{ flex: 1 }}>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default MdEditor;
