import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { errorHandle } from '../../Common/ErrorHandle';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const EbookEdit = () => {
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [cookies, setCookie, removeCookie] = useCookies(["id"]);
    const accessToken = cookies.id;
    console.log(accessToken);
    const headers = { Authorization: "Bearer " + accessToken };
    const editor = useRef<any>();
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log('submit');
    }

    const uploadImage = async (blob:any) => {
        const img = blob;
        console.log(img);
      
        const formData = new FormData();
        formData.append("file", img);
      
        try {
          const s3UrlResponse = await axios.get("/board/s3url", { headers });
          console.log(s3UrlResponse);
      
          const presignedURL = s3UrlResponse.data.data;
      
          await fetch(presignedURL, {
            method: "PUT",
            headers: {
              "Content-Type": img.type,
            },
            body: img,
          });
          console.log(s3UrlResponse.data.data.split('?')[0]);
          const imgURL:string = s3UrlResponse.data.data.split('?')[0];
          return imgURL;
        } catch (error: any) {
          console.log(error);
          const errCode = errorHandle(error.response.status);
          navigate(`/ErrorPage/${errCode}`);
      }
      }

    return (
        <div className="card">
      <span className="p-float-label">
        <InputText
          id="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          size={80}
        />
        <label htmlFor="Title">title</label>
      </span>
      <h2>Content</h2>
      <Editor
            onChange={() => setText(editor.current.getInstance().getHTML())}
            initialValue=""
            ref={editor}
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            toolbarItems={[
                ['heading', 'bold', 'italic', 'strike', ],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock']
              ]}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                    const url = await uploadImage(blob);
                    callback(`${url}`,'alt text');
                    return false;
                }
              }}
            />

      <Button label="Submit" onClick={handleSubmit} />
    </div>
    );
};

export default EbookEdit;