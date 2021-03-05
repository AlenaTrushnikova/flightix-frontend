import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {NavLink} from "react-router-dom"

const LoginButton = () => {
    return (
        <div className="navbar-brand">
            <NavLink to='/login'>
                <button type="button"
                        className="btn mr-10"
                        id="sign-in">Log In
                </button>
            </NavLink>
            <NavLink to='/signup'>
                <button type="button"
                        className="btn"
                        id="create-account">Sign Up
                </button>
            </NavLink>
        </div>
    )
}

export default LoginButton