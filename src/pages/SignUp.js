import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import loginImage from '../assets/img/login2.jpg'
import {Link} from "react-router-dom"


class SignUp extends Component {
    render() {
        return (
            <div className="d-lg-flex half">
                <div className="bg order-1 order-md-2" style={{backgroundImage: `url(${loginImage})`}}>
                </div>
                <div className="contents order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7">
                                <h3>Sign up for <strong>Flightix</strong></h3>
                                <p className="mb-4">Plan trips and find the best tickets with Flightix.</p>
                                <form>
                                    <div className="form-group first">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" placeholder="your-email@gmail.com"
                                               id="username"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" placeholder="Your Password"
                                               id="password"/>
                                    </div>
                                    <div className="form-group last mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" placeholder="Repeat Password"
                                               id="password"/>
                                    </div>

                                    <input type="submit" value="Sign Up" className="btn btn-block btn-light"/>
                                    <Link to='/login'> <input type="submit" value="I'm already a member!" className="btn btn-link"/> </Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp