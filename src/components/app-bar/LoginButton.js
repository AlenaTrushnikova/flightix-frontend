import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom"

const LoginButton = () => {
    return (
        <div className="navbar-brand">
            <Link to='/login'>
                <button type="button"
                        className="btn mr-10"
                        id="sign-in">Log In
                </button>
            </Link>
            <Link to='/signup'>
                <button type="button"
                        className="btn"
                        id="create-account">Sign Up
                </button>
            </Link>
        </div>
    )
}

export default LoginButton