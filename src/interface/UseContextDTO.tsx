import { Dispatch, SetStateAction } from "react";

export interface ActiveIndexDTO {
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
  }

export interface IsLoginDTO {
isLogin: boolean;
setIsLogin: Dispatch<SetStateAction<boolean>>;
}