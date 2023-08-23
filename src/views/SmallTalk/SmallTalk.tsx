import { io } from "socket.io-client";
import { SmallTalkDto } from "../../interface/SmallTalkDto";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from "primereact/divider";
import { errorHandle } from "../../Common/ErrorHandle";
import { SmallSubCreateDto } from "../../interface/SmallSubCreate.Dto";
;

const socket = io('http://localhost:5000/chat');


const SmallTalk = () => {
  const [chats, setChats] = useState<SmallTalkDto[]>([]);
  const [smallSubCreate, setSmallSubCreate] = useState<SmallSubCreateDto>({
    title:"",
    detail:"",
    imgUrl:""
  });
  const [message, setMessage] = useState<string>('');
  const chatContainerEl = useRef<HTMLDivElement>(null);
  const { roomId } = useParams();
  const navigate = useNavigate();


  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const accessToken = cookies.id;
  const headers = { Authorization: 'Bearer ' + accessToken }

  const onChange = useCallback((e: any) => {
    setMessage(e.target.value);
  }, []);

  // 채팅이 길어지면(chats.length) 스크롤이 생성되므로, 스크롤의 위치를 최근 메시지에 위치시키기 위함
  useEffect(() => {
    if (!chatContainerEl.current) return;


    const chatContainer = chatContainerEl.current;
    const { scrollHeight, clientHeight } = chatContainer;


    if (scrollHeight > clientHeight) {
      chatContainer.scrollTop = scrollHeight - clientHeight;
    }
  }, [chats.length]);


  // message event listener
  useEffect(() => {
    getList();
    const messageHandler = (chat: SmallTalkDto) =>
      setChats((prevChats) => [...prevChats, chat]);
    socket.on('message', messageHandler);

    socket.emit('join-room', roomId);
    return () => {
      socket.off('message', messageHandler);
    };

    //setChats(test.getlist());
  }, []);


  const getList = async () => {
    try {
      const response = await axios(`/small-talk/getSmallTalk/${roomId}`, { headers });
      setChats(response.data.list)
    } catch (error: any) {
      console.log(error)
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }


  }

  const onSendMessage = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message) return alert('메시지를 입력해 주세요.');

      console.log(message);
      socket.emit('message', { roomId, message, headers }, (chat: SmallTalkDto) => {
        //console.log(chat)
        setChats((prevChats) => [...prevChats, chat]);
        setMessage('');
      });
    },
    [message, roomId]
  );

  return (
    <div className="card">
      <div>
        {chats.map((chat, index) => (
          <div className='chatBox' style={{ marginTop: '0.5rem', border: 'solid 0.1px', borderRadius: '10px', background: '#f4f5f5' }}>
            <h3 style={{ marginLeft: '1rem' }}>{chat.userName}의 의견</h3>
            <Divider />
            <p style={{ marginLeft: '1rem' }} >
              {chat.contents}
            </p>
          </div>




        ))}
      </div>
      <Divider />
      <br />
      <div >
        <form method="submit" onSubmit={onSendMessage} >
          {/* <input type='text' value={message} onChange={onChange} /> */}
          <label htmlFor="의견 제시하기" style={{ display: 'block' }}>의견 제시하기</label>
          <InputTextarea
            // inputid="description"
            style={{ display: 'block', marginTop: '0.5rem' }}
            name="description"
            rows={4}
            cols={100}
            // className={classNames({ 'p-invalid': isFormFieldInvalid('description') })}
            value={message}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <Button style={{ height: '3rem', marginTop: '0.5rem' }} label="Submit" type="submit" icon="pi pi-check" />

        </form>
      </div>


    </div>
  )
}

export default SmallTalk;