import * as actionTypes from '../actions/actionTypes'

const initialState = {

};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_ALL_INTERVALS: 
            return {
                ...state,
                docPatients: action.patients,
            }
        
        default: return state;
    }
}

export default reducer;