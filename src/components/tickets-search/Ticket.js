import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Ticket.css'

// source https://www.templatemonsterpreview.com/demo/61270.html

class Ticket extends Component {

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
            let strTime = hours + ':' + minutes + ' ' + ampm;
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


        return (
            <div className='container'>
                {console.log(this.props)}
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
                                                {formatGMTAMPM(segments_time[0][1])}
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
                                                <img src={`http://pics.avs.io/90/25/${logo2}.png`} alt=""/>
                                            </div>
                                            <div className="list-item-content">
                                                <div className="list-item-content-left">
                                                    <div className="text-bold text-base">
                                                        {formatGMTAMPM(segments_time[1][0])}
                                                    </div>
                                                    <span className="small d-block">{segments_airports[1][0]}</span>
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
                                                        {/*<span> DUB</span>*/}
                                                    </div>
                                                </div>
                                                <div className="list-item-content-right">
                                                    <div className="text-bold text-base">
                                                        {formatGMTAMPM(segments_time[1][1])}
                                                    </div>
                                                    <span className="small d-block">{segments_airports[1][1]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : ""}

                            </div>
                            <div className="list-item-footer">
                                <h5 className="text-bold list-item-price align-content-center">
                                    {/*{getSymbolFromCurrency(terms[Object.keys(terms)[0]]['currency'])*/}
                                    {`$ ${currencyFormatter(currencyConverter(terms[Object.keys(terms)[0]]['price'], this.props.currencyRate))}`}
                                </h5>
                                <a className="btn button-primary button-xs button-no-shadow" href="#">view deal</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Ticket