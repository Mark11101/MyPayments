import React from 'react'
import PaymentSummary from './PaymentSummary'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

class PaymentList extends React.Component {

  state = {
    searchingFilter: '',
    filteringFilter: '',
    typeOfFiltering: 'MoreThan',
    typeOfSorting: 'Asc',
    data: [],
    sortingFilter: 'null'
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleChangeRadioBtn = (e) => {
    this.setState({
      [e.target.className]: e.target.id
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

  getSearchedData = (searchingFilter, data) => {

    const lowercaseFilter = searchingFilter.toLowerCase();

    return data.filter(item => {
      return Object.keys(item).some(key =>
          item[key].toLowerCase().includes(lowercaseFilter)
      );
    });
  };

  getFilteredData = (filteringFilter, data) => {

    const lowercaseFilter = filteringFilter.toLowerCase();

    return data.filter(item => {
      return Object.keys(item).some((key) => {

        if (this.state.typeOfFiltering === "MoreThan") {

          if (!isNaN(filteringFilter)) {
            return +item.cost.toLowerCase() >= lowercaseFilter
          }

          else if (filteringFilter.indexOf('/') > -1) {
            return item.date.toLowerCase() >= lowercaseFilter
          }

          else {
            return item[key].toLowerCase() >= lowercaseFilter
          }
        }

        else {
          if (!isNaN(filteringFilter)) {
            return +item.cost.toLowerCase() <= lowercaseFilter
          }

          else if (filteringFilter.indexOf('/') > -1) {
            return item.date.toLowerCase() <= lowercaseFilter
          }

          else {
            return item[key].toLowerCase() <= lowercaseFilter
          }
        }
      });
    });
  };

  findUserPayments = (payments, auth, searchedData, filteredData) => {

      let userPayments = [];

      payments && payments.map(payment => {

        const authorOfPaymentID = payment.authorId;
        const userID = auth.uid;

        if (authorOfPaymentID === userID) {
          userPayments.push(payment);
        }

        else {
          return null;
        }

      });

      return this.sortPayments(userPayments, searchedData, filteredData, this.state.sortingFilter);
  };

  sortPayments = (payments, searchedData, filteredData, sortingFilter) => {
    return [].concat(payments)
        .sort((a, b) => {

          let firstSortingValue  = a[sortingFilter.toLowerCase()];
          let secondSortingValue = b[sortingFilter.toLowerCase()];

          if (firstSortingValue) {

            if (this.state.typeOfSorting === "Asc") {

              if (sortingFilter === "Date") {
                return Object.values(firstSortingValue)[0] - Object.values(secondSortingValue)[0];
              }

              else if (sortingFilter === "Title") {
                return ('' + firstSortingValue).localeCompare(secondSortingValue)
              }

              else {
                return firstSortingValue - secondSortingValue;
              }
            }

            else {

              if (sortingFilter === "Date") {
                return Object.values(secondSortingValue)[0] - Object.values(firstSortingValue)[0];
              }

              else if (sortingFilter === "Title") {
                return ('' + secondSortingValue).localeCompare(firstSortingValue)
              }

              else {
                return secondSortingValue - firstSortingValue;
              }
            }
          }
        })
        .map((payment) =>
            this.outputSearchedPayments(searchedData, filteredData, payment)
        );
  };

  outputSearchedPayments = (searchedData, filteredData, payment) => {

    for (let i in searchedData) {
      if (searchedData[i].id === payment.id || this.state.searchingFilter === '') {

        for (let j in filteredData) {
          if (filteredData[j].id === payment.id || this.state.filteringFilter === '') {

            return (
                <Link to={'/payment/' + payment.id} key={payment.id}>
                  <PaymentSummary payment={payment}/>
                </Link>
            )
          }
        }
      }
    }
  };

  componentDidMount() {
    M.AutoInit();
  }

  render() {

    const { payments, auth } = this.props;
    const { searchingFilter, filteringFilter, data }   = this.state;

    this.setPaymentsDataToState(payments);

    let searchedData = this.getSearchedData(searchingFilter, data);
    let filteredData = this.getFilteredData(filteringFilter, data);

    return (
        <div>

          <div className="input-field search">
            <i className="material-icons prefix search__icon">search</i>
            <input className="search__input" id="searchingFilter" onChange={this.handleChange}/>
          </div>

          <div className="sort">
            <div className="input-field">
              <select id="sortingFilter" onChange={this.handleChange}>
                <option value="null" selected>Sort by</option>
                <option value="Title">Title</option>
                <option value="Cost">Cost</option>
                <option value="Date">Date</option>
              </select>
            </div>
            <div className="sort-radioButtons">
              <label>
                <input name="radioSort" type="radio" id="Asc" className="typeOfSorting" onChange={this.handleChangeRadioBtn}/>
                <span>Asc</span>
              </label>
              <label>
                <input name="radioSort" type="radio" id="Desc" className="typeOfSorting" onChange={this.handleChangeRadioBtn} />
                <span>Desc</span>
              </label>
            </div>
          </div>

          <div className="filter">
            <div className="input-field filter__inputDiv">
              <input className="filter__input" placeholder="Filter value:" id="filteringFilter" onChange={this.handleChange}/>
            </div>
            <div className="filter-radioButtons">
              <label>
                <input name="radioFilter" type="radio" id="MoreThan" className="typeOfFiltering" onChange={this.handleChangeRadioBtn}/>
                <span>More than</span>
              </label>
              <label>
                <input name="radioFilter" type="radio" id="LessThan" className="typeOfFiltering" onChange={this.handleChangeRadioBtn} />
                <span>Less than</span>
              </label>
            </div>
          </div>

          <div className="payment-list section">
            {this.findUserPayments(payments, auth, searchedData, filteredData)}
          </div>
        </div>
    )
  }
}

export default PaymentList
