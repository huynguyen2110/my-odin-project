import eyeImage from "../../assets/eye.svg";

function ItemForm({index, title, setEditId, editId}) {
    return (
        <div className={`card-item cursor-pointer ${index !== 0 ? "border-top-none" : ""}`} onClick={() => setEditId(editId)} >
            <h3 className="title-card-item">{title}</h3>
            <img src={eyeImage} width="25px"/>
        </div>
    )
}

export default ItemForm