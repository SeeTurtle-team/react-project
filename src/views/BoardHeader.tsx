import React, { useContext } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
import { UserLoginContext } from "../context/UserLoginContext";
import { ActiveIndexContext } from "../context/ActiveIndexContext";
import { ActiveIndexContextProviderProps, UserLoginContextProviderProps } from "../interface/UseContextDTO";

function BoardHeader() {
  const {activeIndex, setActiveIndex}:ActiveIndexContextProviderProps = useContext(ActiveIndexContext);
  const {isLogin, setIsLogin}:UserLoginContextProviderProps = useContext(UserLoginContext);
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-fw pi-home", url: "/" },
    { label: "Board", icon: "pi pi-fw pi-calendar", url: "/BoardList" },
    (isLogin)
      ? { label: "Logout", icon: "pi pi-sign-in", url: "/" }
      : { label: "Login", icon: "pi pi-sign-in", url: "/Login" }
  ];

  return (
    <TabMenu
      model={items}
      style={{ marginBottom: "1rem" }}
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)} />
  );
}

export default BoardHeader;
