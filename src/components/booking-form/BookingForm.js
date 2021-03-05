import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BookingForm.css'
import {withRouter} from 'react-router-dom'

// https://colorlib.com/etc/bforms/colorlib-booking-19/

class BookingForm extends Component {
    state = {
        button: '',
        search: '',
        locations: [],
        formFields: {
            departure: "",
            arrival: "",
            dateOfDep: "",
            dateOfReturn: "",
            adults: 1,
            infants: 0,
            flightClass: "Economy",
        }
    }

    componentDidMount() {
        if (this.props.search === undefined) {
            return
        }
        const urlParams = new URLSearchParams(this.props.search);
        const departure = urlParams.get('from')
        const arrival = urlParams.get('to')
        const dateOfDep = urlParams.get('dateOfDep')
        const dateOfReturn = urlParams.get('dateOfReturn') !== null ? urlParams.get('dateOfReturn') : ""
        const adults = urlParams.get('adults')
        const infants = urlParams.get('infants')
        const flightClass = urlParams.get('flightClass') === 'Y' ? 'Economy' : 'Business'

        this.setState({
            formFields: {
                departure: departure,
                arrival: arrival,
                dateOfDep: dateOfDep,
                dateOfReturn: dateOfReturn,
                adults: adults,
                infants: infants,
                flightClass: flightClass
            }
        })
    }



    handleForm = (e) => {
        e.preventDefault()
        if (this.state.button === 'add') {
            console.log("Button Add clicked!");
        }
        if (this.state.button === 'search') {
            let departure = e.target.departure.value
            let arrival = e.target.arrival.value
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
                        <input type="radio" id="roundtrip"
                               name="flightType"
                               defaultChecked={this.state.formFields.dateOfReturn !== '' || this.state.formFields.dateOfReturn === ''} />
                        <span/>Roundtrip
                    </label>
                    <label htmlFor="one-way">
                        <input type="radio" id="one-way"
                               name="flightType"
                               defaultChecked={this.state.formFields.dateOfReturn === '' && this.state.formFields.dateOfReturn !== ''}/>
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
                       defaultValue={this.state.formFields.departure}
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
                       defaultValue={this.state.formFields.arrival}
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
                       defaultValue={this.state.formFields.dateOfDep}
                       required/>
            </div>
        )
    }

    getReturningDateInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Returning</span>
                <input className="form-control" type="date"
                       name='dateOfReturn'
                       defaultValue={this.state.formFields.dateOfReturn}/>
            </div>
        )
    }

    getAdultsInput = () => {
        return (
            <div className="form-group">
                <span className="form-label">Adults (18+)</span>
                <select className="form-control"
                        name='adults'
                        defaultValue={this.state.formFields.adults}>
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
                <select className="form-control"
                        name='infants'
                        defaultValue={this.state.formFields.infants}>
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
                <select className="form-control"
                        name='class'
                        defaultValue={this.state.formFields.flightClass}>
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