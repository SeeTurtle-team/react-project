import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SmallTalkSubDto } from "../../interface/SmallTalkSub.Dto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { errorHandle } from "../../Common/ErrorHandle";
import { useCookies } from "react-cookie";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import axios from "axios";
import { HandleFileInput } from "../../Common/S3ImgUpload";
import { SmallSubCreateDto } from "../../interface/SmallSubCreate.Dto";

const SmallTalkList = () => {
    const [smallTalkSub, setSmallTalkSub] = useState<SmallTalkSubDto[]>([]);
    const [smallSubCreate, setSmallSubCreate] = useState<SmallSubCreateDto>({
        title: "",
        detail: "",
        imgUrl: ""
    }

    );

    const [searchTitle, setSearchTitle] = useState<string>('');

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(["id"]);
    const accessToken = cookies.id;
    const headers = { Authorization: 'Bearer ' + accessToken }
    const [dialogVisible, setDialogVisible] = useState<boolean>(false); //create dialog flag
    const [randomDialogVisible, setRandomDialogVisible] = useState<boolean>(false); //random dialog flag

    const [SubImgUrl, setSubImgUrl] = useState<string>('');
    axios.defaults.baseURL = "http://localhost:5000";

    const getSmallSubList = async () => {
        try {
            const res = await axios.get("/small-talk/getAllList", { headers });
            setSmallTalkSub(res.data);

        } catch (error: any) {
            const errCode = errorHandle(error.response.status);
            navigate(`/ErrorPage/${errCode}`); // error 발생 시 이전 page 이동
        }
    }

    useEffect(() => {
        getSmallSubList();
    }, []);

    const setImg = (url: string) => {
        return url === null ? `https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5064919.png` : url;
    }


    const listItem = (smallTalkSub: SmallTalkSubDto) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={setImg(smallTalkSub.imgUrl)} alt={smallTalkSub.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{smallTalkSub.title}</div>
                            {/* <Rating value={smallTalkSub.rating} readOnly cancel={false}></Rating> */}
                            <h3>{smallTalkSub.detail}</h3>
                            <span>생성자 : {smallTalkSub.nickname}</span>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    {/* <span className="font-semibold">{smallTalkSub.category}</span> */}
                                </span>
                                {/* <Tag value={smallTalkSub.inventoryStatus} severity={getSeverity(smallTalkSub)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            {/* <span className="text-2xl font-semibold">${smallTalkSub.price}</span> */}
                            <Button onClick={() => { navigate(`/smalltalk/${smallTalkSub.id}`) }}>입장</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (smallTalkSub: SmallTalkSubDto) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{smallTalkSub.title}</span>
                        </div>
                        {/* <Tag value={smallTalkSub.inventoryStatus} severity={getSeverity(smallTalkSub)}></Tag> */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={setImg(smallTalkSub.imgUrl)} alt={smallTalkSub.name} />
                        <div className="text-2xl font-bold">{smallTalkSub.name}</div>
                        {/* <Rating value={smallTalkSub.rating} readOnly cancel={false}></Rating> */}
                        <span>{smallTalkSub.detail}</span>

                    </div>
                    <div className="flex align-items-center justify-content-between">
                        {/* <span className="text-2xl font-semibold">${smallTalkSub.price}</span> */}
                        <Button onClick={() => { navigate(`/smalltalk/${smallTalkSub.id}`) }}>입장</Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (smallTalkSub: SmallTalkSubDto, layout: string) => {
        if (!smallTalkSub) {
            return;
        }

        if (layout === 'list') return listItem(smallTalkSub);
        else if (layout === 'grid') return gridItem(smallTalkSub);
    };

    // const header = () => {
    //     return (
    //         <div className="flex justify-content-end">
    //             <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
    //         </div>
    //     );
    // };

    const dialogFooterTemplate = () => {
        return <Button label="Create" icon="pi pi-check" onClick={() => createSub()} />;
    };

    const randomDialogFooterTemplate = () => {
        return <Button label="참여하기" icon="pi pi-check" onClick={() => {}} />;
    };

    const getImgUrl = async (e: any) => {

        const imgurl = await HandleFileInput(e, headers);
        if (imgurl.success === false) {
            const errCode = errorHandle(imgurl.msg);
            navigate(`/ErrorPage/${errCode}`);
        } else {
            setSubImgUrl(imgurl);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSmallSubCreate({
            ...smallSubCreate,
            [name]: value
        })
    }

    const searchSmalltalkSub = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value);
    }

    const createSub = async () => {
        setDialogVisible(false);
        console.log(smallSubCreate);

        try {
            axios.post('/small-talk/create', {
                title: smallSubCreate.title,
                detail: smallSubCreate.detail,
                imgUrl: SubImgUrl
            }, { headers }
            ).then((res) => res.data.body)
                .then((res) => {
                    console.log(res);
                    getSmallSubList();
                })

        } catch (error: any) {
            console.log(error)
            const errCode = errorHandle(error.response.status);
            navigate(`/ErrorPage/${errCode}`);
        }
    }

    const getSearchList = async () => {
        //console.log(searchTitle);
        try {
            const res = await axios.post("/small-talk/searchTitle", 
            { title:searchTitle},
            { headers });
            setSearchTitle('');
            setSmallTalkSub(res.data);

        } catch (error: any) {
            const errCode = errorHandle(error.response.status);
            navigate(`/ErrorPage/${errCode}`); // error 발생 시 이전 page 이동
        }
    }

    const enterKey = (e:any) => {
        console.log(e.key);
       
        if(e.key == 'Enter'){
            searchTitle == '' ? getSmallSubList() : getSearchList();
        }
    }
 
    return (
        <div className="card" style={{width:'60%',justifyContent:'center',marginLeft:'20%'}}>
            <div>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        placeholder="Search"
                        onInput={searchSmalltalkSub}
                        value={searchTitle}
                        onKeyDown={enterKey}
                    />
                </span>
                <span style={{ marginLeft: '1rem' }}>
                    <Button
                        label="검색"
                        onClick={getSearchList}
                    />
                </span>

                <span className="createButtonContainer">
                    <Button
                        label="Create"
                        onClick={() => setDialogVisible(true)}
                    />
                    <Button
                        label='Random'
                        style={{marginLeft:'0.5rem'}}
                        onClick={()=> setRandomDialogVisible(true)}
                    />
                </span>
            </div>

            <Divider />
            <div>

                <DataView value={smallTalkSub} itemTemplate={itemTemplate} />
            </div>


            <Dialog header="Create New Small Talk" visible={dialogVisible} style={{ width: '40vw' }} maximizable
                modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
                <div className="login-box-id" style={{ width: '30rem' }}>
                    <InputText id="title" name="title" style={{ width: '12rem' }} className="w-full" placeholder="Title" onChange={onChange} />
                </div>
                <div className="login-box-id" style={{ width: '30rem' }}>
                    <InputText id="description" name="detail" style={{ width: '12rem' }} className="w-full" placeholder="Description of Subject" onChange={onChange} />
                </div>

                <input type="file" onChange={(e) => getImgUrl(e)} />

            </Dialog>

            <Dialog header="Random Small Talk" visible={randomDialogVisible} style={{ width: '30vw' }} maximizable
                modal contentStyle={{ height: '300px' }} onHide={() => setRandomDialogVisible(false)} footer={randomDialogFooterTemplate}>
                <div className="login-box-id" style={{ width: '32rem', marginLeft:'9%' }}>
                    <h1>랜덤 토론은 랜덤으로 만난 상대와 하는 토론입니다.</h1>
                    <br/>
                    <h1>주제 역시 랜덤으로 주어지며 버튼을 누르면 상대를 찾습니다</h1>
                </div>

           
              

                {/* <input type="file" onChange={(e) => getImgUrl(e)} /> */}

            </Dialog>
        </div>
    )
}

export default SmallTalkList;