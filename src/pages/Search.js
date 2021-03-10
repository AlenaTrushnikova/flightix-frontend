import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Ticket from "../components/tickets-search/Ticket"
import BookingForm from "../components/booking-form/BookingForm"
import plane from '../assets/img/404page.gif'
import {withRouter} from 'react-router-dom'

const API = "http://localhost:3001"

class Search extends Component {
    state = {
        tickets: [],
        currencyRate: 0,
        searchId: '',
        loading: true,
    }

    componentDidMount() {
        if (this.props.location.search !== null) {
            this.loadTickets()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search === this.props.location.search) {
            return
        }
        this.loadTickets()
    }

    loadTickets() {
        let urlRequest = API + `/tickets`
        const urlParams = new URLSearchParams(this.props.location.search);
        urlParams.set('from', urlParams.get('from').split(', ')[1])
        urlParams.set('to', urlParams.get('to').split(', ')[1])
        urlRequest += `?${urlParams.toString()}`
        fetch(urlRequest)
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    tickets: data['tickets'],
                    currencyRate: data['currency_rate'],
                    searchId: data['search_id'],
                    loading: false
                })
            )
    }

    render() {
        return (
            <div className='container mt-5' style={{ maxWidth: '90%', marginLeft: '5%', marginRight: '5%'}}>
                <h1>Search Results</h1>
                <div className='row'>
                    <div className='col-md-5 search-tab' >
                        <div className="booking-form">
                            <div className="booking-form-search">
                                <BookingForm type="search" setNewSearch={this.setNewSearch}
                                             search={this.props.location.search} user={this.props.user}/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7'>
                        {this.state.loading
                            ? <div> <img src={plane} alt="loading..." width='400px'/> </div>
                            : this.state.tickets.length !== 0
                                    ? <div>
                                        {this.state.tickets.map(ticket =>
                                            <Ticket key={ticket.sign} ticket={ticket}
                                                    currencyRate={this.state.currencyRate}
                                                    searchId={this.state.searchId}/>
                                        )
                                        }
                                    </div>
                                    : <div>
                                        <h3>Sorry</h3>
                                        <h3>no tickets found</h3>
                                        <img src={plane} alt="loading..." width='400px'/>
                                    </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Search)