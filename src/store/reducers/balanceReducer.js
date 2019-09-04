const initState = {};

const balanceReducer = (state = initState, action) => {

    if (action.type === 'UPDATE_BALANCE_SUCCESS') {
        console.log('update balance success');
        return state;
    }

    if (action.type === 'UPDATE_BALANCE_ERROR') {
        console.log('update balance error');
        return state;
    }

    else {
        return state;
    }
};

export default balanceReducer;