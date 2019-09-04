import authReducer from './authReducer'
import paymentReducer from './paymentReducer'
import balanceReducer from './balanceReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  balance: balanceReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer