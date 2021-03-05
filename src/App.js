import React, {useEffect, useState} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AppBar from "./components/app-bar/AppBar"
import Footer from "./components/footer/footer"
import Home from "./pages/Home"
import Search from './pages/Search'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import UserPage from "./pages/UserPage"
import NotFound from "./pages/NotFound"

const URL = "http://localhost:3001"


function App(props) {

    // state
    const [user, setUser] = useState('')
    const [token, setToken] = useState("");

    //// get user on page load
    useEffect(() => {
        fetchUser()
    }, [])


    const fetchUser = () => {
        const token = localStorage.token
        if (token) {
            fetch(`${URL}/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                //.then(console.log)
                .then(data => {
                    setUser({user: data.user})
                    setToken(data.token)
                })
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        setUser('')
        props.history.push('/')
    }

    return (
        <div className="App">
            <AppBar user={user} handleLogout={handleLogout}/>
            <main>
                <div className="d-flex flex-column">
                    <div className='flex-grow-1 flex-shrink-0'>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path='/search' component={Search}/>
                            <Route exact path="/login" render={() => <Login setUser={setUser}/>}/>
                            <Route exact path="/signup" render={() => <SignUp setUser={setUser}/>}/>
                            <Route path='/users' component={UserPage}/>
                            <Route component={NotFound}/>
                             user routes
                            {localStorage.token && (
                                <>
                                    <Route exact path="/profile" component={UserPage}/>
                                    </>
                            )}

                        </Switch>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default withRouter(App);