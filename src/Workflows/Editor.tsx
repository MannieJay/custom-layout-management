import Grid from '@mui/material/Grid';
import React from 'react';
import Previewer from '../Components/Previewer';
import SidebarBackgroundManager from '../Components/SidebarBackgroundManager';
import SidebarColumnManager from '../Components/SidebarColumnManager';
import useGlobalState from '../GlobalState/useGlobalState';

interface Props {
    setShowEditor: (showEditor: boolean) => void
}

const Editor: React.FC<Props> = ({ setShowEditor }) => {
    const { selectedCard } = useGlobalState();
    return (        
        <div className="app-container">
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <SidebarBackgroundManager setShowEditor={setShowEditor} />
                </Grid>
                <Grid item xs={8}>
                    <Previewer size="Large" layout={selectedCard}/>
                </Grid>
                <Grid item xs={2}>
                    <SidebarColumnManager />
                </Grid>
            </Grid>
        </div>
    );
}

export default Editor;
