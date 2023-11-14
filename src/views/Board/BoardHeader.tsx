import React, { useContext, useEffect, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
// import { UserLoginContext } from "../context/UserLoginContext";
import { ActiveIndexContext } from "../../context/ActiveIndexContext";
import { ActiveIndexContextProviderProps } from "../../interface/UseContextDTO";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function BoardHeader() {
  const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps = useContext(ActiveIndexContext);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-fw pi-home", command: () => navigate("/") },
    { label: "Board", icon: "pi pi-fw pi-calendar", command: () => navigate("/BoardList") },
    { label: "EBook", icon: "pi pi-fw pi-calendar", command: () => navigate("/EbookList") },
    { label: "QnA", icon: "pi pi-fw pi-calendar", command: () => navigate("/QnAList") },
    { label: "SmallTalk", icon: "pi pi-fw pi-calendar", command: () => navigate("/smallTalkList") },
    { label: "MyPage", icon: "pi pi-fw pi-user", command: () => navigate("/MyPage") },
    (isLogin)
      ? {
        label: "Logout", icon: "pi pi-sign-out", command: () => {
          setIsLogin(false);
          removeCookie("id");
          alert("로그아웃 되었습니다");
          navigate("/");
        }
      }
      : {
        label: "Login", icon: "pi pi-sign-in", command: () => {
          setIsLogin(true);
          navigate("/Login");
        }
      }
  ];

  useEffect(() => {
    if (cookies.id != undefined) {
      setIsLogin(true);
    }
    if (activeIndex === 5 && isLogin === true) {
      setIsLogin(false);
      removeCookie("id");
      alert("로그아웃 되었습니다");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



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