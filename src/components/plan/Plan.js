import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class Plan extends Component {

    render() {
        const {id, departure, date_of_departure, arrival, date_of_return} = this.props.plan
        return (
            <div className='container pl-5 pr-5'>
                <ul className="list-tickets pl-5 pr-5">
                    <li className="list-item">
                        <div className="list-item-inner">
                            <div className="list-item-main">
                                <div className="list-item-top">
                                    <div className="list-item-logo">
                                        {date_of_departure}
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
                                    <div>
                                        <hr className="divider divider-wide"/>
                                        <div className="list-item-bottom">
                                            <div className="list-item-logo">
                                                {date_of_return}
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
                                                        {departure.split(', ')[1]}
                                                    </div>
                                                    <span className="small d-block">
                                                        {departure.split(', ')[1]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="list-item-footer">
                                <h5 className="text-bold list-item-price align-content-center">
                                    <strong>from $100 </strong>
                                </h5>
                                <a className="btn button-primary button-xs button-no-shadow" href="google.com">
                                    <strong>view deal</strong>
                                </a>
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