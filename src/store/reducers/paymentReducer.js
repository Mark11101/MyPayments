const initState = {};

const paymentReducer = (state = initState, action) => {

  if (action.type === 'CREATE_PAYMENT_SUCCESS') {
    console.log('create payment success');
    return state;
  }

  if (action.type === 'CREATE_PAYMENT_ERROR') {
    console.log('create payment error');
    return state;
  }

  else {
    return state;
  }
};

export default paymentReducer;