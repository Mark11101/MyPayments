import React, { Component } from 'react'
import { connect } from "react-redux";
import { addBalance } from "../../store/actions/balanceActions";
import { deleteOldBalances } from "../../store/actions/balanceActions";

class Balance extends Component {

    handleClick = (e, balance) => {

        e.preventDefault();

        let newBalance = prompt('Input your balance:');
        this.props.addBalance(newBalance);

        if (balance !== null) {
            this.props.deleteOldBalances(balance);
        }
    };

    outputBalance = (balance, auth) => {
        return (
            <div>
                {balance.length === 0 ? this.outputZeroBalance() : this.outputInputedBalance(balance, auth)}
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
            return this.outputZeroBalance();
        }
    };

    outputZeroBalance = () => {
        return (
            <span className="pink-text balance" onClick={(e) => this.handleClick(e, null)}>
                0 ₽
            </span>
        )
    };

    checkIfUserHasBalance = (balance, auth) => {

        let userHasBalance = false;

        balance.forEach((elem) => {
            const balanceAuthorID = elem.authorId;
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
                {balance !== undefined ? this.outputBalance(balance, auth) : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBalance: (balance) => dispatch(addBalance(balance)),
        deleteOldBalances: (balance) => dispatch(deleteOldBalances(balance)),
    }
};

export default connect(null, mapDispatchToProps)(Balance)