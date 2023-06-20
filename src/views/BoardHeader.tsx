import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";

const BoardHeader = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-fw pi-home", url: "/" },
    { label: "Board", icon: "pi pi-fw pi-calendar", url: "/BoardList" },
    { label: "Login", icon: "pi pi-sign-in", url: "/Login" },
  ];

  return <TabMenu model={items} style={{marginBottom:'1rem'}} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />;
};

export default BoardHeader;
