import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
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


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <AppBar/>
                    <main>
                        <div className="d-flex flex-column">
                            <div className='flex-grow-1 flex-shrink-0'>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path='/search' component={Search}/>
                                    <Route exact path='/login' component={Login}/>
                                    <Route exact path='/signup' component={SignUp}/>
                                    <Route path='/users' component={UserPage}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </Router>
            </div>
        )
    }
}

export default App;
