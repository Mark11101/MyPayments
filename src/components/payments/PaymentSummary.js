import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { deletePayment } from '../../store/actions/paymentActions'

class PaymentSummary extends React.Component {

  handleDelete = (e, payment) => {
    e.preventDefault();
    this.props.deletePayment(payment);
  };

  render() {

      const { payment } = this.props;

      return (
          <div className={"card z-depth-0 payment-summary " + (payment.status ? 'green lighten-5' : 'red lighten-5')}>
              <div className="card-content grey-text text-darken-3">
                  <span className="card-title">{payment.title}</span>
                  <span className="pink-text costNumber">{payment.cost} ₽</span>
                  <i className="material-icons delete" onClick={(e) => this.handleDelete(e, payment)}>
                      delete_forever
                  </i>
                  <p className="grey-text">{moment(payment.date.toDate()).format('DD/MM/YYYY')}</p>
              </div>
          </div>
      )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePayment: (payment) => dispatch(deletePayment(payment))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSummary);