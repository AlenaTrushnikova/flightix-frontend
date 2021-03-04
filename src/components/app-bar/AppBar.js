import React, {Component} from 'react'
import LoginButton from "./LoginButton"
import Logo from "./Logo";
// import UserMenu from "./UserMenu"

class AppBar extends Component {
    render() {
        return (
            <nav className="AppBar navbar shadow container-fluid sticky-top">
                <Logo/>
                <LoginButton/>
            </nav>
        )
    }
}

export default AppBar