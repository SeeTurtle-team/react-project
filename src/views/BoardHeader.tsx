import React from "react";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";

const BoardHeader = () => {
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-fw pi-home", url: "/" },
    { label: "BoardCreate", icon: "pi pi-fw pi-calendar", url: "/BoardCreate" },
  ];

  return <TabMenu model={items} />;
};

export default BoardHeader;
