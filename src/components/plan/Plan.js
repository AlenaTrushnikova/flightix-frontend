import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class Plan extends Component {

    formatDate = (dateStr) => {
        let currentOffset = new Date().getTimezoneOffset() * 60;
        let flightDate = new Date((Date.parse(dateStr) / 1000 + currentOffset) * 1000)
        let monthDate = flightDate.toDateString().split(' ')
        let str = monthDate[1] + ' ' + monthDate[2] + ', ' + monthDate[3]
        return str
    }

    currencyFormatter = (integer) => {
        return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    render() {

        const {id, departure, date_of_departure, arrival, date_of_return, tickets} = this.props.plan

        return (
            <div className='container pl-5 pr-5'>
                <ul className="list-tickets pl-5 pr-5">
                    <li className="list-item">
                        <div className="list-item-inner">
                            <div className="list-item-main">
                                <div className="list-item-top">
                                    <div className="list-item-logo">
                                        {this.formatDate(date_of_departure)}
                                    </div>
                                    <div className="list-item-content">
                                        <div className="list-item-content-left">
                                            <div className="text-bold text-base">
                                                {departure.split(', ')[0]}
                                            </div>
                                            <span className="small d-block">
                                                {departure.split(', ')[1]}
                                            </span>
                                        </div>
                                        <div className="list-item-content-line-wrapper small">
                                            <div className="list-item-content-line-top">
                                            </div>
                                            <div className="list-item-content-line"></div>
                                            <div className="list-item-content-line-bottom text-info-dr">
                                            </div>
                                        </div>
                                        <div className="list-item-content-right">
                                            <div className="text-bold text-base">
                                                {arrival.split(', ')[0]}
                                            </div>
                                            <span className="small d-block">
                                                {arrival.split(', ')[1]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {date_of_return !== null
                                    ? <div>
                                        <hr className="divider divider-wide"/>
                                        <div className="list-item-bottom">
                                            <div className="list-item-logo">
                                                {this.formatDate(date_of_return)}
                                            </div>
                                            <div className="list-item-content">
                                                <div className="list-item-content-left">
                                                    <div className="text-bold text-base">
                                                        {arrival.split(', ')[0]}
                                                    </div>
                                                    <span className="small d-block">
                                                        {arrival.split(', ')[1]}
                                                    </span>
                                                </div>
                                                <div className="list-item-content-line-wrapper small">
                                                    <div className="list-item-content-line-top">
                                                    </div>
                                                    <div className="list-item-content-line"></div>
                                                    <div className="list-item-content-line-bottom">
                                                        <span className="text-primary-dr">
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="list-item-content-right">
                                                    <div className="text-bold text-base">
                                                        {departure.split(', ')[0]}
                                                    </div>
                                                    <span className="small d-block">
                                                        {departure.split(', ')[1]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : ''
                                }
                            </div>
                            <div className="list-item-footer">
                                <h5 className="text-bold list-item-price align-content-center">
                                    {tickets.length > 0
                                        ? <strong> from ${this.currencyFormatter(tickets.slice(-1)[0]['price'])} </strong>
                                        : <div> Searching ...  </div>

                                    }
                                </h5>
                                <button className="btn button-primary button-xs button-no-shadow"
                                        type="button" data-toggle="tooltip"
                                        data-placement="top" title="View deal"
                                        onClick={() => this.props.handleViewDeal(this.props.plan)}
                                >
                                    <strong>view deal</strong>
                                </button>
                                <button className="btn btn-outline-danger button-xs rounded-1 ml-1"
                                        type="button" data-toggle="tooltip"
                                        data-placement="top" title="Delete"
                                onClick={() => this.props.handleDeletePlan(id)}>
                                    <i className="fa fa-trash-alt"/>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Plan