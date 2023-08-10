import { io } from "socket.io-client";
import { SmallTalkDto } from "../../interface/SmallTalkDto";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";

const socket = io('http://localhost:5000/chat');

const test = {
  getlist() {
    return [
      {
        userId:1,
        userName:'dasfas',
        smallChat:'dsafsadf'
      },
      {
        userId:2,
        userName:'dasfas',
        smallChat:'dsafsadf'
      },
      {
        userId:3,
        userName:'dasfas',
        smallChat:'dsafsadf'
      },
      {
        userId:4,
        userName:'dasfas',
        smallChat:'dsafsadf'
      },
      {
        userId:5,
        userName:'dasfas',
        smallChat:'dsafsadf'
      },
    ]
  }
}

const SmallTalk = () => {
  const [chats, setChats] = useState<SmallTalkDto[]>([]);
  const [message, setMessage] = useState<string>('');
  const chatContainerEl = useRef<HTMLDivElement>(null);
  const {roomId} = useParams();


  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const accessToken = cookies.id;
  const headers = {Authorization:'Bearer '+accessToken}

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
      
      socket.emit('join-room',roomId);
      return () => {
        socket.off('message', messageHandler);
      };

      //setChats(test.getlist());
    }, []);


  const getList = async () => {
    const response = await axios(`/small-talk/getSmallTalk/${roomId}`,{headers});
    setChats(response.data)

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
    [message,roomId]
  );

  return (
    <div className="card">
      <div>
        {chats.map((chat,index) => (
          <div>
            {chat.userName} : {chat.contents}
          </div>
        ))}
      </div>



      <form method="submit" onSubmit={onSendMessage}>
        <input type='text' value={message} onChange={onChange} />
        <input type="submit" value="Submit" />

      </form>

    </div>
  )
}

export default SmallTalk;