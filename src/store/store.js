import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import patientsReducer from './reducers/patients'


const rootReducer = combineReducers({
    patients: patientsReducer
});

export default function configureStore() {
    return createStore(rootReducer, applyMiddleware(thunk));
}