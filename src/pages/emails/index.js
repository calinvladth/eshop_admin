import React, {useEffect} from 'react'
import SectionSlotComponent from "../../components/section_slot";
import style from './index.module.sass'
import TitleComponent from "./components/title";
import ItemComponent from "./components/item";
import {useDispatch, useSelector} from "react-redux";
import {GetEmails} from "../../redux/emails/actions";
import Pagination from "../../components/pagination";

export const EmailsPath = '/emails'

const EmailsPage = () => {
    const dispatch = useDispatch()
    const {emails} = useSelector(state => state)

    useEffect(() => {
        document.title = 'Emails List'
        pagination()
        // eslint-disable-next-line
    }, [dispatch])


    const pagination = (page = 1) => {
        dispatch(GetEmails(page))
    }
    return (
        <div className={style.box}>
            <SectionSlotComponent
                title={'Emails list'}>
                {
                    emails.success && emails.loaded && emails.data.length > 0
                        ?
                        <Pagination data={emails.pagination} action={pagination}>
                            <div className={style.boxContent}>
                                <div>
                                    <TitleComponent/>
                                </div>

                                {
                                    emails.data.map(o => <div key={o.id}>
                                        <ItemComponent email={o}/>
                                    </div>)
                                }

                            </div>
                        </Pagination>
                        :
                        <div>
                            {
                                emails.loaded ? <p>No email found</p> : <p>Loading ...</p>
                            }

                        </div>
                }


            </SectionSlotComponent>
        </div>
    )
}
export default EmailsPage