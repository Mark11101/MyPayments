import authReducer from './authReducer'
import paymentReducer from './paymentReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer