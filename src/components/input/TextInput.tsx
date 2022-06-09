import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeFunc: (text: string) => void
}

export const TextInput: React.FC<TextInputProps> = ({placeholder, value, onChangeFunc}) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeFunc(e.target.value)}
      />
    </Box>
  );
}
