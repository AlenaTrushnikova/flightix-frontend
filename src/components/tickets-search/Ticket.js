import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Ticket.css'
import {withRouter} from "react-router"
const API = "http://localhost:3001"

// source https://www.templatemonsterpreview.com/demo/61270.html

class Ticket extends Component {
    //
    // getLink = () => {
    //     let urlRequest = API + `/url`
    //     let search = this.props.searchId
    //     let terms = this.props.ticket['terms'][Object.keys(this.props.ticket['terms'])[0]]['url']
    //
    //     const params = new URLSearchParams()
    //     params.set('search', search)
    //     params.set('terms', terms)
    //
    //     urlRequest += `?${params.toString()}`
    //
    //     fetch(urlRequest)
    //         .then(resp => resp.json())
    //         .then(data => window.open(`${data['url']}`))
    // }

    openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    render() {
        const {
            segment,
            segment_durations,
            segments_airports,
            segments_time,
            terms,
        } = this.props.ticket

        let departFlight = segment[0]
        let returnFlight = segment[1]
        let logo1 = this.props.ticket['carriers'][0]
        let logo2 = (this.props.ticket['carriers'].length > 1)
            ? this.props.ticket['carriers'][1]
            : this.props.ticket['carriers'][0]

        function timeConvert(n) {
            const hours = (n / 60);
            const rhours = Math.floor(hours);
            const minutes = (hours - rhours) * 60;
            const rminutes = Math.round(minutes);
            return rhours + "h " + rminutes + "m";
        }

        function formatGMTAMPM(timestamp) {
            let currentOffset = new Date().getTimezoneOffset() * 60;
            let date = new Date((timestamp + currentOffset) * 1000)
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            let strTime = hours + ':' + minutes + ampm;
            return strTime;
        }

        function currencyFormatter(integer) {
            return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }

        function getStopsAirports(flights) {
            let airports = []
            for (let i = 0; i < flights.length - 1; i++) {
                airports.push(flights[i]['arrival'])
            }
            return airports.join(', ')
        }

        function displayStops(flights) {
            let stops = flights.length - 1
            if (stops === 0) {
                return 'Direct flight'
            } else if (stops === 1) {
                return '1 stop ' + getStopsAirports(flights)
            } else {
                return stops + ' stops ' + getStopsAirports(flights)
            }
        }

        function currencyConverter(price, currencyRate) {
            if (terms[Object.keys(terms)[0]]['currency'] !== 'usd') {
                return Math.round(price / currencyRate)
            } else {
                return price
            }
        }

        function nextDay(timestamp1, timestamp2){
            let currentOffset = new Date().getTimezoneOffset() * 60;
            let date1 = new Date((timestamp1 + currentOffset) * 1000)
            let day1 = date1.getDate()
            let month1 = date1.getMonth() + 1
            let date2 = new Date((timestamp2 + currentOffset) * 1000)
            let day2 = date2.getDate()
            let month2 = date2.getMonth() + 1
            return month2 > month1 ? ' (+1)' : day2 > day1 ? ' (+1)' : ""
        }

        return (
            <div className='container'>
                <ul className="list-tickets">
                    <li className="list-item">
                        <div className="list-item-inner">
                            <div className="list-item-main">
                                <div className="list-item-top">
                                    <div className="list-item-logo">
                                        <img src={`http://pics.avs.io/90/25/${logo1}.png`}
                                             alt="logo"/></div>
                                    <div className="list-item-content">
                                        <div className="list-item-content-left">
                                            <div className="text-bold text-base">
                                                {formatGMTAMPM(segments_time[0][0])}
                                            </div>
                                            <span className="small d-block">
                                                {segments_airports[0][0]}
                                            </span>
                                        </div>
                                        <div className="list-item-content-line-wrapper small">
                                            <div className="list-item-content-line-top">
                                                {timeConvert(segment_durations[0])}
                                            </div>
                                            <div className="list-item-content-line"></div>
                                            <div className="list-item-content-line-bottom text-info-dr">
                                                {displayStops(departFlight['flight'])}
                                            </div>
                                        </div>
                                        <div className="list-item-content-right">
                                            <div className="text-bold text-base">
                                                {formatGMTAMPM(segments_time[0][1]) + nextDay(segments_time[0][0], segments_time[0][1])}
                                            </div>
                                            <span className="small d-block">
                                                {segments_airports[0][1]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {segment.length > 1
                                    ? <div>
                                        <hr className="divider divider-wide"/>
                                        <div className="list-item-bottom">
                                            <div className="list-item-logo">
                                                <img src={`http://pics.avs.io/90/25/${logo2}.png`} alt="logo"/>
                                            </div>
                                            <div className="list-item-content">
                                                <div className="list-item-content-left">
                                                    <div className="text-bold text-base">
                                                        {formatGMTAMPM(segments_time[1][0])}
                                                    </div>
                                                    <span className="small d-block">
                                                        {segments_airports[1][0]}
                                                    </span>
                                                </div>
                                                <div className="list-item-content-line-wrapper small">
                                                    <div className="list-item-content-line-top">
                                                        {timeConvert(segment_durations[1])}
                                                    </div>
                                                    <div className="list-item-content-line"></div>
                                                    <div className="list-item-content-line-bottom">
                                                        <span className="text-primary-dr">
                                                            {displayStops(returnFlight['flight'])}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="list-item-content-right">
                                                    <div className="text-bold text-base">
                                                        {formatGMTAMPM(segments_time[1][1]) + nextDay(segments_time[1][0], segments_time[1][1])}
                                                    </div>
                                                    <span className="small d-block">
                                                        {segments_airports[1][1]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : ""}

                            </div>
                            <div className="list-item-footer">
                                <h5 className="text-bold list-item-price align-content-center">
                                    <strong>{`$ ${currencyFormatter(currencyConverter(terms[Object.keys(terms)[0]]['price'], this.props.currencyRate))}`} </strong>
                                </h5>
                                    <button className='btn button-primary button-xs button-no-shadow'
                                            onClick={() => this.openInNewTab('https://aviasales.com')}>
                                    <strong>view deal </strong>
                                    </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Ticket)