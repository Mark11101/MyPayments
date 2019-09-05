export const addBalance = (balance) => {
    return (dispatch, getState, {getFirestore}) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('balance').add({

            balance,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()

        }).then(() => {
            dispatch({ type: 'UPDATE_BALANCE_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'UPDATE_BALANCE_ERROR' }, err);
        });
    }
};

export const deleteOldBalances = (balance) => {
    return (dispatch, getState, {getFirestore}) => {

        const firestore = getFirestore();

        firestore.collection("balance").doc(balance.id).delete().then(function() {
            console.log('delete balance success');
        }).catch(() => {
            console.log('delete balance error');
        });
    }
};

export const addZeroBalance = (auth) => {
    return (dispatch, getState, {getFirestore}) => {

        const firestore = getFirestore();
        const authorId = auth.uid;

        firestore.collection('balance').add({

            balance: 0,
            authorId: authorId,
            createdAt: new Date()

        }).then(() => {
            dispatch({ type: 'UPDATE_BALANCE_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'UPDATE_BALANCE_ERROR' }, err);
        });
    }
};