import React, { useContext, useEffect, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
// import { UserLoginContext } from "../context/UserLoginContext";
import { ActiveIndexContext } from "../../context/ActiveIndexContext";
import { ActiveIndexContextProviderProps } from "../../interface/UseContextDTO";
import { useCookies } from "react-cookie";

function BoardHeader() {
  const {activeIndex, setActiveIndex}:ActiveIndexContextProviderProps = useContext(ActiveIndexContext);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-fw pi-home", url: "/" },
    { label: "Board", icon: "pi pi-fw pi-calendar", url: "/BoardList" },
    { label: "EBook", icon: "pi pi-fw pi-calendar", url: "/EbookList" },
    { label: "SmallTalk", icon: "pi pi-fw pi-calendar", url:"/smallTalkList"},
    (isLogin)
      ? { label: "Logout", icon: "pi pi-sign-out", url: "/" }
      : { label: "Login", icon: "pi pi-sign-in", url: "/Login"},
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if(cookies.id != undefined){
      setIsLogin(true);
    } 
    if(activeIndex === 4 && isLogin === true){
      setIsLogin(false);
      removeCookie("id");
      alert("로그아웃 되었습니다");
    }
  })

  return (
    <TabMenu
      model={items}
      style={{ marginBottom: "1rem" }}
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
      />
  );
}

export default BoardHeader;