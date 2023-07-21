import React, { useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const EbookCreate = () => {
    const [value, setValue] = useState<string>("");
    const [text, setText] = useState<string>("");

    const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {};
    const handleSubmit = () => {
        console.log("submit");
    }

    return (
        <div>
            <h2>Title</h2>
            <div style={{marginBottom: "1rem"}}>
            <InputText
            id="Title"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            onKeyDown={handleInputEnter}
            size={80}
            />
            </div>
            <h2>Content</h2>
            <div style={{ marginBottom: "1rem", backgroundColor: "white" }}>
            <Editor
            initialValue={text}
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            />
            </div>
            <Button
            onClick={handleSubmit}
            >작성하기</Button>
        </div>
    );
};

export default EbookCreate;