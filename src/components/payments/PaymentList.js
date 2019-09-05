import React from 'react'
import PaymentSummary from './PaymentSummary'
import {Link} from 'react-router-dom'
import moment from 'moment'

class PaymentList extends React.Component {

  state = {
    filter: '',
    data: []
  };

  handleChange = (e) => {
    this.setState({
      filter: e.target.value
    });
  };

  setPaymentsDataToState = (payments) => {

    payments && payments.map(payment => {

      let date = new Date(1970, 0, 1);
      date.setSeconds(payment.date.seconds);

      this.state.data.push({
        id:    payment.id,
        title: payment.title,
        cost:  payment.cost,
        date:  moment(date).format('DD/MM/YYYY')
      });

      return null;
    });
  };

  getSearchedData = (filter, data) => {

    const lowercaseFilter = filter.toLowerCase();

    return data.filter(item => {
      return Object.keys(item).some(key =>
          item[key].toLowerCase().includes(lowercaseFilter)
      );
    });
  };

  findUserPayments = (payments, auth, searchedData) => {

    return (

      payments && payments.map(payment => {

        const authorOfPaymentID = payment.authorId;
        const userID = auth.uid;

        if (authorOfPaymentID === userID) {
          return this.outputFilteredPayments(searchedData, payment);
        }

        else {
          return null;
        }

      })
    )
  };

  outputFilteredPayments = (searchedData, payment) => {

    for (let i in searchedData) {

      if (searchedData[i].id === payment.id || this.state.filter === '') {
        return (
            <Link to={'/payment/' + payment.id} key={payment.id}>
              <PaymentSummary payment={payment}/>
            </Link>
        )
      }
    }
  };

  render() {

    const { payments, auth } = this.props;
    const { filter, data }   = this.state;

    this.setPaymentsDataToState(payments);
    let searchedData = this.getSearchedData(filter, data);

    return (
        <div>

          <div className="input-field search">
            <i className="material-icons prefix search__icon">search</i>
            <input className="search__input" id='title' onChange={this.handleChange}/>
          </div>

          <div className="payment-list section">
            {this.findUserPayments(payments, auth, searchedData)}
          </div>
        </div>
    )
  }
}

export default PaymentList
