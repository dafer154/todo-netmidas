import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <ul className="nav">
                <Link to="/"><li>Home</li></Link>
                <Link to="/chart"><li>Chart</li></Link>
            </ul>
        </div>
    )
}

export default Header
