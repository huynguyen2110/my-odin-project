function Color() {
    const updateColor = (e) => {
        document.body.style.setProperty('--header-cv', e.target.value)
    }

    return (
        <div className={"template-container border-radius-bottom"}>
            <h2>Color</h2>
            <label className="accent-color">
                Accent Color
                <input type="color" defaultValue={getComputedStyle(document.body).getPropertyValue(
                    "--header-cv"
                )} onChange={updateColor}/>
            </label>
        </div>
    )
}

export default Color