import Personal from "./personal/Personal.jsx";
import Education from "./education/Education.jsx";
import Experience from "./experience/Experience.jsx";

function AddInformation({
                            handleChangeInput,
                            infoPerson,
                            education,
                            experience,
                            handleRecoverOldInfo,
                            handleSaveOldInfo,
                            handleDeleteItemInfo,
                            handleAddItem
                        }) {
    return (
        <>
            <Personal handleChangeInput={handleChangeInput} infoPerson={infoPerson}></Personal>
            <Education handleChangeInput={handleChangeInput} educations={education}
                       handleRecoverOldInfo={handleRecoverOldInfo} handleSaveOldInfo={handleSaveOldInfo}
                       handleDeleteItemInfo={handleDeleteItemInfo} handleAddItem={handleAddItem}>

            </Education>
            <Experience handleChangeInput={handleChangeInput} experiences={experience}
                        handleRecoverOldInfo={handleRecoverOldInfo} handleSaveOldInfo={handleSaveOldInfo}
                        handleDeleteItemInfo={handleDeleteItemInfo} handleAddItem={handleAddItem}>
            </Experience>
        </>
    )
}

export default AddInformation