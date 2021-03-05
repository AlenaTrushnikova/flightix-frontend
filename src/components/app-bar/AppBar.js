import React, {Component} from 'react'
import LoginButton from "./LoginButton"
import Logo from "./Logo";
import UserMenu from "./UserMenu"

class AppBar extends Component {

    render() {
        if (Object.keys(this.props.user).length === 0) {
            return (
                <nav className="AppBar navbar shadow container-fluid sticky-top">
                    <Logo/>
                    <LoginButton/>
                </nav>
            )
        }
        return (
            <nav className="AppBar navbar shadow container-fluid sticky-top">
                <Logo/>
                <UserMenu handleLogout={this.props.handleLogout}/>
            </nav>
        )
    }
}

export default AppBar