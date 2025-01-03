import React from "react";
import '../assets/header/header.css'
import {Link} from "react-router-dom";
import Navbar from "./navbar/Base.tsx";

const Header: React.FC = () => {
    return (
        <header>
            <div className="nav-area">
                <Link to={'/'} className="logo">
                    Logo
                </Link>
                <Navbar/>
            </div>

        </header>
    )
}

export default Header;