import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const AddTodo = ({ addtodo, id }) => {
  const [text, setText] = useState('');

  const handleAddClick = () => {
    if (text.trim() !== '') {
      addtodo(text, id);
      setText('');
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        label="Enter task"
        variant="outlined"
        value={text}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAddClick();
        }}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        disabled={text.trim() === ''}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddTodo;
