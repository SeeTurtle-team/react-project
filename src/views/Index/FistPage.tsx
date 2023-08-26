import { Button } from 'primereact/button';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { useState, useEffect, useContext } from 'react';
import { ProductService } from '../../service/ProductService';
import { Fieldset } from 'primereact/fieldset';
import { ActiveIndexContext, ActiveIndexContextProviderProps } from '../../context/ActiveIndexContext';
import PopularEbook from './PopularEbook';
import LastBoard from './LastBoard';

const FirstPage = () => {
    const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps =
    useContext(ActiveIndexContext);

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

    const getSeverity = (product: Product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
        setActiveIndex(0);
    }, []);

    const productTemplate = (product: Product) => {
        return (
            <div >
                <div className="mb-3">
                    <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
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
                    <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                        autoplayInterval={3000} itemTemplate={productTemplate} />
                </Fieldset>
            
            </div>

            <div className="card" style={{float:'left', width:'49%'}}>
                <PopularEbook/>
            </div>

            <div className="card" style={{float:'left', width:'49%',marginLeft:'2%'}}>
                <LastBoard/>
            </div>
        </>
        
    )

}

export default FirstPage;