import axios from './axiosSettings'
import * as actionTypes from './actionTypes';

import moment from "moment";

export const getDateInterval = (beginDay, endDay) => {
    return (dispatch, getState) => {
        let obj =
            {
                id_doc: getState().auth.id,
                datestart: beginDay,
                dateend: endDay
            };

        axios.post('/catalog.doc2/getDateWorkInterval', JSON.stringify(obj))
            .then(rez => {
                dispatch({
                    type: actionTypes.GET_ALL_INTERVALS,
                    intervals: rez.data.result,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

