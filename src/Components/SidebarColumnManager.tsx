import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

const SidebarColumnManager: React.FC = () => {
    const backgroundColor = () => {
        return (
            <Stack spacing={2}>
                <div>
                    Background Color
                </div>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> example icon? */}
                    <OutlinedInput id="input-with-sx" />
                </Box>
            </Stack>
        );
    };

    const backgroundImage = () => {
        return (
            <Stack spacing={2}>
                <div>
                    Background Image
                </div>
                <div>
                    ~Image~
                </div>
            </Stack>
        );
    };

    return (
        <Stack spacing={2}>
            {backgroundColor()}
            {backgroundImage()}
        </Stack>
    );
}

export default SidebarColumnManager;