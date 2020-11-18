import React, { useEffect } from 'react'
import JobsComponent from "../components/Jobs";

import { listJobs } from "../actions/jobActions";

import { useDispatch, useSelector } from "react-redux";

const Jobs = () => {

    const dispatch = useDispatch()

    const jobList = useSelector((state) => state.jobsList)
    const { loading, error, jobs } = jobList

    useEffect(() => {
        dispatch(listJobs())
    }, [dispatch])

    return (
        <>
            <JobsComponent loading={loading} error={error} jobs={jobs.jobs} />
        </>
    )
}

export default Jobs
