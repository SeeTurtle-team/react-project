import React, { useContext, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
import { UserLoginContext } from "../context/UserLoginContext";
import { ActiveIndexContext } from "../context/ActiveIndexContext";

function BoardHeader() {
  const {activeIndex, setActiveIndex}:any = useContext(ActiveIndexContext);
  const {isLogin, setIsLogin}:any = useContext(UserLoginContext);
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-fw pi-home", url: "/" },
    { label: "Board", icon: "pi pi-fw pi-calendar", url: "/BoardList" },
    isLogin
      ? { label: "Logout", icon: "pi pi-sign-in", url: "/" }
      : (activeIndex === 2 && isLogin === false ) ? { label: "Logout", icon: "pi pi-sign-in", url: "/" }
      : { label: "Login", icon: "pi pi-sign-in", url: "/Login" }
  ];
  console.log(activeIndex);
  console.log(isLogin);

  return (
    <TabMenu
      model={items}
      style={{ marginBottom: "1rem" }}
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)} />
  );
}

export default BoardHeader;
