import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import Balance from './Balance'

class SignedInLinks extends React.Component {

  render() {

    const { balance, auth } = this.props;

    return (
        <div>
          <ul className="right">
            <li><NavLink to='/create'>New Payment</NavLink></li>
            <li><a onClick={this.props.signOut}>Log Out</a></li>
            <li><Balance balance={balance} auth={auth} /></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">
              {this.props.profile.initials}
            </NavLink></li>
          </ul>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.firestore.ordered.balance,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'balance'}
    ])
)(SignedInLinks)
