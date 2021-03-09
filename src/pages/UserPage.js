import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Plan from "../components/plan/Plan"
import BookingForm from "../components/booking-form/BookingForm"
import '../components/booking-form/BookingForm.css'
import {withRouter} from 'react-router-dom'

class UserPage extends Component {

    handleDeletePlan = (planId) => {
        fetch(`http://localhost:3001/plans/${planId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => {
                for (var i = 0; i < this.props.user.plans.length; i++) {
                    let plan = this.props.user.plans[i]
                    if (plan.id === planId) {
                        this.props.user.plans.splice(i, 1)
                        break
                    }
                }
                this.forceUpdate()
            })
    }

    handleViewDeal = (plan) => {

        let departure = plan.departure
        let arrival = plan.arrival
        let dateOfDep = plan.date_of_departure
        let adults = plan.adults
        let infants = plan.infants
        let flightClass = plan.flight_class

        const params = new URLSearchParams()
        params.set('from', departure)
        params.set('to', arrival)
        params.set('dateOfDep', dateOfDep)
        params.set('adults', adults)
        params.set('infants', infants)
        params.set('flightClass', flightClass)

        if (plan.date_of_return !== null) {
            let dateOfReturn = plan.date_of_return
            params.set('dateOfReturn', dateOfReturn)
        }
        console.log(this.props.history)

        this.props.history.push('/search?' + params.toString())
    }

    updatePlans = (plan) => {
        this.props.user.plans.push(plan)
        this.forceUpdate()
    }
    render() {
        if (this.props.user.plans === undefined){
            return (
                <div></div>
            )
        }
        return (
            <div className='container mt-5'>
                <div>
                    {/*<Plan user={this.props.user.plans}/>*/}
                    {this.props.user.plans.map(plan =>
                        <Plan key={plan.id} plan={plan} handleViewDeal={this.handleViewDeal} handleDeletePlan={this.handleDeletePlan}/>
                    )
                    }
                </div>
                <div className="row booking-form">
                    <div className="booking-form-search m-5">
                        <BookingForm user={this.props.user} updatePlans={this.updatePlans}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(UserPage)