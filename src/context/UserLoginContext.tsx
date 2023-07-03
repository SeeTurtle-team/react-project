import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface UserLoginContextProviderProps {
    isLogin: boolean;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
  }

const UserLoginContextDefaultValue ={
    isLogin: false,
    setIsLogin: (isLogin) => {}
  } as UserLoginContextProviderProps
  

export const UserLoginContext = createContext(UserLoginContextDefaultValue);


type UserLoginProvideProps = {
    children: React.ReactNode
}

export default function UserLoginProvider({children} : UserLoginProvideProps)
{
    const [isLogin, setIsLogin] = useState(false);

    return(
        <UserLoginContext.Provider value={{isLogin, setIsLogin}}>
            {children}
        </UserLoginContext.Provider>
    )
}