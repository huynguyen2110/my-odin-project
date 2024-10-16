import plusImage from "../../assets/plus.svg";
function ButtonAdd({text, section, handleAddItem, setEditId}) {
    const handleAddButton = () => {
        const newId = handleAddItem(section)
        setEditId(newId);
    }

    return (
        <div className="card-item card-button">
            <div className="custom-button-add">
                <button className="add-button" onClick={handleAddButton}>
                    <img src={plusImage} width="18px"/>
                    <span>{text}</span>
                </button>
            </div>
        </div>

    )
}

export default ButtonAdd