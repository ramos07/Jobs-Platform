import { JOBS_LIST_REQUEST, JOBS_LIST_SUCCESS, JOBS_LIST_FAIL, JOB_APPLY_REQUEST, JOB_APPLY_SUCCESS, JOB_APPLY_FAIL } from "../constants/jobsConstants";

// Getting jobs from server
export const jobListReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case JOBS_LIST_REQUEST:
            return {
                loading: true,
                jobs: [],
            }
        case JOBS_LIST_SUCCESS:
            return {
                loading: false,
                jobs: action.payload,
            }
        case JOBS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const jobApplyReducer = (state = {}, action) => {
    switch (action.type) {
        case JOB_APPLY_REQUEST:
            return {
                loading: true,
            }
        case JOB_APPLY_SUCCESS:
            return {
                loading: false,
                jobApply: action.payload
            }
        case JOB_APPLY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}