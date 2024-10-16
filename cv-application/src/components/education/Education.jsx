
import {useState} from "react";
import ItemForm from "../common/ItemForm.jsx";
import ButtonAdd from "../common/ButtonAdd.jsx";
import FormEducation from "./FormEducation.jsx";
import Card from "../common/Card.jsx";
import educationImage from "../../assets/education.svg";

function Education({handleChangeInput, educations, handleRecoverOldInfo, handleSaveOldInfo, handleDeleteItemInfo, handleAddItem}) {
    const[isExpand, setIsExpand] = useState(false)
    const [educationEditId, setEducationEditId] = useState(null)

    const currentEducation = educations.find(education => education.id === educationEditId)
    return (
        <div>
            <div className="template-container" >
                <Card isExpand={isExpand} setIsExpand={setIsExpand} title={"Education"} image={educationImage}/>
                {isExpand && educationEditId && <FormEducation handleChangeInput={handleChangeInput} item={currentEducation} setEditId={setEducationEditId}  handleRecoverOldInfo={handleRecoverOldInfo} handleSaveOldInfo={handleSaveOldInfo} handleDeleteItemInfo={handleDeleteItemInfo}/>}
            </div>
            {isExpand && !educationEditId && educations.map((edu, index) => <ItemForm index={index} key={edu.id} title={edu.degree} setEditId={setEducationEditId} editId={edu.id}></ItemForm>)}
            {isExpand && !educationEditId && <ButtonAdd text="Education" section="education" handleAddItem={handleAddItem} setEditId={setEducationEditId}></ButtonAdd>}
        </div>

        )
    }

export default Education