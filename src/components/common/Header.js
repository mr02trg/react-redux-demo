import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activeStyle = { color: "red" };

    return (
        <nav className="navbar navbar-light bg-light">
            <NavLink exact to="/" activeStyle={activeStyle} >Home</NavLink>
            <NavLink to="/about" activeStyle={activeStyle} >About</NavLink>
            <NavLink to="/courses" activeStyle={activeStyle} >Courses</NavLink>
        </nav>
    );
}

export default Header;