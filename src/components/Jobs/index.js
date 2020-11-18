import React, { useState } from 'react'
import { ResetFilterBtn, ApplyFormContainer, ErrorModalContainer,ErrorBtn, ErrorContent, ErrorBtnLink, JobsContainer, FilterContainer, JobPostingsContainer, JobPosting, JobTitle, Loading, JobCompany, JobType, JobLocation, JobDesc, ApplyBtn, JobSkills, Skill, ModalContainer, CloseIcon, ErrorMessage, MotivationInput, CoverLetterInput, SubmitApplicationBtn, FilterGroup, FilterSelect, FilterOption, FilterBtn, FilterBtnWrap } from "./JobsComponent";

import { apply } from "../../actions/jobActions";

import { useSelector, useDispatch } from "react-redux";

const Jobs = ({ loading, error, jobs }) => {


    const dispatch = useDispatch()

    // Retrieve the user login state from Redux store
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin 


    const [isModalOpen, setIsModalOpen] = useState(false) // Open or close the modal to submit an application
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false) // Open or close modal to display error message
    const [errorMessage, setErrorMessage] = useState("") // Error message to be displayed

    const [jobToApply, setjobToApply] = useState({}) // Job position to apply to
    const [motivation, setMotivation] = useState('') // Motivation for application
    const [coverLetter, setCoverLetter] = useState('') // Cover letter for applications

    const [jobTypeFilter, setJobTypeFilter] = useState('') // Job type filter option
    const [jobLocationFilter, setJobLocationFilter] = useState('') // Job location filter option
    const [jobSkillFilter, setjobSkillFilter] = useState('') // Job skill filter option
    const [filteredResults, setFilteredResults] = useState([]) // Filtered job results based off filter options

    const [submittedApplication, setSubmittedApplication] = useState(false)

    const tickMark = '<svg width="58" height="45" viewBox="0 0 58 45" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-rule="nonzero" d="M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65"/></svg>'

    // On loading the component
    React.useEffect(() => {
        if(submittedApplication === false){
            window.document.getElementById("submit-app-btn").innerHTML = 'Submit'
        }
    }, [submittedApplication])


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
            setSubmittedApplication(!submittedApplication)
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
        setSubmittedApplication(true)
        if(submittedApplication === true){
            window.document.getElementById("submit-app-btn").innerHTML = tickMark
        }
    }

    /**
     * Function that filters out the job listings based off the options selected by the user.
     */
    function filterResults(){

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

    /**
     * Function tht clears the filtered search and resets the options selected as well.
     */
    function clearResults(){
        setJobLocationFilter("")
        setJobTypeFilter("")
        setjobSkillFilter("")
        setFilteredResults([])
    }

    return (
        <JobsContainer>
            {/* Filters Section */}
                <FilterContainer>
                <h2>Filters</h2>
                <FilterGroup>
                    <FilterSelect onChange={e => setJobTypeFilter(e.target.value)} name="job-type">
                        <FilterOption value="">Job Type</FilterOption>
                        {
                            (typeof(jobs) !== 'undefined' && jobs !== null) && (
                                jobs.map(job => (
                                    <FilterOption key={job.job_type} value={job.job_type}>
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
                                    <FilterOption key={job.location} value={job.location}>
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
                                        <FilterOption key={skill} value={skill}>{skill}</FilterOption>
                                    ))
                                ))
                            )
                        }
                    </FilterSelect>
                </FilterGroup>
                <FilterBtnWrap>
                    <FilterBtn type="button" onClick={filterResults}>Search</FilterBtn>
                </FilterBtnWrap>
                <FilterBtnWrap>
                    <ResetFilterBtn type="button" onClick={clearResults}>Reset</ResetFilterBtn>
                </FilterBtnWrap>
            </FilterContainer>
            {/* End of Filters Section */}
            {/* Job Postings Section */}
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
            {/* End of Job Postings Section */}
            {/* Apply to Job Modal */}
            <ModalContainer isModalOpen={isModalOpen}>
                <CloseIcon onClick={() => {toggleModal(); clearInput()}}/>
                <ApplyFormContainer onSubmit={submitHandler}>
                    <JobTitle>{jobToApply.title}</JobTitle>
                    <MotivationInput type="text" placeholder="Motivation" value={motivation} onChange={(e) => setMotivation(e.target.value)} required/>
                    <CoverLetterInput placeholder="Cover Letter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} required/>
                    <SubmitApplicationBtn id="submit-app-btn" type="submit">
                        Submit
                    </SubmitApplicationBtn>
                </ApplyFormContainer>
            </ModalContainer>
            {/* End of Apply to Job Modal */}
            {/* Error Modal - Displayed if user is not logged in */}
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
            {/* End of Error Modal */}
        </JobsContainer>
    )
}

export default Jobs
