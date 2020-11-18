import { JOBS_LIST_REQUEST, JOBS_LIST_FAIL, JOBS_LIST_SUCCESS, JOB_APPLY_REQUEST, JOB_APPLY_SUCCESS, JOB_APPLY_FAIL } from "../constants/jobsConstants";
import axios from 'axios'
import qs from 'querystring'

export const listJobs = () => async (dispatch) => {
    try {
        dispatch({
            type: JOBS_LIST_REQUEST,
        })
        const { data } = await axios.get('https://divercity-test.herokuapp.com/jobs')

        dispatch({
            type: JOBS_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: JOBS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const apply = (id, motivation, coverLetter) => async (dispatch) => {
    try {
        dispatch({
            type: JOB_APPLY_REQUEST,
        })

        const token = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null
        
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }

        const { data } = await axios.post(`https://divercity-test.herokuapp.com/jobs/${id}/apply`, qs.stringify({ motivation: motivation, cover_letter: coverLetter }), config)


        dispatch({
            type: JOB_APPLY_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: JOB_APPLY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}