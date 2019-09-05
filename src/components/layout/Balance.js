import React, { Component } from 'react'
import { connect } from "react-redux";
import { addBalance, addZeroBalance } from "../../store/actions/balanceActions";
import { deleteOldBalances } from "../../store/actions/balanceActions";

class Balance extends Component {

    handleClick = (e, balance) => {

        e.preventDefault();

        let newBalance = prompt('Input your balance:');

        if (isNaN(+newBalance) || newBalance === '' || /^\s+$/.test(newBalance)) {
            this.handleClick(e, balance);
            return null;
        } else if (newBalance === null) {
            return null;
        }

        console.log(newBalance);

        this.props.addBalance(newBalance);

        //??? попробовать без условия
        if (balance !== null) {
            this.props.deleteOldBalances(balance);
        }
    };

    outputBalance = (balance, auth) => {
        return (
            <div>
                {this.outputInputedBalance(balance, auth)}
            </div>
        );
    };

    outputInputedBalance = (balance, auth) => {

        if (this.checkIfUserHasBalance(balance, auth)) {
            return (
                balance && balance.map((balance) => {

                    const balanceAuthorID = balance.authorId;
                    const userID = auth.uid;

                    if (userID === balanceAuthorID) {
                        return (
                            <span className="pink-text balance" onClick={(e) => this.handleClick(e, balance)} key={balance.id}>
                                {balance.balance} ₽
                            </span>
                        )
                    } else return null;
                })
            )
        } else {
            return this.props.addZeroBalance(auth);
        }
    };

    checkIfUserHasBalance = (balance, auth) => {

        let userHasBalance = false;

        balance.forEach((balance) => {
            const balanceAuthorID = balance.authorId;
            const userID = auth.uid;

            if (userID === balanceAuthorID) {
                userHasBalance = true;
            }
        });

        return userHasBalance;
    };

    render() {

        const { balance, auth } = this.props;

        return (
            <div>
                {balance && this.outputBalance(balance, auth)}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBalance: (balance) => dispatch(addBalance(balance)),
        deleteOldBalances: (balance) => dispatch(deleteOldBalances(balance)),
        addZeroBalance: (auth) => dispatch(addZeroBalance(auth)),
    }
};

export default connect(null, mapDispatchToProps)(Balance)