import deleteImage from "../../assets/delete.svg";

function LoadTemplate({handleLoadTemplate, handleClearTemplate}) {

    return (
        <div className="load-template-container flex">
            <div className="flex template-item option-clear cursor-pointer">
                <img src={deleteImage} width="20px"/>
                <div className="text-clear" onClick={handleClearTemplate}>Clear Resume</div>
            </div>
            <div className="flex template-item option-load cursor-pointer" onClick={handleLoadTemplate}>Load Example</div>
        </div>
    )
}

export default LoadTemplate