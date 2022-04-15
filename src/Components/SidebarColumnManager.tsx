import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import useGlobalState from '../GlobalState/useGlobalState';

const SidebarColumnManager: React.FC = () => {
    const [hexValue, setHexValue] = useState('');
    const { globalStore } = useGlobalState();

    const handleHexValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setHexValue(value);
    };

    const handleApply = () => {
        const itemKeysForApplyingBackground = [];
        if (globalStore?.backgroundItemSelections) {
            for (const [key, value] of Object.entries(globalStore.backgroundItemSelections)) {
                if (value?.selected) {
                    itemKeysForApplyingBackground.push(key);
                };
            };
        };
        if (itemKeysForApplyingBackground?.length && hexValue?.length) {
            itemKeysForApplyingBackground?.forEach((item: string) => {
                const elementSmall = document.getElementById(item + "Small");
                const elementLarge = document.getElementById(item + "Large");
                if (elementSmall) {
                    elementSmall.style.background = hexValue;
                }
                if (elementLarge) {
                    elementLarge.style.background = hexValue;
                }
            });
        }
        console.log(itemKeysForApplyingBackground);
    };

    const backgroundColor = () => {
        return (
            <Stack spacing={2}>
                <div>
                    Background Color
                </div>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ButtonGroup>
                        <Button disabled>hex#</Button>
                        <OutlinedInput onChange={handleHexValue} id="input-with-sx" />
                        <Button onClick={handleApply}>Apply</Button>
                    </ButtonGroup>
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
        <Stack spacing={2} sx={{ paddingRight: "10px" }}>
            {backgroundColor()}
            <hr />
            {backgroundImage()}
            <Button
                className="button-bottom"
                variant="contained"
                sx={{ borderRadius: 28, position: "absolute", bottom: "7vh", width: "10vw", right: "3vw" }}
                onClick={() => {return;}}
            >
                Preview
            </Button>
        </Stack>
    );
}

export default SidebarColumnManager;