import React, { useEffect, useState } from 'react';
import Previewer from './Components/Previewer';
import { GlobalStore } from './GlobalState/StateContext';
import useGlobalState from './GlobalState/useGlobalState';
import Editor from './Workflows/Editor';
import LayoutSelector from './Workflows/LayoutSelector';
import './Styles/App.css';

const App: React.FC = () => {
    const [showElement, setShowElement] = useState<"LayoutSelector" | "Editor" | "Previewer">('LayoutSelector');
    const [layout, setLayout] = useState<"TwoColumn" | "ThreeColumn" | "TwoColumnFooter">('TwoColumn');

    return (
        <GlobalStore>
            <Editor setLayout={setLayout} hidden={showElement !== "Editor"} setShowElement={setShowElement} />
            <LayoutSelector hidden={showElement !== "LayoutSelector"} setShowElement={setShowElement} />
            <Previewer hidden={showElement !== "Previewer"} size="Full" layout={layout} setShowElement={setShowElement} />
        </GlobalStore>
    );
}

export default App;
