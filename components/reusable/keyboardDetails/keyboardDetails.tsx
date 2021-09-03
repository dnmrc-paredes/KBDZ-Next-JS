import React, { FC, useState } from "react";
import { User } from 'firebase/auth'
import Modal from 'react-modal';
import { useRouter } from "next/router";
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch } from "react-redux";

// Redux
import { addToCart } from "../../../redux/actions/cart";

// Contexts
import { useAuth } from "../../../contexts/authContext";

// Types
import { Ikeyboard } from "../../../types/types";

// Styles
import s from './keyboardDetails.module.scss'
import 'reactjs-popup/dist/index.css';

export const KeyboardDetailsComp: FC<{data: Ikeyboard}> = (props) => {

    const { data } = props
    const router = useRouter()
    const dispatch = useDispatch()
    const { user } = useAuth() as { user: User, isLoggedIn: boolean}

    const [notLoggedInModal, setNotLoggedInModal] = useState(false)

    return (
        <div className={s.itemInfo}>
            <h1> Specifications </h1>
            <h2> {data.name} </h2>
            <ul>
                <li> Price: <strong> &#8369;{data.price} </strong> </li>
                <li> Switches: <strong> {data.switches} </strong> </li>
                <li> Connectivity: <strong> {data.usbConnector} </strong> </li>
                <li> Weight: <strong> {data.weight} </strong> </li>
            </ul>

            <button onClick={() => {
                user ? dispatch(addToCart(data.name!, data.price!)) : setNotLoggedInModal(true)
            }}> Add To Cart <IoCartOutline style={{marginLeft: '0.2rem'}} size={20} /> </button>

            <Modal ariaHideApp={false} onRequestClose={() => setNotLoggedInModal(false)} style={{content: {
                display: 'flex',
                backgroundColor: 'white',
                height: '200px',
                width: '500px',
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: `0px 0px 2px 0px rgba(0,0,0,0.75)`
            }}} isOpen={notLoggedInModal} >
                <div className={s.modalInfo}>
                    <h3> You must be logged in to proceed </h3>
                    <button onClick={() => router.push('/login')}> Login </button>
                </div>
            </Modal>

        </div>
    )

}