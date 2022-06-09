import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {CHOOSE_NAME} from "../../consts";

interface InputProps {
    required: boolean;
    placeholder: string;
    value: string;
    onChangeFunc: (text: string) => void
    onSubmitFunc: (ev: React.FormEvent) => void
}

export const FormInput: React.FC<InputProps> = ({required, placeholder, value, onChangeFunc, onSubmitFunc}) => {
    return (
        <Box
            component="form"
            onSubmit={onSubmitFunc}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className='name-picking-form flex align-center'>
                <TextField
                    data-testid='restaurant-name-input'
                    required = {required}
                    id="outlined-required"
                    placeholder={placeholder}
                    onChange={(e) => onChangeFunc(e.target.value)}
                    value={value}
                />
                <button className='landing-page-btn' data-testid='choose-restaurant-name-btn' disabled={value ? false : true}>{CHOOSE_NAME}</button>
            </div>
        </Box>
    )
}
