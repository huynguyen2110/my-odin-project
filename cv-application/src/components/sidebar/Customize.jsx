import contentImage from '../../assets/content.svg'
import customizeImage from '../../assets/customize.svg'
function Customize ({setModeId, modeId}) {
    return (
        <div className={`customize-container `}>
            <div className={`item-customize ${modeId === 1 ? 'selected-mode' : ''}`} onClick={() => setModeId(1)}>
                <img src={contentImage} width="20px" />
                <div>Content</div>
            </div>
            <div className={`item-customize ${modeId === 2 ? 'selected-mode' : ''}`} onClick={() => setModeId(2)}>
                <img src={customizeImage} width="20px"/>
                <div>Customize</div>
            </div>
        </div>
    )
}

export default Customize