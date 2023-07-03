import { Dispatch, SetStateAction, createContext } from "react";
interface UserLoginContext {
    isLogin: boolean | null;
    setIsLogin: Dispatch<SetStateAction<boolean | null>>;
  }
export const UserLoginContextDefaultValue = createContext<UserLoginContext>({
    isLogin: false,
    setIsLogin: () => {}
  })

export const UserLoginContext = createContext(null);