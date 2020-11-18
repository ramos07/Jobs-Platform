import React, { useState } from 'react'
import { ApplyFormContainer, ErrorModalContainer,ErrorBtn, ErrorContent, ErrorBtnLink, JobsContainer, FilterFormContainer, JobPostingsContainer, JobPosting, JobTitle, Loading, JobCompany, JobType, JobLocation, JobDesc, ApplyBtn, JobSkills, Skill, ModalContainer, CloseIcon, ErrorMessage, MotivationInput, CoverLetterInput, SubmitApplicationBtn, FilterGroup, FilterSelect, FilterOption, FilterBtn, FilterBtnWrap } from "./JobsComponent";

import { apply } from "../../actions/jobActions";

import { useSelector, useDispatch } from "react-redux";

const Jobs = ({ loading, error, jobs }) => {


    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [isModalOpen, setIsModalOpen] = useState(false) // Open or close the modal to submit an application
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false) // Open or close modal to display error message
    const [errorMessage, setErrorMessage] = useState("") // Error message to be displayed

    const [jobToApply, setjobToApply] = useState({}) // Job position to apply to
    const [motivation, setMotivation] = useState('') // Motivation for application
    const [coverLetter, setCoverLetter] = useState('') // Cover letter for applications

    const [jobTypeFilter, setJobTypeFilter] = useState('')
    const [jobLocationFilter, setJobLocationFilter] = useState('')
    const [jobSkillFilter, setjobSkillFilter] = useState('')
    const [filteredResults, setFilteredResults] = useState([])

    /**
     * Function that removes HTML tags from a string.
     * @param {string} str - String to remove HTML tags from. 
     */
    function stripHtmlTags(str){
        if(str === null || str === ""){
            return false
        }else{
            str = str.toString()
        }
        return str.replace(/(<([^>]+)>)/ig, "")
    }

    /**
     * Function that capitalizes the first letter of a job title.
     * @param {string} str - Title of job.
     */
    function capitalize(str){
        if(typeof(str) !== 'string'){
            return ""
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    /**
     * Function that toggles the apply modal and displays it to the user.
     * @param {object} job - The job position to be applied to.
     */
    function toggleModal(job){
        if(userInfo){
            setIsModalOpen(!isModalOpen)
            setjobToApply(job)
        }else{
            setIsErrorModalOpen(!isErrorModalOpen)
            setErrorMessage("You must be logged in to apply.")
        }
    }

    // Function that clears the motivation, cover letter, and job to apply to 
    function clearInput(){
        setCoverLetter("")
        setMotivation("")
        setjobToApply({})
    }

    // Function that shows or hides the error message modal
    function showErrorModal(){
        setIsErrorModalOpen(!isErrorModalOpen)
    }

    /**
     * Function that handles submitting data to server
     * @param {event} e - Event target and their values
     */
    function submitHandler(e){
        e.preventDefault()
        dispatch(apply(jobToApply.id , motivation, coverLetter))
    }

    function filterResults(e){
        e.preventDefault()

        var results = []

        if(typeof jobs !== 'undefined' || jobs !== null){

            // Filter job listings by the city and add it to the results array if located
            if(jobLocationFilter !== ""){
                jobs.forEach(job => {
                    if(job.location === jobLocationFilter){
                        results.push(job)
                    }
                })
            }

            // Filter job listings by the job type and add it to the results array if located
            if(jobTypeFilter !== ""){
                jobs.forEach(job => {
                    if(job.job_type === jobTypeFilter){
                        if(!results.includes(job)){ results.push(job) }
                    }
                })
            }

            // Filter job listings by job skill and add it to the results array if located
            if(jobSkillFilter !== ""){
                jobs.forEach(job => {
                    if(job.skills_tag.includes(jobSkillFilter)){
                        if(!results.includes(job)){ results.push(job) }
                    }
                })
            }
        }

        setFilteredResults(results)
    }

    return (
        <JobsContainer>
            <FilterFormContainer onSubmit={filterResults}>
                <h2>Filters</h2>
                <FilterGroup>
                    <FilterSelect onChange={e => setJobTypeFilter(e.target.value)} name="job-type">
                        <FilterOption value="">Job Type</FilterOption>
                        {
                            (typeof(jobs) !== 'undefined' && jobs !== null) && (
                                jobs.map(job => (
                                    <FilterOption value={job.job_type}>
                                        {job.job_type}
                                    </FilterOption>
                                ))
                            )
                        }
                    </FilterSelect>
                </FilterGroup>
                <FilterGroup>
                    <FilterSelect onChange={e => setJobLocationFilter(e.target.value)} name="job-location">
                        <FilterOption value="">Job Location</FilterOption>
                        {
                            (jobs !== undefined && jobs !== null) && (
                                jobs.filter(job => job.location !== undefined).map(job => (
                                    <FilterOption value={job.location}>
                                        {job.location}
                                    </FilterOption>
                                ))
                            )
                        }
                    </FilterSelect>
                </FilterGroup>
                <FilterGroup>
                    <FilterSelect onChange={e => setjobSkillFilter(e.target.value)} name="job-skill">
                        <FilterOption value="">Job Skills</FilterOption>
                        {
                            (typeof(jobs) !== 'undefined') && (
                                jobs.map(job => (
                                    job.skills_tag.map(skill => (
                                        <FilterOption value={skill}>{skill}</FilterOption>
                                    ))
                                ))
                            )
                        }
                    </FilterSelect>
                </FilterGroup>
                <FilterBtnWrap>
                    <FilterBtn type="submit">Search</FilterBtn>
                </FilterBtnWrap>
            </FilterFormContainer>
            <JobPostingsContainer>
                {loading ? (<Loading src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" />) : 
                    error ? (<p>Error: {error}</p>)
                : filteredResults.length > 0 ?  (
                    <>
                        {filteredResults.map(job => (
                            <JobPosting key={job.id}>
                                <JobTitle>{job.title}</JobTitle>
                                <JobCompany>{capitalize(job.company)}</JobCompany>
                                <JobType>{job.job_type}</JobType>
                                <JobLocation>{job.location}</JobLocation>
                                <JobDesc>{stripHtmlTags(job.description)}</JobDesc>
                                <h3>Requirements</h3>
                                <JobSkills>
                                    {job.skills_tag !== undefined && job.skills_tag !== null  ? (
                                        job.skills_tag.map(tag => <Skill>{tag}</Skill>)
                                    ) : (
                                        null
                                    )}
                                </JobSkills>
                                <ApplyBtn onClick={(e) => toggleModal(job)}>Apply</ApplyBtn>
                            </JobPosting>
                        ))}
                    </>
                ) : (
                    <>
                    {
                        (typeof jobs !== 'undefined' && jobs !== null) ? (
                            jobs.map((job) => (
                                <JobPosting key={job.id}>
                                    <JobTitle>{job.title}</JobTitle>
                                    <JobCompany>{capitalize(job.company)}</JobCompany>
                                    <JobType>{job.job_type}</JobType>
                                    <JobLocation>{job.location}</JobLocation>
                                    <JobDesc>{stripHtmlTags(job.description)}</JobDesc>
                                    <h3>Requirements</h3>
                                    <JobSkills>
                                        {job.skills_tag !== undefined && job.skills_tag !== null  ? (
                                            job.skills_tag.map(tag => <Skill>{tag}</Skill>)
                                        ) : (
                                            null
                                        )}
                                    </JobSkills>
                                    <ApplyBtn onClick={(e) => toggleModal(job)}>Apply</ApplyBtn>
                                </JobPosting>
                            ))
                        ) : ( null )
                    }
                    </>
                )}
            </JobPostingsContainer>
            <ModalContainer isModalOpen={isModalOpen}>
                <CloseIcon onClick={() => {toggleModal(); clearInput()}}/>
                <ApplyFormContainer onSubmit={submitHandler}>
                    <JobTitle>{jobToApply.title}</JobTitle>
                    <MotivationInput type="text" placeholder="Motivation" value={motivation} onChange={(e) => setMotivation(e.target.value)} required/>
                    <CoverLetterInput placeholder="Cover Letter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} required/>
                    <SubmitApplicationBtn type="submit">Submit</SubmitApplicationBtn>
                </ApplyFormContainer>
            </ModalContainer>
            <ErrorModalContainer isErrorModalOpen={isErrorModalOpen}>
                <CloseIcon onClick={showErrorModal} />
                <ErrorContent>
                    {errorMessage ? (
                        <ErrorMessage>
                            {errorMessage}
                        </ErrorMessage>
                    ): (null)}
                    <ErrorBtn>
                        <ErrorBtnLink to="/login">Login</ErrorBtnLink>
                    </ErrorBtn>
                </ErrorContent>
            </ErrorModalContainer>
        </JobsContainer>
    )
}

export default Jobs
