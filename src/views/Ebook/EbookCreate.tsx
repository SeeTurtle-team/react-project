import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { InputText } from 'primereact/inputtext';
import { useCookies } from 'react-cookie';
import axios from "axios";
import 'primeicons/primeicons.css';
import { errorHandle } from '../../Common/ErrorHandle';
import EbookState from './EbookState';
// import '@toast-ui/editor/dist/toastui-editor-viewer.css';​

const EbookCreate = () => {
    const [title, setTitle] = useState<string>("");
    const [cookies, setCookie, removeCookie] = useCookies(["id"]);
    const accessToken = cookies.id;
    const headers = {Authorization:'Bearer '+accessToken}
    const editor = useRef<any>();
    const navigate = useNavigate();
    

    const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {};
    // const fileInputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = () => {
        console.log("submit");
        console.log(`'${editor.current.getInstance().getHTML()}'`);
        // axios.post("/board/imgurl", {
        //     title:title,
        //     text:`'${editor.current.getInstance().getHTML()}'`
        // },{
        //     headers: headers
        // })
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
        <div>
            <h2>Title</h2>
            <div style={{marginBottom: "1rem"}}>
            <InputText
            id="Title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            onKeyDown={handleInputEnter}
            size={80}
            />
            </div>
            <h2>Content</h2>
            <div style={{ marginBottom: "1rem", backgroundColor: "white" }}>
            <Editor
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
            </div>
            {/* <EbookState /> */}
            <Button
            onClick={handleSubmit}
            >작성하기</Button>
        </div>
    );
};

export default EbookCreate;