import React from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMeun'
import './Sections/navbar.css'

function NavBar() {
    return (
        <nav className="menu">
            <div className="menu__logo">
                <a href="/">Logo</a>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu_right">
                    <RightMenu />
                </div>
            </div>
        </nav>
    )
}

export default NavBar
