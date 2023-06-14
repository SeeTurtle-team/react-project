import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

const BoardSearch = () => {
  const [inputSearch, setInputSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    console.log(inputSearch);
  };

  return (
    <span className="p-input-icon-left" style={{marginBottom:'1rem'}}>
      <i className="pi pi-search" />
      <InputText
        placeholder="Search"
        onInput={handleSearch}
        value={inputSearch}
      />
    </span>
  );
};

export default BoardSearch;
