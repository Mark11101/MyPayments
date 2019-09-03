import React, { Component } from 'react'
import PaymentList from '../payments/PaymentList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

  render() {

    const { payments, auth, notifications } = this.props;

    if (!auth.uid) {
      return <Redirect to='/signin' />
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <PaymentList payments={payments} auth={auth}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} auth={auth} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payments: state.firestore.ordered.payments,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'payments', orderBy: ['createdAt', 'desc']},
    { collection: 'notifications', limit: 10, orderBy: ['time', 'desc']}
  ])
)(Dashboard)