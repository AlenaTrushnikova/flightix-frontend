import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../assets/img/404page.gif'
import BookingForm from "../components/booking-form/BookingForm";


class NotFound extends Component {
    render() {
        return (
            <div className='container mt-5'>
                <h1>404</h1>
                <h3>not found</h3>
                <img src={logo} alt="loading..." width='300px'/>
            </div>
        )
    }
}

export default NotFound