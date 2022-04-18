import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { UploadDropzone } from 'react-uploader';
import { uploader } from '../utilities';
import { UploaderResult } from 'uploader';
import useGlobalState from '../GlobalState/useGlobalState';

interface Props {
    setShowElement: (element: "LayoutSelector" | "Editor" | "Previewer") => void
}

const SidebarColumnManager: React.FC<Props> = ({ setShowElement }) => {
    const [hexValue, setHexValue] = useState('');
    const [uploadedImage, setUploadedImage] = useState<UploaderResult[]>();

    const { backgroundItemSelections } = useGlobalState();

    const handleHexValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setHexValue(value);
    };

    useEffect(() => {
        if (uploadedImage) {
            handleImageUpload();
        }
    }, [uploadedImage]);

    const onUpdate = (files: UploaderResult[]) => setUploadedImage(files);

    const handleImageUpload = () => {        
        const itemKeysForApplyingBackground = [];

        if (backgroundItemSelections) {
            for (const [key, value] of Object.entries(backgroundItemSelections)) {
                if (value?.selected) {
                    itemKeysForApplyingBackground.push(key);
                };
            };
        };

        if (itemKeysForApplyingBackground?.length && uploadedImage?.length) {
            itemKeysForApplyingBackground?.forEach((item: string) => {
                const elementSmall = document.getElementById(item + "Small");
                const elementLarge = document.getElementById(item + "Large");
                const elementFull = document.getElementById(item + "Full");

                if (elementSmall) {
                    elementSmall.style.backgroundImage = `url(${uploadedImage[0].originalFile.fileUrl})`;
                };
                if (elementLarge) {
                    elementLarge.style.backgroundImage = `url(${uploadedImage[0].originalFile.fileUrl})`;
                };
                if (elementFull) {
                    elementFull.style.backgroundImage = `url(${uploadedImage[0].originalFile.fileUrl})`;
                };
            });
        };
    };

    const handleApply = () => {
        const itemKeysForApplyingBackground = [];
        if (backgroundItemSelections) {
            for (const [key, value] of Object.entries(backgroundItemSelections)) {
                if (value?.selected) {
                    itemKeysForApplyingBackground.push(key);
                };
            };
        };
        if (itemKeysForApplyingBackground?.length && hexValue?.length) {
            itemKeysForApplyingBackground?.forEach((item: string) => {
                const elementSmall = document.getElementById(item + "Small");
                const elementLarge = document.getElementById(item + "Large");
                const elementFull = document.getElementById(item + "Full");
                if (elementSmall) {
                    elementSmall.style.background = hexValue;
                }
                if (elementLarge) {
                    elementLarge.style.background = hexValue;
                }
                if (elementFull) {
                    elementFull.style.background = hexValue;
                }
            });
        };
    };

    const backgroundColor = (
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

    const backgroundImage = (
        <Stack spacing={2}>
            <div>
                Background Image
            </div>
            <div>
                <UploadDropzone
                    uploader={uploader}
                    options={{multi: false}}
                    onUpdate={onUpdate}
                    width="600px"
                    height="375px"
                />
            </div>
        </Stack>
    );

    return (
        <Stack spacing={2} sx={{ paddingRight: "10px" }}>
            {backgroundColor}
            <hr />
            {backgroundImage}
            <Button
                className="button-bottom"
                variant="contained"
                sx={{ borderRadius: 28, position: "absolute", bottom: "7vh", width: "10vw", right: "3vw" }}
                onClick={() => setShowElement("Previewer")}
            >
                Preview
            </Button>
        </Stack>
    );
}

export default SidebarColumnManager;