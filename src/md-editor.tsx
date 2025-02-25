import React, { useState } from 'react';
import { Container, TextField, Typography, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export const MdEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');

  return (
    <Container maxWidth="md" style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Markdown Editor
      </Typography>
      <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
        <TextField
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          placeholder="Write your markdown here..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </Paper>
      <Typography variant="h5" gutterBottom>
        Preview
      </Typography>
      <Paper style={{ padding: '1rem' }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </Paper>
    </Container>
  );
};

export default MdEditor;
