import React, {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import loginImage from '../assets/img/login2.jpg'
import {Link} from "react-router-dom"
import {useHistory} from 'react-router'

const SignUp = ({setUser}) => {
    const [inputs, setInputs] = useState({email: "", password: "", passwordConfirmation: ""})
    const [errors, setErrors] = useState({errors: ''})
    const history = useHistory()

    const URL = "http://localhost:3001/signup"


    //////form control
    const handleInputChange = (e, value) => {
        e.persist()
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}))
    }


    /////handle signup
    const handleSubmit = (e) => {
        e.preventDefault()
        let validateStatus = validate()
        if (Object.keys(validateStatus).length !== 0) {
            alert(Object.values(validateStatus).join("\n"))
            return
        }
        //create new user
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
            .then(res => res.json())
            // .then(data => console.log(data))
            .then(newUser => {
                localStorage.setItem("token", newUser.token)
                setUser({user: newUser.user})
                //// redirect
                history.push({pathname: "/"})
            })

    }

    function validate () {
        let errors = {}

        if (!inputs.email) {
            errors["email"] = "Please enter your email Address."
        }

        if (typeof inputs.email !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(inputs.email)) {
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!inputs.password) {
            errors["password"] = "Please enter your password.";
        }

        if (!inputs.passwordConfirmation) {
            errors["passwordConfirmation"] = "Please enter your confirm password.";
        }

        if (typeof inputs.password !== "undefined" && typeof inputs.passwordConfirmation !== "undefined") {

            if (inputs.password !== inputs.passwordConfirmation) {
                errors["password"] = "Passwords don't match.";
            }
        }

        return errors;
    }
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
                            <form onSubmit={handleSubmit}>
                                <div className="form-group first">
                                    <label htmlFor="username">Email</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="email@example.com"
                                           id="email"
                                           name="email"
                                           onChange={handleInputChange}
                                           value={inputs.email}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                           className="form-control"
                                           placeholder="Password"
                                           id="password"
                                           name="password"
                                           onChange={handleInputChange}
                                           value={inputs.password}
                                           required/>
                                </div>
                                <div className="form-group last mb-3">
                                    <label htmlFor="passwordConfirmation">Password</label>
                                    <input type="password"
                                           className="form-control"
                                           placeholder="Confirm Password"
                                           id="passwordConfirmation"
                                           name="passwordConfirmation"
                                           onChange={handleInputChange}
                                           value={inputs.passwordConfirmation}
                                           required/>
                                </div>

                                <input type="submit" value="Sign Up" className="btn btn-block btn-light"/>
                                <Link to='/login'> <
                                    input type="submit" value="I'm already a member!" className="btn btn-link"/>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp