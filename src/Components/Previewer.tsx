import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import ReadOnly from './ReadOnly';

import RichEditor from './RichEditor';

interface Props {
    size: 'Small' | 'Large' | 'Full'
    layout: 'TwoColumn' | 'ThreeColumn' | 'TwoColumnFooter' | undefined
    hidden: boolean
    setShowElement?: (element: "LayoutSelector" | "Editor" | "Previewer") => void
}

const initialValue = [
    {
        type: "paragraph",
        children: [
            { text: "This is editable " },
            { text: "rich", bold: true },
            { text: " text, " },
            { text: "much", italic: true },
            { text: " better than a " },
            { text: "<textarea>", code: true },
            { text: "!" }
        ]
    }
];

const Previewer: React.FC<Props> = ({ size, layout, hidden, setShowElement }) => {
    const [inputHeader, setInputHeader] = useState(initialValue);
    const [inputColumn1, setInputColumn1] = useState(initialValue);
    const [inputColumn2, setInputColumn2] = useState(initialValue);
    const [inputColumn3, setInputColumn3] = useState(initialValue);
    const [inputFooter, setInputFooter] = useState(initialValue);

    const footer = (
        <Box
            id={"footer" + size}
            sx={{ width: 1, height: 1 }}
            className={"previewRowFooter-" + size}
            display="flex"
            flexDirection="column"
            alignItems="stretch"
        >
            {size === "Large" ? <RichEditor value={inputFooter} setValue={setInputFooter} /> : <></>}
            {size === "Full" ? <ReadOnly initialValue={inputFooter} /> : <></>}
        </Box>
    );
    const headerClass = "previewRow" + (layout === "TwoColumnFooter" ? "Header" : "") + "-" + size;
    const newClassName = hidden ? "hide" : "";
    return (
        <div id={"background" + size} className={newClassName}>
            <Stack spacing={2}>
                <Box
                    id={"header" + size}
                    sx={{ width: 1, height: 1 }}
                    className={headerClass}
                    display="flex"
                    flexDirection="column"
                    alignItems="stretch"
                >
                    {size === "Large" ? <RichEditor value={inputHeader} setValue={setInputHeader} /> : <></>}
                    {size === "Full" ? <ReadOnly initialValue={inputHeader} /> : <></>}
                </Box>
                <Stack direction="row" spacing={2}>
                    <Box
                        id={"column1" + size}
                        sx={{ width: 1, height: 1 }}
                        className={"previewColumn-" + size}
                        display="flex"
                        flexDirection="row"
                        alignItems="stretch"
                    >
                        {size === "Large" ? <RichEditor value={inputColumn1} setValue={setInputColumn1} /> : <></>}
                        {size === "Full" ? <ReadOnly initialValue={inputColumn1} /> : <></>}
                    </Box>
                    <Box
                        id={"column2" + size}
                        sx={{ width: 1, height: 1 }}
                        className={"previewColumn-" + size}
                        display="flex"
                        flexDirection="row"
                        alignItems="stretch"
                    >
                        {size === "Large" ? <RichEditor value={inputColumn2} setValue={setInputColumn2} /> : <></>}
                        {size === "Full" ? <ReadOnly initialValue={inputColumn2} /> : <></>}
                    </Box>
                    {layout === 'ThreeColumn'
                        ? <Box
                            id={"column3" + size}
                            sx={{ width: 1, height: 1 }}
                            className={"previewColumn-" + size}
                            display="flex"
                            flexDirection="row"
                            alignItems="stretch"
                        >
                            {size === "Large" ? <RichEditor value={inputColumn3} setValue={setInputColumn3} /> : <></>}
                            {size === "Full" ? <ReadOnly initialValue={inputColumn3} /> : <></>}
                        </Box>
                        : <></>}
                </Stack>
                {layout === 'TwoColumnFooter' ? footer : <></>}
            </Stack>
            {setShowElement
                ? <Button
                        className="button-bottom"
                        variant="contained"
                        sx={{ borderRadius: 28, position: "absolute", bottom: "7vh", width: "10vw", left: "3vw" }}
                        onClick={() => setShowElement("Editor")}
                    >
                        Back
                    </Button>
                    : <></>}
        </div>
    );
}

export default Previewer;