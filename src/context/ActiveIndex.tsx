import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface ActiveIndexContextProviderProps {
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
  }

const ActiveIndexContextDefaultValue ={
    activeIndex: 0,
    setActiveIndex: (isLogin) => {}
  } as ActiveIndexContextProviderProps
  

export const ActiveIndexContext = createContext(ActiveIndexContextDefaultValue);


type ActiveIndexProvideProps = {
    children: React.ReactNode
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