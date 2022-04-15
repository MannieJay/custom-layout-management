import React, { useState } from 'react';
import { GlobalStore } from './GlobalState/StateContext';
import './Styles/App.css';
import Editor from './Workflows/Editor';
import LayoutSelector from './Workflows/LayoutSelector';

const App: React.FC = () => {
    const [showEditor, setShowEditor] = useState(false);
    return (
        <GlobalStore>
            {showEditor ? <Editor setShowEditor={setShowEditor} /> : <LayoutSelector setShowEditor={setShowEditor} />}
        </GlobalStore>
    );
}

export default App;
