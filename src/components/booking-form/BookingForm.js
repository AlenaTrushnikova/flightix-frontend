import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BookingForm.css'
import {withRouter} from 'react-router-dom'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range'
import {Calendar} from 'react-date-range'

// https://colorlib.com/etc/bforms/colorlib-booking-19/

class BookingForm extends Component {
    state = {
        button: '',
        search: '',
        flightType: 'roundtrip',
        locations: [],
        formFields: {
            departure: "",
            arrival: "",
            dateOfDep: "",
            dateOfReturn: "",
            adults: 1,
            infants: 0,
            flightClass: "Economy",
        },
        datePicker: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
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

        let currentOffset = new Date().getTimezoneOffset() * 60;
        let startDate = new Date((this.dateToTimestamp(dateOfDep) + currentOffset) * 1000)
        let endDate = startDate
        if (dateOfReturn !== "") {
            endDate = new Date((this.dateToTimestamp(dateOfReturn) + currentOffset) * 1000)
        }

        this.setState({
            formFields: {
                departure: departure,
                arrival: arrival,
                dateOfDep: dateOfDep,
                dateOfReturn: dateOfReturn,
                adults: adults,
                infants: infants,
                flightClass: flightClass
            },
            datePicker: {
                startDate: startDate,
                endDate: endDate,
                key: 'selection'
            },
            flightType: urlParams.get('dateOfReturn') !== null ? 'roundtrip' : 'one-way'
        })
    }

    dateToTimestamp = (strDate) => {
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    convertDate = (date) => {
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let year = date.getFullYear()
        let strDate = year + '-' + month + '-' + day
        return strDate
    }

    handleForm = (e) => {
        e.preventDefault()

        let departure = e.target.departure.value
        let arrival = e.target.arrival.value
        let dateOfDep = this.convertDate(this.state.datePicker.startDate)
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

        if (this.state.flightType === "roundtrip") {
            let dateOfReturn = this.convertDate(this.state.datePicker.endDate)
            params.set('dateOfReturn', dateOfReturn)
        }

        if (this.state.button === 'add') {
            if (!localStorage.token) {
                alert('Please login before adding to cart');
            } else {
                alert('Plan was created');
                fetch("http://localhost:3001/plans", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: this.props.user.id,
                        departure: departure,
                        IATA_from: departure.split(', ')[1],
                        date_of_departure: dateOfDep,
                        arrival: arrival,
                        IATA_to: arrival.split(', ')[1],
                        date_of_return: e.target.dateOfReturn.value,
                        adults: adults,
                        infants: infants,
                        flight_class: flightClass,
                    }),
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (this.props.updatePlans !== undefined) {
                            this.props.updatePlans(data);
                        }
                    })

            }
        }
        if (this.state.button === 'search') {

            this.props.history.push('/search?' + params.toString())
        }
    }

    searchLocation = (e) => {
        let input = e.target.value
        if (input === null || input === "") {
            return
        }
        for (var i =0; i < this.state.locations.length; i++) {
            var location = this.state.locations[i]
            if (input === `${location.name}, ${location.code}`) {
                this.setState({locations: []})
                return;
            }
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
                <div className="form-checkbox" onChange={(e) => this.setState({flightType: e.target.id})}>
                    <label htmlFor="roundtrip">
                        <input type="radio" id="roundtrip"
                               name="flightType"
                               checked={this.state.flightType === "roundtrip"}
                               onChange={() => console.log()}/>
                        <span/>Roundtrip
                    </label>
                    <label htmlFor="one-way">
                        <input type="radio" id="one-way"
                               name="flightType"
                               checked={this.state.flightType === "one-way"}
                               onChange={() => console.log()}/>
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
                       autoComplete="off"/>
                <datalist id="location">
                    {this.state.locations.map(location => {
                        return <option key={Math.random()} onClick={console.log("onclick")}>{location.name}, {location.code}</option>
                    })}
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
                       autoComplete="off"/>
                <datalist id="location">
                    {this.state.locations.map(location => (
                        <option key={Math.random()}>
                            {location.name}, {location.code}
                        </option>
                    ))}
                </datalist>
            </div>
        )
    }

    // getDepartingDateInput = () => {
    //     return (
    //         <div className="form-group">
    //             <span className="form-label">Departing</span>
    //             <input className="form-control" type="date"
    //                    name='dateOfDep'
    //                    defaultValue={this.state.formFields.dateOfDep}
    //                    required/>
    //         </div>
    //     )
    // }

    // getReturningDateInput = () => {
    //     return (
    //         <div className="form-group">
    //             <span className="form-label">Returning</span>
    //             <input className="form-control" type="date"
    //                    name='dateOfReturn'
    //                    defaultValue={this.state.formFields.dateOfReturn}
    //                    required/>
    //         </div>
    //     )
    // }

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

    dateRange = () => {
        return (
            <DateRange
                editableDateInputs={true}
                onChange={item => this.setState({datePicker: item.selection})}
                moveRangeOnFirstSelection={false}
                ranges={[this.state.datePicker]}
                minDate={new Date()}
                daySize={100}
            />
        )
    }

    calendar = () => {
        return (
            <Calendar
                onChange={item => this.setState({datePicker: {
                        startDate: item,
                        endDate: item,
                        key: 'selection'}})}
                minDate={new Date()}
                date={this.state.datePicker.startDate}
            />
        )
    }

    getSearchBookingForm = () => {
        return (
            <div>
                <div className="row searchPage align-content-center">
                    {this.getFlightTypeInput()}
                </div>
                <div className="row searchPage">
                    {this.getFlyingFromInput()}
                </div>
                <div className="row searchPage">
                    {this.getFlyingToInput()}
                </div>
                <div className="row searchPage">
                    {this.getAdultsInput()}
                </div>
                <div className="row searchPage">
                    {this.getInfantsInput()}
                </div>
                <div className="row searchPage people-class-input">
                    {this.getFlightClassInput()}
                </div>
                <div className="row searchPage">
                    {this.state.flightType === 'roundtrip'
                        ? <div> {this.dateRange()} </div>
                        : <div> {this.calendar()} </div>
                    }
                </div>
                <div className="row searchPage">
                    {this.addToPlansButton()}
                </div>
                <div className='row searchPage'>
                    {this.searchTicketsButton()}
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
                <div className="row people-class-input">
                    <div className="col-md-4">
                        {this.getAdultsInput()}
                    </div>
                    <div className="col-md-4">
                        {this.getInfantsInput()}
                    </div>
                    <div className="col-md-4 ">
                        {this.getFlightClassInput()}
                    </div>
                </div>
                <div className='row'>
                    {this.state.flightType === 'roundtrip'
                        ? <div className='mx-auto booking-form-wrapper'> {this.dateRange()} </div>
                        : <div className='mx-auto booking-form-wrapper'> {this.calendar()} </div>
                    }
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
            this.props.location.pathname === '/' || this.props.location.pathname === '/profile'
                ? this.getMainBookingForm()
                : this.getSearchBookingForm()

        return (
            <form onSubmit={this.handleForm}>
                {formDiv}
            </form>
        )
    }
}

export default withRouter(BookingForm)