import experienceImage from "../../assets/experience.svg";
import {useState} from "react";
import ButtonAdd from "../common/ButtonAdd.jsx";
import ItemForm from "../common/ItemForm.jsx";
import Card from "../common/Card.jsx";
import FormExperience from "../experience/FormExperience.jsx";

function Experience({handleChangeInput, experiences, handleRecoverOldInfo, handleSaveOldInfo, handleDeleteItemInfo, handleAddItem}) {
    const[isExpand, setIsExpand] = useState(false)
    const [experienceEditId, setExperienceEditId] = useState(null)

    const currentExperience = experiences.find(experience => experience.id === experienceEditId)
    return (
        <div>
            <div className="template-container" >
                <Card isExpand={isExpand} setIsExpand={setIsExpand} title={"Experience"} image={experienceImage}/>
                {isExpand && experienceEditId && <FormExperience handleChangeInput={handleChangeInput} item={currentExperience} setEditId={setExperienceEditId}  handleRecoverOldInfo={handleRecoverOldInfo} handleSaveOldInfo={handleSaveOldInfo} handleDeleteItemInfo={handleDeleteItemInfo}/>}
            </div>
            {isExpand && !experienceEditId && experiences.map((edu, index) => <ItemForm index={index} key={edu.id} title={edu.positionTitle} setEditId={setExperienceEditId} editId={edu.id}></ItemForm>)}
            {isExpand && !experienceEditId && <ButtonAdd text="Experience" section="experience" handleAddItem={handleAddItem} setEditId={setExperienceEditId}></ButtonAdd>}
        </div>

    )
}

export default Experience