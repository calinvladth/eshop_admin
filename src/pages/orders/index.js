import React, {useEffect} from 'react'
import style from './index.module.sass'
import SectionSlotComponent from "../../components/section_slot";
import ItemComponent from "./components/item";
import {useDispatch, useSelector} from "react-redux";
import {GetOrders} from "../../redux/orders/actions";
import TitleComponent from "./components/title";
import Pagination from "../../components/pagination";

export const OrdersPath = '/orders'

const OrdersPage = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)

    useEffect(() => {
        document.title = 'Orders'
        pagination()
        // eslint-disable-next-line
    }, [dispatch])

    const pagination = (page = 1) => {
        dispatch(GetOrders(page))
    }

    return (
        <div className={style.box}>

            <section>
                <SectionSlotComponent title={'All Orders'}>


                        {
                            orders.data.length > 0
                            ?
                                <OrdersList orders={orders} pagination={pagination}/>
                                :
                                <div>
                                    <p>No orders ...</p>
                                </div>
                        }


                    {/*</Pagination>*/}

                </SectionSlotComponent>
            </section>

        </div>
    )
}

const OrdersList = ({orders, pagination}) => (
    <Pagination data={orders.pagination} action={pagination}>
        <div>
            <TitleComponent/>
        </div>


        {
            orders.data.map(o => <div key={o.id} className={style.boxItem}>
                <ItemComponent order={o}/>
            </div>)

        }
    </Pagination>
)

export default OrdersPage