function Input({id, name, placeHolder, value, handleChangeInput}) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{name}</label>
            <input type="text" id={id} placeholder={placeHolder} value={value} onChange={handleChangeInput} data-key={id}/>
        </div>
    )
}

export default Input