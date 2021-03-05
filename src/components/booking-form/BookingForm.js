import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BookingForm.css'
import {withRouter} from 'react-router-dom'

// https://colorlib.com/etc/bforms/colorlib-booking-19/

class BookingForm extends Component {
    state = {
        button: '',
        search: '',
        locations: []
    }

    handleForm = (e) => {
        e.preventDefault()
        if (this.state.button === 'add') {
            console.log("Button Add clicked!");
        }
        if (this.state.button === 'search') {
            let departure = e.target.departure.value.split(', ')[1]
            let arrival = e.target.arrival.value.split(', ')[1]
            let dateOfDep = e.target.dateOfDep.value
            let adults = e.target.adults.value
            let infants = e.target.infants.value
            let flightClass = e.target.class.value === 'Economy' ? 'Y' : 'C'

            const params = new URLSearchParams()
            params.set('from', departure)
            params.set('to', arrival)
            params.set('dateOfDep', dateOfDep)
            params.set('adults', adults)
            params.set('infants', infants)
            params.set('flightClass', flightClass)

            let flightType = e.target.flightType[0].checked
            if (flightType === true) {
                let dateOfReturn = e.target.dateOfReturn.value
                params.set('dateOfReturn', dateOfReturn)
            }

            this.props.history.push('/search?' + params.toString())
        }
    }

    searchLocation = (e) => {
        let input = e.target.value
        if (input === null || input === "") {
            return
        }
        this.setState({
            search: input
        })

        this.find(input)
    }

    find = search => {
        const url = `http://autocomplete.travelpayouts.com/places2?term=${search}&locale=en&types[airport]=country`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({locations: data})
            })
    }

    getFlightTypeInput = () => {
        return (
            <div className="form-group">
                <div className="form-checkbox">
                    <label htmlFor="roundtrip">
                        <input type="radio" id="roundtrip" name="flightType"
                               defaultChecked/>
                        <span/>Roundtrip
                    </label>
                    <label htmlFor="one-way">
                        <input type="radio" id="one-way" name="flightType"/>
                        <span/>One way
                    </label>
                </div>
            </div>
        )
    }

    getFlyingFromInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Flying from</span>
                <input className="form-control" type="text"
                       placeholder="City or airport"
                       name='departure'
                       list="location"
                       onChange={this.searchLocation}
                       required
                />
                <datalist id="location">
                    {this.state.locations.map(location => (
                        <option key={location.weight}>{location.name}, {location.code}</option>
                    ))}
                </datalist>
            </div>
        )
    }

    getFlyingToInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Flying to</span>
                <input className="form-control" type="text"
                       placeholder="City or airport"
                       name='arrival'
                       list="location"
                       onChange={this.searchLocation}
                       required
                />
                <datalist id="location">
                    {this.state.locations.map(location => (
                        <option key={location.weight}>
                            {location.name}, {location.code}
                        </option>
                    ))}
                </datalist>
            </div>
        )
    }

    getDepartingDateInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Departing</span>
                <input className="form-control" type="date"
                       name='dateOfDep'
                       required
                />
            </div>
        )
    }

    getReturningDateInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Returning</span>
                <input className="form-control" type="date"
                       name='dateOfReturn'
                       required
                />
            </div>
        )
    }

    getAdultsInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Adults (18+)</span>
                <select className="form-control" name='adults'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <span className="select-arrow"/>
            </div>
        )
    }

    getInfantsInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Infants (0-2)</span>
                <select className="form-control" name='infants'>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <span className="select-arrow"/>
            </div>
        )
    }

    getFlightClassInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Travel class</span>
                <select className="form-control" name='class'>
                    <option>Economy</option>
                    <option>Business</option>
                </select>
                <span className="select-arrow"/>
            </div>
        )
    }

    addToPlansButton = () => {
        return (
            <div className="form-btn form-group">
                <button className="submit-btn"
                        name='add'
                        onClick={() => (this.setState({button: 'add'}))}> Add to Plans
                </button>
            </div>
        )
    }

    searchTicketsButton = () => {
        return (
            <div className="form-btn form-group">
                <button className="submit-btn"
                        name='search'
                        onClick={() => (this.setState({button: 'search'}))}>Show Flights
                </button>
            </div>
        )
    }

    getSearchBookingForm = () => {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-2">
                        {this.getFlightTypeInput()}
                    </div>
                    <div className="col-md-2">
                        {this.getFlyingFromInput()}
                    </div>
                    <div className="col-md-3">
                        {this.getDepartingDateInput()}
                    </div>
                    <div className="col-md-2">
                        {this.getFlyingToInput()}
                    </div>
                    <div className="col-md-3">
                        {this.getReturningDateInput()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        {this.getAdultsInput()}
                    </div>
                    <div className="col-md-2">
                        {this.getInfantsInput()}
                    </div>
                    <div className="col-md-2">
                        {this.getFlightClassInput()}
                    </div>
                    <div className="col-md-3">
                        {this.addToPlansButton()}
                    </div>
                    <div className="col-md-3">
                        {this.searchTicketsButton()}
                    </div>
                </div>
            </div>
        )
    }

    getMainBookingForm = () => {
        return (
            <div>
                <div>
                    {this.getFlightTypeInput()}
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.getFlyingFromInput()}
                    </div>
                    <div className="col-md-6">
                        {this.getFlyingToInput()}
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-6">
                        {this.getDepartingDateInput()}
                    </div>
                    <div className="col-md-6">
                        {this.getReturningDateInput()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.getAdultsInput()}
                    </div>
                    <div className="col-md-6">
                        {this.getInfantsInput()}
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-6">
                        {this.getFlightClassInput()}
                    </div>
                </div>
                <div className='row justify-content-between'>
                    <div className="col-md-6">
                        {this.addToPlansButton()}
                    </div>
                    <div className="col-md-6">
                        {this.searchTicketsButton()}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let formDiv =
            this.props.type === "search"
                ? this.getSearchBookingForm()
                : this.getMainBookingForm()

        return (
            <form onSubmit={this.handleForm}>
                {formDiv}
            </form>
        )
    }
}

export default withRouter(BookingForm)