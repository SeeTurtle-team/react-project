import { useEffect, useState } from "react";
import { TabPanel, TabPanelPassThroughOptions, TabView } from 'primereact/tabview';
import { Avatar } from 'primereact/avatar';
import { Image } from "primereact/image";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { GetEbookListDto } from "../../interface/GetEbookListDto";
import { Board } from "../../interface/BoardListDto";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useQuery } from "react-query";
import { User } from "../../interface/UserAddInfo";

const tabPanelPt: TabPanelPassThroughOptions = { 
  root: {
    style: { width: "100%" }
  },
  header: {
    style: { display: "flex", justifyContent: "center" }
  },
  content: {
    style: { minHeight: "160px", marginTop: "8px" }
  }
}

const NoData = () => <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "gray", width: "100%" }}>No Data</div>;

const MyPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies(["id"]);
  const { data: userInfo } = useQuery<User>({
    queryKey: ["userInfo"],
    queryFn: () => 
      axios
        .get(`http://localhost:5000/user/info`, { 
          headers: {
            Authorization: `Bearer ${cookies.id}`
          }
        })
        .then(res => res.data.userInfo)
        .catch(err => console.log(err))
  })
  const { data: ebookHistoryList } = useQuery<GetEbookListDto[]>({
    queryKey: ["ebookHistoryList"],
    queryFn: () => 
      axios
      .get(`http://localhost:5000/user/ebookHistory`, { 
        headers: {
          Authorization: `Bearer ${cookies.id}`
        }
      })
      .then(res => res.data.history.items)
      .catch(err => console.log(err))
  })
  const { data: ebookList } = useQuery<GetEbookListDto[]>({
    queryKey: ["ebookList"],
    queryFn: () => 
      axios
      .get(`http://localhost:5000/user/ebook`, { 
        headers: {
          Authorization: `Bearer ${cookies.id}`
        }
      })
      .then(res => res.data.ebook.items)
      .catch(err => console.log(err))
  })
  const { data: likedBoardList } = useQuery<Board[]>({
    queryKey: ["likedBoardList"],
    queryFn: () => 
      axios
        .get(`http://localhost:5000/user/likedBoard`, { 
          headers: {
            Authorization: `Bearer ${cookies.id}`
          }
        })
        .then(res => res.data.board.items)
        .catch(err => console.log(err))
  })
  const { data: boardList } = useQuery<Board[]>({
    queryKey: ["boardList"],
    queryFn: () => 
      axios
        .get(`http://localhost:5000/user/board`, { 
          headers: {
            Authorization: `Bearer ${cookies.id}`
          }
        })
        .then(res => res.data.board.items)
        .catch(err => console.log(err))
  })

  const logout = () => {
    removeCookie("id");
    alert("로그아웃 되었습니다");
  }

  useEffect(() => {
    axios
    .get(`http://localhost:5000/user/s3url`, { 
      headers: {
        Authorization: `Bearer ${cookies.id}`
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }, [cookies.id])

  return (
    <div className="card" style={{ width:'60%', justifyContent:'center', marginLeft:'20%' }}>
      <div className="mt-4 mb-4">
        <div className="flex text-gray-900">
          <Avatar image={"https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"} size="xlarge" shape="circle" icon="pi pi-user" className="mr-2 flex h-full" style={{ alignSelf: "center" }}/>
          <div className="mx-2">
            <div className="flex">
              <h2 className="m-0">{userInfo?.nickname}</h2>
              <Button className="pi pi-sign-out" color="#fff" text onClick={() => {
                logout();
                console.log("userInfo", userInfo);
                console.log("ebookHistoryList", ebookHistoryList)
                console.log("ebookList", ebookList);
                console.log("likedBoardList", likedBoardList);
                console.log("board", boardList);
              }}></Button>
            </div>
            <div>{userInfo?.userId}</div>
          </div>
        </div>
        
      </div>

      <TabView>
        <TabPanel header="내가 열람한 ebook" pt={tabPanelPt} contentStyle={{ display: "flex" }}>
          
          {!ebookHistoryList?.length && <NoData />}
          {ebookHistoryList?.map(ebookHistory => (
            <div style={{ width: 150, height: 150, border: "1px solid lightgray", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "8px" }}>
              {ebookHistory.coalesce === "noUrl" ?(
                <span key={ebookHistory.id}>No Image</span>
              ):(
                <Image key={ebookHistory.id} src={ebookHistory.coalesce} width="200"></Image>
              )}
            </div>
          ))}
        </TabPanel>
        <TabPanel header="내가 작성한 ebook" pt={tabPanelPt} contentStyle={{ display: "flex" }}>
          {!ebookList?.length && <NoData />}
          {ebookList?.map(ebook => (
            <div style={{ width: 150, height: 150, border: "1px solid lightgray", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "8px" }}>
              {ebook.coalesce === "noUrl" ?(
                <span key={ebook.id}>No Image</span>
              ):(
                <Image key={ebook.id} src={ebook.coalesce} width="200"></Image>
              )}
            </div>
          ))}
        </TabPanel>
      </TabView>

      <TabView>
        <TabPanel header="내가 추천한 게시글" pt={tabPanelPt}>
          <DataTable
            value={likedBoardList}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={10}
            onRowClick={(e) => navigate(`/BoardState/${e.data.id}`)}
          >
            <Column field="id" header="ID" />
            <Column field="title" header="Title" />
            <Column field="category" header="Category" />
            <Column field="nickname" header="Nickname" />
            <Column field="recommendCount" header="Recommend Count" />
            <Column field="dateTime" header="Time" />
          </DataTable>
        </TabPanel>
        <TabPanel header="내가 작성한 게시글" pt={tabPanelPt} >
          <DataTable
            value={boardList}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={10}
            onRowClick={(e) => navigate(`/BoardState/${e.data.id}`)}
          >
            <Column field="id" header="ID" />
            <Column field="title" header="Title" />
            <Column field="category" header="Category" />
            <Column field="nickname" header="Nickname" />
            <Column field="dateTime" header="Time" />
          </DataTable>
        </TabPanel>
      </TabView>

    </div>
  )
}

export default MyPage;