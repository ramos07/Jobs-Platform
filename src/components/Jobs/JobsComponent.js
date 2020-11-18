import styled from 'styled-components'
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export const JobsContainer = styled.div`
    position: relative;
    padding: 1rem;
`

export const FilterContainer = styled.div`
    display: flex;
    column-gap: 1rem;
    padding: 2rem;
    justify-content: center;
    align-items: baseline;

    @media screen and (max-width: 768px) {
        row-gap: 1rem;
        flex-direction: column;
        align-items: center;
    }
`

export const FilterGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    column-gap: .5rem;
`

export const FilterSelect = styled.select`
    padding: .5em;
    outline: none;
    border-radius: 15px;
`

export const FilterOption = styled.option`
    padding: 1rem;
`

export const FilterBtnWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: .5rem;
`

export const FilterBtn = styled.button`
    border-radius: 50px;
    background: rgb(45,45,43);
    white-space: nowrap;
    padding: 10px 22px;
    color: rgb(249,249,249);
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
`

export const ResetFilterBtn = styled.button`
    border-radius: 50px;
    background: #ff7f7f;
    white-space: nowrap;
    padding: 10px 22px;
    color: rgb(45,45,43);
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
`

export const JobPostingsContainer = styled.div`
    position: relative;
    height: 65vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 1px solid black;
`

export const JobPosting = styled.div`
    padding: 2rem;
`

export const JobTitle = styled.h1`

`
export const JobCompany = styled.h2`

`

export const JobType = styled.h3`

`

export const JobLocation = styled.h3`

`

export const JobDesc = styled.p`
    line-height: 2rem;
`

export const JobSkills = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 0 0 1.5rem 1.5rem ;
`

export const Skill = styled.li`

`

export const ApplyBtn = styled.button`
    border-radius: 50px;
    background: rgb(45,45,43);
    white-space: nowrap;
    padding: 10px 22px;
    color: rgb(249,249,249);
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: rgb(240,228,216);
        color: rgb(45,45,43);
    }
`

export const Loading = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    height: 70%;
    width: 50%;
    transform: translate(-50%, -50%);
    background: rgb(45,45,43);
    color: rgb(249,249,249);
    display: ${({ isModalOpen }) => (isModalOpen ? 'block' : 'none')};
    z-index: 99;
    border-radius: 15px;
    text-align: center;

    @media screen and (max-width: 768px) {
        width: 90%;
    }
`
export const CloseIcon = styled(FaTimes)`
    color: rgb(249,249,249);
    position: absolute;
    top: 5%;
    right: 5%;
    font-size: 1.5rem;
    cursor: pointer;
`

export const ApplyFormContainer = styled.form`
    position: absolute;
    top:50%;
    left: 50%;
    width: 75%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
`

export const ApplyFormMessage = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    color: red;
`

export const MotivationInput = styled.input`
    border-radius: 15px;
    padding: 10px 20px;
    outline: none;
    border: none;
`

export const CoverLetterInput = styled.textarea`
    border-radius: 15px;
    padding: 10px 20px;
    outline: none;
`

export const SubmitApplicationBtn = styled.button`
    border-radius: 50px;
    background: green;
    color: white;
    white-space: nowrap;
    padding: 10px 22px;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: all .3s cubic-bezier(.67, .17, .40, .83);
`

export const ErrorModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 300px;
    transform: translate(-50%, -50%);
    background: #ff7f7f;
    text-align: center;
    display: ${({ isErrorModalOpen }) => (isErrorModalOpen ? 'block' : 'none')};
    z-index: 99;
    border-radius: 10px;
`

export const ErrorContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`

export const ErrorMessage = styled.p`
    color: black;
    font-size: 20px;
`
export const ErrorBtn = styled.button`
    border-radius: 50px;
    background: rgb(45,45,43);
    color: white;
    white-space: nowrap;
    padding: 10px 22px;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: none;

`

export const ErrorBtnLink = styled(Link)`
    text-decoration: none;
    color: white;
`