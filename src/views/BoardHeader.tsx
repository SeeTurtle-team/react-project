import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";

const BoardHeader = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-fw pi-home", url: "/" },
    { label: "BoardCreate", icon: "pi pi-fw pi-calendar", url: "/BoardCreate" },
  ];
  console.log(activeIndex);

  return <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />;
};

export default BoardHeader;
