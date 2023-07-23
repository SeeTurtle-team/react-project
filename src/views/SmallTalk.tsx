import { io } from "socket.io-client";
import { SmallChatDto } from "../interface/SmallChatDto";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const socket = io('http://localhost:5000/chat');


const SmallTalk = () => {
    const [chats,setChats] = useState<SmallChatDto[]>([]);
    const [message, setMessage] = useState<String>('');

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
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

    return(
        <>
            <form method="submit" onSubmit={onSendMessage}>
                <input type='text' onChange={onChange}/>
                <input type="submit" value="Submit"/>

            </form>
           
        </>
    )
}

export default SmallTalk;