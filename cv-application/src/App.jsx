import Customize from "./components/sidebar/Customize.jsx";
import LoadTemplate from "./components/loadTemplate/LoadTemplate.jsx";
import AddInformation from "./components/AddInformation.jsx";
import ShowCv from "./components/showCv/ShowCv.jsx";
import './styles/style.css'
import {useState} from "react";
import data from "./data.js";
import uniqid from "uniqid";
import OptionCustomize from "./components/customize/OptionCustomize.jsx";

function App() {
    const [infoPerson, setInfoPerson] = useState(data.personalInfo)
    const [education, setEducation] = useState(data.sections.educations)
    const [experience, setExperience] = useState(data.sections.experiences)
    const [oldInfo, setOldInfo] = useState(data)
    const [modeId, setModeId] = useState(1)

    const handleRecoverOldInfo = (e) => {
        const formContain = e.target.closest('form')
        const sectionName = formContain.getAttribute('data-section')
        switch (sectionName) {
            case 'education':
                setEducation(oldInfo.sections.educations)
                break
            case 'experience':
                setExperience(oldInfo.sections.experiences)
                break
        }
    }
    const handleSaveOldInfo = (e) => {
        const formContain = e.target.closest('form')
        const sectionName = formContain.getAttribute('data-section')
        switch (sectionName) {
            case 'education': {
                const newSections = {...oldInfo.sections, educations: education}
                setOldInfo({...oldInfo, sections: newSections})
                break
            }
            case 'experience': {
                const newSections = {...oldInfo.sections, experiences: experience}
                setOldInfo({...oldInfo, sections: newSections})
                break
            }
        }
    }
    const handleDeleteItemInfo = (e) => {
        const formContain = e.target.closest('form')
        const sectionName = formContain.getAttribute('data-section')
        const formId = formContain.id

        switch (sectionName) {
            case 'education': {
                const newEducation = education.filter(edu => edu.id !== formId)
                const newSections = {...oldInfo.sections, educations: newEducation}
                setEducation(newEducation)
                setOldInfo({...oldInfo, sections: newSections})
                break
            }
            case 'experience': {
                const newExperience = experience.filter(edu => edu.id !== formId)
                const newSections = {...oldInfo.sections, experiences: newExperience}
                setExperience(newExperience)
                setOldInfo({...oldInfo, sections: newSections})
                break
            }
        }
    }
    const handleAddItem = (sectionName) => {
        switch (sectionName) {
            case 'education': {
                const newId = uniqid()
                const newEducation = {
                    degree: "",
                    schoolName: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    id: newId,
                }
                const newSections = {...oldInfo.sections, educations: [...education, newEducation]}
                setEducation([...education, newEducation])
                setOldInfo({...oldInfo, sections: newSections})

                return newId

            }
            case 'experience': {
                const newId = uniqid()
                const newExperience = {
                    companyName: "",
                    positionTitle: "",
                    location: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    id: newId,
                }
                const newSections = {...oldInfo.sections, experiences: [...experience, newExperience]}
                setExperience([...experience, newExperience])
                setOldInfo({...oldInfo, sections: newSections})

                return newId
            }
        }
    }
    const handleChangeInput = (e) => {
        const formContain = e.target.closest('form')
        const sectionName = formContain.getAttribute('data-section')
        const formId = formContain.id

        const key = e.target.getAttribute('data-key')

        switch (sectionName) {
            case 'personal':
                setInfoPerson({...infoPerson, [key]: e.target.value})
                break
            case 'education': {
                const newEducation = education.map(edu => {
                    if (edu.id !== formId) {
                        return edu
                    } else {
                        return {...edu, [key]: e.target.value}
                    }
                })

                setEducation(newEducation)

                break
            }
            case 'experience': {
                const newExperience = experience.map(edu => {
                    if (edu.id !== formId) {
                        return edu
                    } else {
                        return {...edu, [key]: e.target.value}
                    }
                })

                setExperience(newExperience)
                break
            }

        }
    }
    const handleLoadTemplate = () => {
        setInfoPerson(data.personalInfo)
        setEducation(data.sections.educations)
        setExperience(data.sections.experiences)
        setOldInfo(data)
    }
    const handleClearTemplate = () => {
        setInfoPerson({
            fullName: "",
            email: "",
            phoneNumber: "",
            address: "",
        })
        setEducation([])
        setExperience([])
        setOldInfo({
            personalInfo: {
                fullName: "",
                email: "",
                phoneNumber: "",
                address: "",
            },
            sections: {
                educations: [],
                experiences: [],
            }
        })
    }

    return (
        <div className={"container"}>
            <div className={"editable-container flex"}>
                <Customize setModeId={setModeId} modeId={modeId}></Customize>
                <div className="flex group-template">
                    <LoadTemplate handleLoadTemplate={handleLoadTemplate} handleClearTemplate={handleClearTemplate}></LoadTemplate>

                    {modeId === 1 &&
                        <AddInformation handleChangeInput={handleChangeInput} infoPerson={infoPerson} education={education} experience={experience}
                                                                         handleRecoverOldInfo={handleRecoverOldInfo}
                                                                         handleSaveOldInfo={handleSaveOldInfo} handleDeleteItemInfo={handleDeleteItemInfo}
                                                                         handleAddItem={handleAddItem}
                        ></AddInformation>
                    }

                    {modeId === 2 &&
                        <OptionCustomize></OptionCustomize>

                    }



                </div>
            </div>
            <ShowCv infoPerson={infoPerson} educations={education} experiences={experience}></ShowCv>
        </div>
    )
}

export default App
