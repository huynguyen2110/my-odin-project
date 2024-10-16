// eslint-disable-next-line react/prop-types
function TextArea({id, name, placeHolder}) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{name}</label>
            <textarea id={id} placeholder={placeHolder}/>
        </div>
    )
}

export default TextArea