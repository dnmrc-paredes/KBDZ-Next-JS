import React from "react";

// Styles
import s from './footer.module.scss'

export const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer className={s.footer}>
            <p> Copyright &copy; KBDZ {year}, All Rights Reserved. </p>
        </footer>
    )

}