import React, { useContext, useEffect, useState, useRef } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Toast } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";
// import { UserLoginContext } from "../context/UserLoginContext";
import { ActiveIndexContext } from "../../context/ActiveIndexContext";
import { ActiveIndexContextProviderProps } from "../../interface/UseContextDTO";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function BoardHeader() {
  const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps = useContext(ActiveIndexContext);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const show = () => {
    toast?.current?.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  const loginedMenu = [
    { label: "Home", icon: "pi pi-fw pi-home", command: () => navigate("/") },
    { label: "Board", icon: "pi pi-fw pi-calendar", command: () => navigate("/BoardList") },
    { label: "EBook", icon: "pi pi-fw pi-calendar", command: () => navigate("/EbookList") },
    { label: "QnA", icon: "pi pi-fw pi-calendar", command: () => navigate("/QnAList") },
    { label: "SmallTalk", icon: "pi pi-fw pi-calendar", command: () => navigate("/smallTalkList") },
    { label: "MyPage", icon: "pi pi-fw pi-user", command: () => navigate("/MyPage") }, 
    {
      label: "Logout", icon: "pi pi-sign-out", command: () => {
        removeCookie("id");
        alert("로그아웃 되었습니다");
        navigate("/");
      }
    }
  ];

  const notLoginedMenu = [
    { label: "Home", icon: "pi pi-fw pi-home", command: () => navigate("/") },
    { label: "Board", icon: "pi pi-fw pi-calendar", command: () => navigate("/BoardList") },
    { label: "EBook", icon: "pi pi-fw pi-calendar", command: () => navigate("/EbookList") },
    { label: "QnA", icon: "pi pi-fw pi-calendar", command: () => navigate("/QnAList") },
    { label: "SmallTalk", icon: "pi pi-fw pi-calendar", command: () => navigate("/smallTalkList") },
    {
      label: "Login", icon: "pi pi-sign-in", command: () => {
        navigate("/Login");
      }
    }
  ]

  return (
    <>
      <Toast ref={toast} />
      <TabMenu
        model={cookies.id? loginedMenu : notLoginedMenu}
        style={{ marginBottom: "1rem" }}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          console.log(e.index);
          setActiveIndex(e.index)
        }}
      />
    </>
  );
}

export default BoardHeader;