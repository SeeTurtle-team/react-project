import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Board } from "../../interface/BoardListDto";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { errorHandle } from "../../Common/ErrorHandle";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import { SearchOptioninterface } from "../../interface/SearchOption";
import { dateFormatFunc } from "../../Common/DateFormat";
import { ActiveIndexContext } from "../../context/ActiveIndexContext";
import { ActiveIndexContextProviderProps } from "../../interface/UseContextDTO";
import { BoardCategoryDto } from "../../interface/BoardCategoryDto";
import { useCookies } from "react-cookie";
import { useQuery, useMutation } from "react-query";
import "../../css/BoardList.css";

const BoardList = () => {
  const [board, setBoard] = useState<Board[]>([]);
  const [boardCategory, setBoardCategory] = useState<BoardCategoryDto[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const pagiNation = useRef<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [first, setFirst] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedSearchOption, setSelectedSearchOption] =
    useState<SearchOptioninterface>();
  const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps =
    useContext(ActiveIndexContext);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const accessToken = cookies.id;
  const headers = {Authorization:'Bearer '+accessToken};
  const navigate = useNavigate();
  axios.defaults.baseURL = "http://localhost:5000";


  const searchOptions = [
    { name: "Title", code: "t" },
    { name: "User", code: "u" },
  ];

  const { isSuccess, isError, isLoading, isFetching, data, error } = useQuery(
    'getBoardList',
    () => axios.get(`/board/?pageNo=${pagiNation.current}`, {headers}),
    {
      onSuccess: (data) => {
        console.log("onSuccess", data);
        console.log(data.data);
        console.log(data.data.totalPage);
        setBoard(data.data.items);
        setTotalCount(data.data.totalPage);
      },
      onError: (error) => {
        console.log("onError", error);
      },
      staleTime: 60000,
      cacheTime: Infinity,
    }
  );

  if (isFetching) {
    console.log("fetching...");
  }

  if (isLoading) {
    console.log("loading...");
  }

  if (isError) {
    console.log("error", error);
  }

  if (isSuccess) {
    console.log("success");
  }

  useEffect(() => {
    // setFirst(pagiNation.current);
    if(isSuccess && data){
      setBoard(data.data.items);
    }
    const FetchUsers = async () => {
      setActiveIndex(1);
      try {
        const res = await axios.get("/board/category",{headers});
        setBoardCategory(res.data);
        console.log(boardCategory);

        // const response = await axios.get("/board",{headers});
        // setBoard(response.data);

      } catch (error: any) {
        console.log(error);
        const errCode = errorHandle(error.response.status);
        navigate(`/ErrorPage/${errCode}`); // error 발생 시 이전 page 이동
      }

      // board.forEach(element => {
      //   element.board_dateTime = dateFormatFunc(element.board_dateTime)
      // });
    };

    FetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const goToBoardCreate = () => {
    navigate("/BoardCreate");
  };

  const boardState = (event: any) => {
    console.log(event.data);
    const index = event.data.id;
    navigate(`/BoardState/${index}`);
  };
  // const filterSearch = board.filter((Board: any) => {
  //   console.log(selectedSearchOption);
  //   Board.dateTime = dateFormatFunc(Board.dateTime);
  //   if (selectedSearchOption?.code === "u") {
  //     return Board.nickname?.toLowerCase().includes(inputSearch.toLowerCase());
  //   } else {
  //     return Board.title?.toLowerCase().includes(inputSearch.toLowerCase());
  //   }
  // });

  const categorySearch = async (e: any) => {
    console.log(e.id);
    const categoryId = e.id;
    try {
      setBoard([]);
      if (categoryId == 0) {
        const response = await axios.get("/board" ,{headers});
        setBoard(response.data);
      } else {
        const response = await axios.get(`/board/categoryList/${categoryId}` ,{headers});
        setBoard(response.data);
      }
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };

  const handleSearchButton = () => {
    
  }

  const changePage = async (newPage: number) => {
    try {
      const response = await axios.get(`/board/?pageNo=${newPage}`, { headers });
      console.log(response);
      setBoard(response.data.items);
      setTotalCount(response.data.totalPage);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const onPageChange = (event:any) => {
    console.log(event);
    setFirst(event.first);
    setRowsPerPage(event.rows);
    pagiNation.current = event.page;
    changePage(event.page);
  };

  return (
    <div className="card">
      <div style={{marginBottom: "1rem"}}>
      <Dropdown
        value={selectedSearchOption}
        onChange={(e) => setSelectedSearchOption(e.value)}
        options={searchOptions}
        optionLabel="name"
        placeholder="Title"
        // className="w-full md:w-14rem"
        size={10}
        style={{ marginRight: "1rem" }}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          placeholder="Search"
          onInput={handleSearch}
          value={inputSearch}
        />
      </span>
      <span style={{marginLeft:'1rem'}}>
        <Button
        label="검색"
        onClick={handleSearchButton}
        />
      </span>
      </div>
      <div style={{marginBottom: "1rem"}}>
      <span className="inputContainer">
      <Dropdown
        value={boardCategory}
        onChange={(e) => categorySearch(e.value)}
        options={boardCategory}
        optionLabel="category"
        placeholder="Category"
        // className="w-full md:w-14rem"
        size={20}
      />
        <span className="createButtonContainer">
        <Button
          label="Create"
          onClick={goToBoardCreate}
        />
        </span>
      </span>
      </div>
      <DataTable
        value={board}
        tableStyle={{ minWidth: "50rem" }}
        // paginator
        rows={10}
        onRowClick={boardState}
      >
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="nickname" header="Nickname"></Column>
        <Column field="dateTime" header="Time"></Column>
      </DataTable>
      <Paginator
        first={first}
        rows={rowsPerPage}
        totalRecords={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default BoardList;