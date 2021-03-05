import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Ticket from "../components/tickets-search/Ticket"
import BookingForm from "../components/booking-form/BookingForm"
import plane from '../assets/img/404page.gif'

const API = "http://localhost:3001"

class Search extends Component {
    state = {
        tickets: [],
        currencyRate: 0,
        newSearch: false,
    }

    componentDidMount() {
        if (this.props.location.search !== null) {
            let urlRequest = API + `/tickets`
            urlRequest += `${this.props.location.search}`
            console.log(urlRequest)
            fetch(urlRequest)
                .then(resp => resp.json())
                .then(data =>
                    this.setState({
                        tickets: data['tickets'],
                        currencyRate: data['currency_rate']
                    })
                )
        }
    }

    render() {
        return (
            <div className='container mt-5'>
                <div className="row booking-form">
                    <div className="booking-form-search">
                        <BookingForm type="search" setNewSearch={this.setNewSearch}/>
                    </div>
                </div>
                {this.state.tickets !== null
                    ? <div className='row'>
                        <div className='col-md-3'>
                            <select className='btn' onChange={this.handleSort}>
                                <option value="default">Sort Tickets</option>
                                <optgroup label="Price" value='price'>
                                    <option value="priceLtoH">Low to high</option>
                                    <option value="priceHtoL">High to low</option>
                                </optgroup>
                                <optgroup label="Name">
                                    <option value="nameAtoZ">A to Z</option>
                                    <option value="nameZtoA">Z to A</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className='col-md-9'>
                            {this.state.tickets.map(ticket =>
                                <Ticket key={ticket.sign} ticket={ticket}
                                        currencyRate={this.state.currencyRate}/>
                            )
                            }
                        </div>
                    </div>
                    : <div className='container mt-5'>
                        <h1>Sorry</h1>
                        <h3>no tickets found</h3>
                        <img src={plane} alt="loading..." width='400px'/>
                    </div>
                }

            </div>
        )
    }
}

export default Search