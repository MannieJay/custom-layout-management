import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';

interface Props {
    size: 'Small' | 'Large'
    layout: 'TwoColumn' | 'ThreeColumn' | 'TwoColumnFooter' | undefined
}

const Previewer: React.FC<Props> = ({ size, layout }) => {
    const footer = (
        <Box
            id={"footer" + size}
            sx={{ width: 1, height: 1 }}
            className={"previewRowFooter-" + size}
            display="flex"
            flexDirection="column"
            alignItems="stretch">
        </Box>
    );
    const headerClass = "previewRow" + (layout === "TwoColumnFooter" ? "Header" : "") + "-" + size;
    return (
        <Stack spacing={2}>
            <Box
                id={"header" + size}
                sx={{ width: 1, height: 1 }}
                className={headerClass}
                display="flex"
                flexDirection="column"
                alignItems="stretch">
            </Box>
            <Stack direction="row" spacing={2}>
                <Box
                    id={"column1" + size}
                    sx={{ width: 1, height: 1 }}
                    className={"previewColumn-" + size}
                    display="flex"
                    flexDirection="row"
                    alignItems="stretch">
                </Box>
                <Box
                    id={"column2" + size}
                    sx={{ width: 1, height: 1 }}
                    className={"previewColumn-" + size}
                    display="flex"
                    flexDirection="row"
                    alignItems="stretch">
                </Box>
                {layout === 'ThreeColumn'
                    ? <Box
                    id={"column3" + size}
                    sx={{ width: 1, height: 1 }}
                    className={"previewColumn-" + size}
                    display="flex"
                    flexDirection="row"
                    alignItems="stretch">
                </Box>
                : <></>}
            </Stack>
            {layout === 'TwoColumnFooter' ? footer : <></>}
        </Stack>
    );
}

export default Previewer;