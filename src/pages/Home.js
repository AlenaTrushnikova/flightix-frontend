import React, {Component} from 'react'
 import BookingForm from "../components/booking-form/BookingForm"
import video from '../assets/img/video.mp4'
import './Home.css'

// import './Home.css'

class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <div className='video-container-div'>
                    <video className='video-player' autoPlay loop muted>
                        <source src={video} type="video/mp4"></source>
                    </video>

                    <div className='form-container'>
                        <div className="container booking-form-container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="booking-form">
                                        <div className="booking-form-main">
                                            <BookingForm user={this.props.user}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 booking-cta">
                                        <h1>Planning a Trip To Anywhere in The World?</h1>
                                        <p>Find the best tickets with Flightix</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home