import React, { useContext, useEffect, useState } from "react";
import {
  ActiveIndexContext,
  ActiveIndexContextProviderProps,
} from "../../context/ActiveIndexContext";
import { useCookies } from "react-cookie";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router";

import "../../css/EbookList.css";

const EbookList = () => {
  const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps =
    useContext(ActiveIndexContext);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const accessToken = cookies.id;
  const headers = { Authorization: "Bearer " + accessToken };
  const navigate = useNavigate();

  useEffect(() => {
    setActiveIndex(2);
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const goToEbookCreate = () => {
    navigate("/EbookCreate");
  };

  const filterSearch = () => {};

  return (
    <div className="card">
      <div className="inputContainer">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            onInput={handleSearch}
            value={inputSearch}
          />
        </span>

        {/* <div className="createButtonContainer"> */}
        <span className="createButtonContainer">
          <Button
            label="Create"
            style={{ marginLeft: "57rem" }}
            onClick={goToEbookCreate}
          />
        </span>
      </div>
      <DataTable
        // value={filterSearch}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={10}
        // onRowClick={boardState}
      >
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Title"></Column>
        {/* <Column field="category" header="Category"></Column> */}
        <Column field="nickname" header="Nickname"></Column>
        <Column field="dateTime" header="Time"></Column>
      </DataTable>
    </div>
  );
};

export default EbookList;
