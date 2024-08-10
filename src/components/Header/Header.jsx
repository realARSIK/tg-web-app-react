import React from "react";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";



const Header = () => {
    const {user, onClose} = useTelegram()

    return (
        <>
            <header className="header">
                <Button onClick={onClose}>Close</Button>
                <span className={"username"}>{user}</span>
            </header>
        </>
    )
}

export default Header;