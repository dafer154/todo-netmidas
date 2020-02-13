import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="container-title">
                <span className="title">{''}Tudu</span>
            </div>
            <div className="container-menu">
                <div>
                    <ul className="nav">
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/chart"><li>Chart</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
