import { Button } from 'primereact/button';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { useState, useEffect, useContext } from 'react';
import { ProductService } from '../../service/ProductService';
import { Fieldset } from 'primereact/fieldset';
import { ActiveIndexContext, ActiveIndexContextProviderProps } from '../../context/ActiveIndexContext';
import MenuButton from './MenuButton';
import LastBoard from './LastBoard';
import PopularSmallTalk from './PopularSmallTalk';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { errorHandle } from '../../Common/ErrorHandle';
import { GetEbookListDto } from '../../interface/GetEbookListDto';

const FirstPage = () => {
    const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps =
    useContext(ActiveIndexContext);
    const navigate = useNavigate();
    const [ebookList, setEbookList] = useState<GetEbookListDto[]>([]);

    interface Product {
        id: string;
        code: string;
        name: string;
        description: string;
        image: string;
        price: number;
        category: string;
        quantity: number;
        inventoryStatus: string;
        rating: number;
    }


    const [products, setProducts] = useState<Product[]>([]);

    const responsiveOptions: CarouselResponsiveOption[] = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const getSeverity = (product: GetEbookListDto) => {
        const rating = parseInt(product.starRating);

        if(rating>=8){
            return 'danger';
        }else if(rating>=4 && rating<8){
            return 'warning'; 
        }else{
            return 'success';
        }
        // switch (product.starRating) {
        //     case 'OUTOFSTOCK':
        //         return 'danger';

        //     case 'LOWSTOCK':
        //         return 'warning';    
        //     case 'INSTOCK':
        //         return 'success';

            

            

        //     default:
        //         return null;
        // }
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
        setActiveIndex(0);
        getEbookList();
    }, []);

    const getEbookList = async () => {
        try{
            const res = await axios.get('/ebook/starRating?pageNo=1&pageSize=10');
            console.log(res.data);
            setEbookList(res.data.items);
        }catch(error:any) {
            console.log(error);
            // console.log(error.response.status)
            const errCode = error.message ==='Network Error' ? '503' : errorHandle(error.response.status);
            
            navigate(`/ErrorPage/${errCode}`); //
        }
    }

    const productTemplate = (product: GetEbookListDto) => {
        return (
            <div >
                <div className="mb-3">
                    <img src={`https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png`} alt={product.title} className="w-6 shadow-2" />
                </div>
                <div>
                    <h3 className="mb-1">{product.title}</h3>
                    <h6 className="mt-0 mb-3">${product.starRating}</h6>
                    <Tag value={product.starRating} severity={getSeverity(product)}></Tag>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div>
                </div>
            </div>
        );
    };

    const legendTemplate = (
        <div className="flex align-items-center text-primary">
            <span className="pi pi-user mr-2"></span>
            <span className="font-bold text-lg">Best Book</span>
        </div>
    );


    return (
        <>
            <div className="card">
                <Fieldset legend={legendTemplate}>
                    <Carousel value={ebookList} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                        autoplayInterval={3000} itemTemplate={productTemplate} />
                </Fieldset>
            
            </div>

            <div className="card" style={{float:'left', width:'49%'}}>
                <MenuButton/>
            </div>

            <div className="card" style={{float:'left', width:'49%',marginLeft:'2%',display:"inline-block"}}>
                <LastBoard/>
            </div>

            <div className='card' style={{display:'inline-block',width:'100%'}}>
                <PopularSmallTalk/>
            </div>
        </>
        
    )

}

export default FirstPage;