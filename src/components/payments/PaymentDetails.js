import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const PaymentDetails = (props) => {

  const { payment, auth } = props;

  if (!auth.uid) {
    return <Redirect to='/signin' />
  }

  if (payment) {
    return (
      <div className="container section payment-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{payment.title}</span>
            {payment.comment ? <div>
                                 <br/>
                                 <p>Comment:</p>
                                 <p>{payment.comment}</p>
                               </div>
                             : null
            }
            <br/>
            <p>Requisites:</p>
            <p>{payment.requisites}</p>
            <br/>
            <h5 className="pink-text costNumber">{payment.cost} ₽</h5>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            {payment.status ? <div>Payment is paid</div> : <div>Payment is't paid</div>}
            <div>{moment(payment.date.toDate()).format('DD/MM/YYYY')}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center white-text">
        <p>Loading payments...</p>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  const payments = state.firestore.data.payments;
  const payment = payments ? payments[id] : null;

  return {
    payment: payment,
    auth: state.firebase.auth
  }

};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'payments'
  }])
)(PaymentDetails)
