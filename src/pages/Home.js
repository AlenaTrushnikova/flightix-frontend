import React, {Component} from 'react'
 import BookingForm from "../components/booking-form/BookingForm"
import video from '../assets/img/video.mp4'
import './Home.css'

// import './Home.css'

class Home extends Component {
    render() {
        return (
            <div >
                <div className="sectionVideo">
                    <div className="video-container">
                        <div className="color-overlay"></div>
                        <video width="100%" autoPlay loop muted>
                            <source src={video} type="video/mp4"></source>
                        </video>
                    </div>
                </div>
                <div id="booking" className="section" >
                    <div className="section-center" style={{marginTop: '40px'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="booking-form">
                                        <div className="booking-form-main">
                                            <BookingForm user={this.props.user}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="booking-cta">
                                        <h1>Planning a Trip To Anywhere in The World?</h1>
                                        <p>Find the best tickets with Flightix</p>
                                    </div>
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