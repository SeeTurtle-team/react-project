import { io } from "socket.io-client";
import { SmallChatDto } from "../../interface/SmallChatDto";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";

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
  const [chats, setChats] = useState<SmallChatDto[]>([]);
  const [message, setMessage] = useState<String>('');
  const chatContainerEl = useRef<HTMLDivElement>(null);

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
      const messageHandler = (chat: SmallChatDto) =>
        setChats((prevChats) => [...prevChats, chat]);
      socket.on('message', messageHandler);
  
  
      return () => {
        socket.off('message', messageHandler);
      };

      //setChats(test.getlist());
    }, []);


  const onSendMessage = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message) return alert('메시지를 입력해 주세요.');

      console.log(message);
      socket.emit('message', message, (chat: SmallChatDto) => {
        setChats((prevChats) => [...prevChats, chat]);
        setMessage('');
      });
    },
    [message]
  );

  return (
    <>
      <div>
        {chats.map((chat,index) => (
          <div>
            {chat.userId} : {chat.smallChat}
          </div>
        ))}
      </div>



      <form method="submit" onSubmit={onSendMessage}>
        <input type='text' onChange={onChange} />
        <input type="submit" value="Submit" />

      </form>

    </>
  )
}

export default SmallTalk;