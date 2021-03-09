import React, {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import loginImage from '../assets/img/login2.jpg'
import {Link} from "react-router-dom"
import {useHistory} from 'react-router';


const Login = ({setUser}) => {
    const [login, setLogin] = useState({email: "", password: ""})
    const [errors, setErrors] = useState('')
    const history = useHistory()

    const URL = "http://localhost:3001/login"

    const handleChange = (e) => {
        e.persist()
        setLogin(login => ({...login, [e.target.name]: e.target.value}))
    }

    const handleAuthResponse = (data) => {
        if (data.id) {
            localStorage.setItem("token", data.token)
            setUser({user: data.id})
            history.push({pathname: "/"})
        } else if (data.error) {
            setErrors(data.error)
        }
    };


    //////handle login
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                email: login.email,
                password: login.password
            })
        })
            .then(res => res.json())
            .then(data => {
                handleAuthResponse(data);
            })
            .catch(console.log);
    }

    return (
        <div className="d-lg-flex half">
            <div className="bg order-1 order-md-2" style={{backgroundImage: `url(${loginImage})`}}>
            </div>
            <div className="contents order-2 order-md-1">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7">
                            <h3>Login to <strong>Flightix</strong></h3>
                            <p className="mb-4">Plan trips and find the best tickets with Flightix.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group first">
                                    <label htmlFor="email">Email</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="email@example.com"
                                           id="email"
                                           name="email"
                                           required
                                           value={login.email}
                                           onChange={handleChange}
                                           autoComplete="off"/>
                                </div>
                                <div className="form-group last mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                           className="form-control"
                                           placeholder="Your Password"
                                           id="password"
                                           name="password"
                                           required
                                           value={login.password}
                                           onChange={handleChange}
                                           autoComplete="off"/>
                                </div>
                                <div className='mb-2' style={{color: 'red', textAlign: 'left', fontSize: '14px'}}>
                                    <strong> {errors} </strong>
                                </div>

                                <input type="submit" value="Log In" className="btn btn-block btn-light"/>
                                <Link to='/signup'> <input type="submit" value="Become a member"
                                                           className="btn btn-link"/> </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login