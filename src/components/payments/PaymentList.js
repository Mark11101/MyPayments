import React from 'react'
import PaymentSummary from './PaymentSummary'
import { Link } from 'react-router-dom'

const PaymentList = ({payments, auth}) => {
  return (

    <div className="payment-list section">

      { payments && payments.map(payment => {

        const authorOfPaymentID = payment.authorId;
        const userID = auth.uid;

        if (authorOfPaymentID === userID) {
          return (
              <Link to={'/payment/' + payment.id} key={payment.id}>
                <PaymentSummary payment={payment}/>
              </Link>
          )
        }

        else {
          return null;
        }

      })}

    </div>
  )
};

export default PaymentList
