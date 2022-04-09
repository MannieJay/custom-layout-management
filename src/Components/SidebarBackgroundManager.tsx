import React from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';

const SidebarBackgroundManager: React.FC = () => {
    const label = 'Header - Two Columns';

    const format = () => {
        return (
            <Stack spacing={2}>
                <div>
                    {label}
                </div>
                <div>
                    ~preview or static image~
                </div>
            </Stack>
        );
    };

    const backgroundDesignator = () => {
        return (
            <Stack spacing={2}>
                <div className="flex background-designator-header">
                    <div>
                        ~icon~
                    </div>
                    <div>
                        Background
                    </div>
                </div>
                <div className="flex"><Checkbox></Checkbox> Header</div>
                <div className="flex"><Checkbox></Checkbox> Column 1</div>
                <div className="flex"><Checkbox></Checkbox> Column 2</div>
            </Stack>
        );
    };

    return (
        <Stack spacing={2}>
            {format()}
            {backgroundDesignator()}
        </Stack>
    );
}

export default SidebarBackgroundManager;