import { Viewer } from '@toast-ui/react-editor';
import { useParams } from "react-router";

import React, { useContext, useEffect, useState } from 'react';
import { ActiveIndexContext, ActiveIndexContextProviderProps } from '../../context/ActiveIndexContext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import BoardComment from '../Board/BoardComment';
import { useCookies } from 'react-cookie';

const EbookState = () => {
    const { index } = useParams();
    // const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps =
    // useContext(ActiveIndexContext);
    const [text, setText] = useState<string>("<h2>test</h2><p>a");
    const [cookies, setCookie, removeCookie] = useCookies(["id"]);
    const accessToken = cookies.id;
    const headers = {Authorization:'Bearer '+accessToken};

    // parmas로 boardList에서 axios.get으로 조회하여 받아온 값 화면에 뿌리기
    // axios.get("url", "{json}", "{header}")

    useEffect(() => {
        // setActiveIndex(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleEbookLike = () => {
        console.log("ebooklike");
    }

    const goToEbookEdit = (index:number) => {
        console.log("ebookEdit", index);
    }
    
    const handleEbookDelete = (index:number) => {
        console.log("ebookDelete");
    }

    return (
        <div className="card">
      <Card
        style={{ marginBottom: "2rem", backgroundColor: "transparent" }}
        title='title'
        // className="min-h-screen"
      >
        <Viewer 
        initialValue={text}
         />
      </Card>
      <div style={{ marginBottom: "1rem" }}>
        <span>
          <Button
            icon="pi pi-thumbs-up"
            rounded
            outlined
            className="mr-2"
            onClick={() => handleEbookLike()}
            style={{ marginRight: "1rem" }}
          />
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className="mr-2"
            onClick={() => goToEbookEdit(Number(index))}
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => handleEbookDelete(Number(index))}
          />
          <p className="m-0">
            추천수: 
            {/* {board?.recommendCount == null ? 0 : board?.recommendCount} */}
          </p>
          <p className="m-0" style={{ marginRight: "2rem" }}>
            작성일: 
            {/* {dateFormatFunc(board?.dateTime)} */}
          </p>
        </span>
      </div>
      <h2>댓글</h2>
      {/* <BoardComment index={index} /> */}
    </div>
    );
};

export default EbookState;