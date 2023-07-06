import { Dispatch, SetStateAction } from "react";

export interface ActiveIndexContextProviderProps {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

export interface UserLoginContextProviderProps {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}
