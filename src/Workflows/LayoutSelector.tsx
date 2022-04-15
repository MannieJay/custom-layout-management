import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Previewer from '../Components/Previewer';
import useGlobalState from '../GlobalState/useGlobalState';

interface Props {
    setShowEditor: (showEditor: boolean) => void
}

const LayoutSelector: React.FC<Props> = ({ setShowEditor }) => {
    const [currentCard, setCurrentCard] = useState('');
    const { setSelectedCard } = useGlobalState();
    
    const onSelectCard = (card: string) => {
        setSelectedCard(card);
        setCurrentCard(card);
    };
    
    return (        
        <div className="app-container">
            <Grid container spacing={2}>
                <Grid item xs={1.5}>
                </Grid>
                <Grid item>
                    <h1>
                        Select a layout for your single page website
                    </h1>
                    <div className="subheader">
                        When choosing your layout there are several things you can customize:
                    </div>
                    <div className="bulleted-list">
                        <li>
                            Set the background color or use a large image as the background
                        </li>
                        <li>
                            Each container block can contain an image or custom text
                        </li>
                        <li>
                            Any text block can contain a background image or color
                        </li>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1.5}>
                </Grid>
                <Grid item xs={3}>
                    <Card
                        onClick={() => onSelectCard("TwoColumn")}
                        sx={{
                            borderStyle: currentCard === "TwoColumn" ? "solid" : "unset",
                            borderColor: "green"
                        }}
                    >
                        <Card sx={{backgroundColor: "#e2dfdf", paddingRight: "2rem", paddingLeft: "2rem"}}>
                            <CardContent>
                                <Previewer size="Small" layout="TwoColumn"/>
                            </CardContent>
                        </Card>
                        <CardContent>
                            Header - Two Columns
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card
                        onClick={() => onSelectCard("ThreeColumn")}
                        sx={{
                            borderStyle: currentCard === "ThreeColumn" ? "solid" : "unset",
                            borderColor: "green"
                        }}
                    >
                        <Card sx={{backgroundColor: "#e2dfdf", paddingRight: "2rem", paddingLeft: "2rem"}}>
                            <CardContent>
                                <Previewer size="Small" layout="ThreeColumn" />
                            </CardContent>
                        </Card>
                        <CardContent>
                            Header - Three Columns
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card
                        onClick={() => onSelectCard("TwoColumnFooter")}
                        sx={{
                            borderStyle: currentCard === "TwoColumnFooter" ? "solid" : "unset",
                            borderColor: "green"
                        }}
                    >
                        <Card sx={{backgroundColor: "#e2dfdf", paddingRight: "2rem", paddingLeft: "2rem"}}>
                            <CardContent>
                                <Previewer size="Small" layout="TwoColumnFooter" />
                            </CardContent>
                        </Card>
                        <CardContent>
                            Header/Footer - Two Columns
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={1.5}>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1.5}></Grid>
                <Grid item xs={9}>
                    <div className="divider" />
                </Grid>
                <Grid item xs={1.5}></Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={1.5}></Grid>
                <Grid item xs={9} sx={{ textAlign: "right" }}>
                    <Button
                        variant="contained"
                        sx={{ borderRadius: 28 }}
                        disabled={!currentCard.length}
                        onClick={() => setShowEditor(true)}
                    >
                        Next
                    </Button>
                </Grid>
                <Grid item xs={1.5}></Grid>
            </Grid>
        </div>
    );
}

export default LayoutSelector;
