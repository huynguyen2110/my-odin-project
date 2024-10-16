import Input from "../common/Input.jsx";
import deleteImage from "../../assets/delete-gray.svg";

function FormEducation({handleChangeInput, item, setEditId, handleRecoverOldInfo, handleSaveOldInfo, handleDeleteItemInfo}) {

    const handleCancelButton = (e) => {
        handleRecoverOldInfo(e)
        setEditId(null)
    }

    const handleSaveButton = (e) => {
        handleSaveOldInfo(e)
        setEditId(null)
    }
    const handleDeleteButton = (e) => {
        handleDeleteItemInfo(e)
        setEditId(null)
    }

    return (
        <div className="pt-10 form">
            <form className="form-add" data-section="education" id={item.id}>
                <Input
                    id="schoolName"
                    name="School"
                    placeHolder="Enter school / university"
                    value={item.schoolName}
                    handleChangeInput={handleChangeInput}
                />
                <Input
                    id="degree"
                    name="Degree"
                    placeHolder="Enter Degree / Field Of Study"
                    value={item.degree}
                    handleChangeInput={handleChangeInput}
                />

                <div className="inline-input">
                    <Input
                        id="startDate"
                        name="Start Date"
                        placeHolder="Enter Start Date"
                        value={item.startDate}
                        handleChangeInput={handleChangeInput}
                    />
                    <Input
                        id="endDate"
                        name="End Date"
                        placeHolder="Enter End Date"
                        value={item.endDate}
                        handleChangeInput={handleChangeInput}
                    />
                </div>
                <Input
                    id="location"
                    name="Location"
                    placeHolder="Enter Location"
                    value={item.location}
                    handleChangeInput={handleChangeInput}
                />
                <div className="group-button">
                    <button type="button" className="delete-button" onClick={handleDeleteButton}>
                        <img src={deleteImage} width="20px"/>
                        <span>Delete</span>
                    </button>
                    <div>
                        <button type="button" className="cancel-button mr-10" onClick={handleCancelButton}>Cancel</button>
                        <button type="button" className="save-button" onClick={handleSaveButton}>Save</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default FormEducation