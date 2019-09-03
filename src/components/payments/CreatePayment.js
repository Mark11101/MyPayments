import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPayment } from '../../store/actions/paymentActions'
import { Redirect } from 'react-router-dom'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class CreatePayment extends Component {

  state = {
    title: '',
    comment: '',
    requisites: '',
    cost: '',
    date: null,
    status: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSwitch = (e) => {
    this.setState({
      [e.target.id]: e.target.checked
    })
  };

  handleDayClick = (day, { selected }) => {
    this.setState({
      date: selected ? undefined : day,
    });
  };

  handleSubmit = (e) => {

    e.preventDefault();

    let fieldsAreFilled = true;

    for (let i in this.state) {
      if ((this.state[i] === null || this.state[i] === '') && i !== "comment") {
        alert("Заполните все обязательные поля");
        fieldsAreFilled = false;
        break;
      }
    }

    if (fieldsAreFilled) {
      this.props.createPayment(this.state);
      this.props.history.push('/');
    }
  };

  render() {

    const { auth } = this.props;

    if (!auth.uid) {
      return <Redirect to='/signin' />
    }

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Add a new payment</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Title</label>
          </div>
          <div className="input-field">
            <textarea id="comment" className="materialize-textarea" onChange={this.handleChange}/>
            <label htmlFor="comment">Сomment (optional)</label>
          </div>
          <div className="input-field">
            <textarea id="requisites" className="materialize-textarea" onChange={this.handleChange}/>
            <label htmlFor="requisites">Receiver's requisites</label>
          </div>
          <div className="input-field">
            <input type="number" min="0" id='cost' onChange={this.handleChange}/>
            <label htmlFor="cost">₽</label>
          </div>
          <div className="input-field">
            <DayPicker selectedDays={this.state.selectedDay} onDayClick={this.handleDayClick} />
          </div>
          <div className="switch">
            <label className="switchLabel">
              Is paid
              <input type="checkbox" id='status' onChange={this.handleSwitch} value={!this.state.status}/>
              <span className="lever"/>
            </label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Add</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createPayment: (payment) => dispatch(createPayment(payment))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePayment)