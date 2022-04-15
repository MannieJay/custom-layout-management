import React from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Previewer from './Previewer';
import Button from '@mui/material/Button';
import useGlobalState from '../GlobalState/useGlobalState';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

interface Props {
    setShowEditor: (showEditor: boolean) => void
}

const SidebarBackgroundManager: React.FC<Props> = ({ setShowEditor }) => {
    const { selectedCard, setBackgroundItemSelected } = useGlobalState();

    const labelMap = (card: string | undefined) => {
        if (card === 'TwoColumn') {
            return 'Header - Two Columns';
        }
        if (card === 'ThreeColumn') {
            return 'Header - Three Columns';
        }
        if (card === 'TwoColumnFooter') {
            return 'Header/Footer - Two Columns';
        }
        return <></>;
    };

    const format = () => {
        return (
            <Stack spacing={2} sx={{ maxHeight: "100%" }}>
                <div>
                    {labelMap(selectedCard)}
                </div>
                <div className="sidebarPreviewerContainer">
                    <Previewer size="Small" layout={selectedCard} />
                </div>
            </Stack>
        );
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.checked;
        setBackgroundItemSelected(name, value);
    };

    const backgroundDesignator = () => {
        return (
            <Stack spacing={2}>
                <div className="flex background-designator-header">
                    <div className="background-designator-icon">
                        <WallpaperIcon />
                    </div>
                    <div>
                        Background
                    </div>
                </div>
                <div className="flex checkbox-container">
                    <Checkbox name="header" onChange={changeHandler}></Checkbox>
                    {' Header'}
                </div>
                <div className="flex checkbox-container">
                    <Checkbox name="column1" onChange={changeHandler}></Checkbox>
                    {' Column 1'}
                </div>
                <div className="flex checkbox-container">
                    <Checkbox name="column2" onChange={changeHandler}></Checkbox>
                    {' Column 2'}
                </div>
                {selectedCard === 'ThreeColumn'
                    ? <div className="flex checkbox-container">
                        <Checkbox name="column3" onChange={changeHandler}></Checkbox>
                        {' Column 3'}
                    </div>
                    : <></>}
                {selectedCard === 'TwoColumnFooter'
                    ? <div className="flex checkbox-container">
                        <Checkbox name="footer" onChange={changeHandler}></Checkbox>
                        {' Footer'}
                    </div>
                    : <></>}
            </Stack>
        );
    };

    return (
        <Stack spacing={2} sx={{ paddingLeft: "10px" }}>
            <div>
                {format()}
            </div>
            <div>
                {backgroundDesignator()}
            </div>
            <Button
                className="button-bottom"
                variant="contained"
                sx={{ borderRadius: 28, position: "absolute", bottom: "7vh", width: "10vw", left: "3vw" }}
                onClick={() => setShowEditor(false)}
            >
                Back
            </Button>
        </Stack>
    );
}

export default SidebarBackgroundManager;