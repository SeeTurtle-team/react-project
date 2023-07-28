import { Viewer } from '@toast-ui/react-editor';

import React from 'react';

const EbookState = ({text}:any) => {
    return (
        <div>
            <Viewer 
              initialValue={text}
            />
        </div>
    );
};

export default EbookState;