import React, { useState, useRef, useLayoutEffect } from 'react'
import axios from 'axios';

interface Props {
    todo: todoItem[];
    setTodo: React.Dispatch<React.SetStateAction<todoItem[]>>;
}
interface todoItem {
    id:number;
    todo:string;
}


export const ProductService = ({todo, setTodo}:Props) => {
    const [input , setInput] = useState<string>("");
    const [todoText, setTodoText] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [todoIndex, setTodoIndex] = useState<any>();
    const focusRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        if (focusRef.current !== null) focusRef.current.focus();
      });

    const handleClick = async () => {
    const addRecordEndpoint = "http://localhost:5000/insertOne";
    axios.post(addRecordEndpoint, {
        todo: input
    })
    .then(res => res.data.body)
    .then(res=>console.log(res));

    setInput("");
    }
    
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }
    const handleInputEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            const addRecordEndpoint = "http://localhost:5000/insertOne";
            axios.post(addRecordEndpoint, {
                todo: input
            })
            .then(res => res.data.body)
            .then(res=>console.log(res));

            setInput("");
        }
    }
    const handleEdit = (index:number) => {
        setTodoText(todo[index].todo);
        setTodoIndex(index);
    }
    const handleDelete = (index:number) => {
        const indexId:number = todo[index].id;
        axios.get("http://localhost:5000/delete/" + indexId)
        .then(res => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const handleTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }
    const handleEditButton = () => {
        const addRecordEndpoint = "http://localhost:5000/modifyOne";
        axios.post(addRecordEndpoint, {
            id: todo[todoIndex].id,
            todo: todoText
        })
        .then(res => res.data.body)
        .then(res=>console.log(res));

        setTodoText("");
    }
    const handleEditText = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    }
    const handleTextEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            const addRecordEndpoint = "http://localhost:5000/modifyOne";
            axios.post(addRecordEndpoint, {
                id: todo[todoIndex].id,
                todo: todoText
            })
            .then(res => res.data.body)
            .then(res=>console.log(res));

            setTodoText("");
        }
    }

  return (
    <div>
        <input 
        type="text" 
        placeholder='add todo item'
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputEnter}
        />
        <button
        onClick={handleClick}
        >Add</button>
        <br />


        <input 
        type="text" 
        placeholder='search todoItem' 
        value={text}
        onChange={handleTextChange}
        />
        <br />

        <input 
        type="text"
        placeholder={todoText !== null ? "todoEdit" : todoText}
        value={todoText}
        onChange={(e) => handleEditText(e)}
        onKeyDown={handleTextEnter}
        />
        <button
        onClick={handleEditButton}
        >Edit</button>


        <table>
            <thead>
                <tr>
                    <th>NO</th>
                    <th>TODO</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {todo.filter((todo:todoItem) => {
                    return text.toLowerCase() === '' ? todo : todo.todo.toLowerCase().includes(text)
                }).map((todo:todoItem, index:number) => {
                    return <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.todo}
                        </td>
                        <td><button onClick={() => handleEdit(index)}>edit</button></td>
                        <td><button onClick={() => handleDelete(index)}>delete</button></td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  )
}
