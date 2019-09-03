export const createPayment = (payment) => {
  return (dispatch, getState, {getFirestore}) => {

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('payments').add({

      ...payment,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()

    }).then(() => {
      dispatch({ type: 'CREATE_PAYMENT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PAYMENT_ERROR' }, err);
    });
  }
};

export const deletePayment = (payment) => {
  return (dispatch, getState, {getFirestore}) => {

    const firestore = getFirestore();

    firestore.collection("payments").doc(payment.id).delete().then(function() {
      console.log('delete payment success');
    }).catch(() => {
      console.log('delete payment error');
    });
  }
};