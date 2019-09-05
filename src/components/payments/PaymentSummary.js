import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { deletePayment } from '../../store/actions/paymentActions'
import { addBalance, deleteOldBalances } from "../../store/actions/balanceActions";

class PaymentSummary extends React.Component {

  handleDelete = (e, payment, cost, auth, balance) => {
    e.preventDefault();
    this.props.deletePayment(payment);
    this.changeBalance(cost, auth, balance);
  };

  changeBalance = (cost, auth, balance) => {

        balance.forEach((balance) => {

            const balanceAuthorID = balance.authorId;
            const userID = auth.uid;

            if (userID === balanceAuthorID) {
                this.props.addBalance(+balance.balance + +cost);
                this.props.deleteOldBalances(balance);
            }
        });
    };

  render() {

      const { payment, auth, balance } = this.props;

      return (
          <div className={"card z-depth-0 payment-summary " + (payment.status ? 'green lighten-5' : 'red lighten-5')}>
              <div className="card-content grey-text text-darken-3">
                  <span className="card-title">{payment.title}</span>
                  <span className="pink-text costNumber">{payment.cost} ₽</span>
                  <i className="material-icons delete" onClick={(e) => this.handleDelete(e, payment, payment.cost, auth, balance)}>
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
        auth: state.firebase.auth,
        balance: state.firestore.ordered.balance,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePayment: (payment) => dispatch(deletePayment(payment)),
        addBalance: (balance) => dispatch(addBalance(balance)),
        deleteOldBalances: (balance) => dispatch(deleteOldBalances(balance)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSummary);