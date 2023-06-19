import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';

const BoardState = () => {
    const [head, setHead] = useState<string>('head');
    const [body, setBody] = useState<string>('body');

    return (
        <div className="card">
        <Card style={{marginBottom:'2rem'}}>
            <h2 className="m-0">
               {head}
            </h2>
        </Card>
        <Panel header="Content">
            <p className="m-0">
                {body}
            </p>
        </Panel>
    </div>
    );
};

export default BoardState;