import Input from "../common/Input.jsx";
import deleteImage from "../../assets/delete-gray.svg";
import TextArea from "../common/TextArea.jsx";

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
            <form className="form-add" data-section="experience" id={item.id}>
                <Input
                    id="companyName"
                    name="Company Name"
                    placeHolder="Enter Company Name"
                    value={item.companyName}
                    handleChangeInput={handleChangeInput}
                />
                <Input
                    id="positionTitle"
                    name="Position Title"
                    placeHolder="Enter Position Title"
                    value={item.positionTitle}
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
                <TextArea
                    id="description"
                    name="Description"
                    placeHolder="Enter Description"
                    value={item.description}
                    handleChangeInput={handleChangeInput}
                />
                <div className="group-button">
                    <button type="button" className="delete-button" onClick={handleDeleteButton}>
                        <img src={deleteImage} width="20px"/>
                        <span>Delete</span>
                    </button>
                    <div>
                        <button type="button" className="cancel-button mr-10" onClick={handleCancelButton}>Cancel
                        </button>
                        <button type="button" className="save-button" onClick={handleSaveButton}>Save</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default FormEducation