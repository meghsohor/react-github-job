import { useReducer, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';
/* const BASE_URL = 'https://jobs.github.com/positions.json'; */

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}
function reducer (state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading: true, jobs: []};
        case ACTIONS.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs };
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] };
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, loading: false, hasNextPage: action.payload.hasNextPage };
        default:
            return state;
    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true});

    useEffect(() => {
        const cancelTokenforJobs = axios.CancelToken.source();
        const cancelTokenforNextPage = axios.CancelToken.source();

        dispatch({ type:ACTIONS.MAKE_REQUEST });

        /* Fetching the jobs from the Github API */
        axios.get(BASE_URL, {
            cancelToken: cancelTokenforJobs.token,
            params: {markdown: true, page: page, ...params}
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data} });
        }).catch(e => {
            if (axios.isCancel(e)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        })

        /* Checking if there is a list of jobs in the next page */
        axios.get(BASE_URL, {
            cancelToken: cancelTokenforNextPage.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } });
        }).catch(e => {
            if (axios.isCancel(e)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        })

        return () => {
            cancelTokenforJobs.cancel();
            cancelTokenforNextPage.cancel();
        }
    }, [params, page]);

    return state;
}
