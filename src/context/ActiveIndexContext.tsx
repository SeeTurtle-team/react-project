import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export interface ActiveIndexContextProviderProps {
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
  }

const ActiveIndexContextDefaultValue ={
    activeIndex: 0,
    setActiveIndex: (activeIndex:number) => {}
  } as ActiveIndexContextProviderProps
  

export const ActiveIndexContext = createContext(ActiveIndexContextDefaultValue);


type ActiveIndexProvideProps = {
    children: ReactNode
}

export default function ActiveIndexProvider({children} : ActiveIndexProvideProps)
{
    const [activeIndex, setActiveIndex] = useState(0);

    return(
        <ActiveIndexContext.Provider value={{activeIndex, setActiveIndex}}>
            {children}
        </ActiveIndexContext.Provider>
    )
}


// https://www.youtube.com/watch?v=D6kj5dgakz8 참고 영상