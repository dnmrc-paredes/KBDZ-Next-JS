import React, { FC, Dispatch, SetStateAction } from 'react'
import { IoMenuOutline, IoHomeOutline, IoHelpCircleOutline, IoPricetagOutline } from 'react-icons/io5'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Styles
import s from './sidebar.module.scss'

type Props = {
    toggle: Dispatch<SetStateAction<boolean>>
}

export const SideBar: FC<Props> = ({toggle}) => {

    return (
        <div className={s.sidebar}>

            <div className={s.closeBtn}>
                <button> <IoMenuOutline onClick={() => toggle(prev => !prev)} style={{marginRight: '0.5rem'}} size={40} color="white" /> </button>
            </div>

            <div className={s.sidebarItems}>

                <div className={s.sidebarItem}>
                    <h2> <IoHomeOutline style={{marginRight: '0.5rem'}} size={22} color="white" /> Home </h2>
                </div>
                <div className={s.sidebarItem}>
                    <h2> <IoPricetagOutline style={{marginRight: '0.5rem'}} size={22} color="white" /> All Products </h2>
                    <ul>
                        <Link href="/royal-kludge-products"> Royal Kludge </Link>
                        <Link href="/redragon-products"> Redragon </Link>
                        <Link href="/ducky-products"> Ducky </Link>
                    </ul>
                </div>
                <div className={s.sidebarItem}>
                    <h2> <IoHelpCircleOutline style={{marginRight: '0.5rem'}} size={22} color="white" /> About Us </h2>
                </div>

            </div>

        </div>
    )

}
