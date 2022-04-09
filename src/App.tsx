import Grid from '@mui/material/Grid';
import React from 'react';
import Previewer from './Components/Previewer';
import SidebarBackgroundManager from './Components/SidebarBackgroundManager';
import SidebarColumnManager from './Components/SidebarColumnManager';
import './Styles/App.css';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <SidebarBackgroundManager />
                </Grid>
                <Grid item xs={8}>
                    <Previewer />
                </Grid>
                <Grid item xs={2}>
                    <SidebarColumnManager />
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
