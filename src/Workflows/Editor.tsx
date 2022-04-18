import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import Previewer from '../Components/Previewer';
import SidebarBackgroundManager from '../Components/SidebarBackgroundManager';
import SidebarColumnManager from '../Components/SidebarColumnManager';
import useGlobalState from '../GlobalState/useGlobalState';

interface Props {
    setShowElement: (element: "LayoutSelector" | "Editor" | "Previewer") => void
    setLayout: (layout: "TwoColumn" | "ThreeColumn" | "TwoColumnFooter") => void
    hidden: boolean
}

const Editor: React.FC<Props> = ({ setShowElement, hidden, setLayout }) => {
    const { selectedCard } = useGlobalState();
    const newClassName = hidden ? "app-container hide" : "app-container";
    useEffect(() => {
        if (selectedCard) {
            setLayout(selectedCard);
        }
    });
    return (        
        <div className={newClassName}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <SidebarBackgroundManager setShowElement={setShowElement} />
                </Grid>
                <Grid item xs={8}>
                    <Previewer hidden={false} size="Large" layout={selectedCard} />
                </Grid>
                <Grid item xs={2}>
                    <SidebarColumnManager setShowElement={setShowElement} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Editor;
