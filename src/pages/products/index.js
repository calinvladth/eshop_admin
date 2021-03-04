import React, {useEffect} from 'react'
import style from './index.module.sass'
import ItemComponent from "./components/item";
import SectionSlotComponent from "../../components/section_slot";
import {useDispatch, useSelector} from "react-redux";
import {GetProducts} from "../../redux/products/actions";
import AddSvg from "../../assets/icons/add";
import {NewProductPath} from "../new_product";
import TitleComponent from "./components/title";
import Pagination from "../../components/pagination";


export const ProductsPath = '/products'

const ProductsPage = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    useEffect(() => {
        document.title = 'Products'
        pagination()
        // eslint-disable-next-line
    }, [dispatch])

    const pagination = (page = 1) => {
        dispatch(GetProducts(page))
    }

    return (
        <div className={style.box}>
            <SectionSlotComponent
                title={`Products`}
                action={{icon: <AddSvg/>, link: NewProductPath}}
            >
                {
                    products.data.length > 0
                        ?
                        <ProductsList products={products} pagination={pagination}/>
                        :
                        <div>
                            <p>No products in the store</p>
                        </div>
                }

            </SectionSlotComponent>
        </div>
    )
}

const ProductsList = ({products, pagination}) => (
    <Pagination data={products.pagination} action={pagination}>
        <div className={style.list}>

            <div>
                <TitleComponent/>
            </div>

            {
                products.loaded
                    ?
                    products.data.map(o => <div key={o.id}>
                        <ItemComponent product={o}/>
                    </div>)
                    :
                    <div>
                        <p>Loading...</p>
                    </div>
            }
        </div>
    </Pagination>
)
export default ProductsPage