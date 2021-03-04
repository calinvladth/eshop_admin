import React, {useState} from 'react'
import style from './index.module.sass'
import LeftArrowSvg from "../../assets/icons/left_arrow";
import RightArrowSvg from "../../assets/icons/right_arrow";

const pagination = {
    limit: 6,
    total_pages: 3,
    current: 1
}

const Pagination = ({data = pagination, align = 'center', info = true, action, children}) => {
    const limit = data.limit
    const total = data.total_pages
    const total_items = data.total_items
    const [current, setCurrent] = useState(1)

    const pageNumbersStyle = {
        justifyContent: align
    }


    const pageNumbers = []

    for (let i = 1; i <= total; i++) {
        pageNumbers.push(i)
    }

    function changePage(page) {
        action(page)
        setCurrent(page)
    }

    return (
        <div>
            {
                info && <div className={style.boxInfo}>
                    <p>Showing {current * limit - limit + 1} - {total_items} of {total_items} results</p>
                </div>
            }


            <div className={style.boxChild}>
                {children}
            </div>

            <div className={style.boxPages} style={pageNumbersStyle}>
                <div className={`${style.page} ${style.pageChange}`}>
                    {current - 1 >= 1 &&
                    <span onClick={() => changePage(current - 1)}>
                    <LeftArrowSvg/>
                </span>}
                </div>

                {
                    pageNumbers.map(o => {
                        // If the page matches the condition, show it
                        let show = false

                        if (current + 1 === o || current - 1 === o) show = true
                        if (current === 1 && current + 2 === o) show = true
                        if (current === total && current - 2 === o) show = true
                        if (current === o) show = true

                        return show && <span
                            key={o}
                            className={`${style.page} ${current === o && style.current}`}
                            onClick={() => changePage(o)}
                        >{o}</span>
                    })
                }
                <div className={`${style.page} ${style.pageChange}`}>
                    {current + 1 <= total &&
                    <span onClick={() => changePage(current + 1)}>
                    <RightArrowSvg/>
                </span>}
                </div>
            </div>
        </div>
    )
}

export default Pagination
