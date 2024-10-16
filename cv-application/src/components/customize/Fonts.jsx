import {useState} from "react";

function Fonts() {
    const [font, setFont] = useState('serif')
    const updateFonts = (e) => {
        setFont(e)
        document.body.style.setProperty('--font', e)
    }

    return (
        <div className={"template-container border-radius-bottom"}>
            <h2>Fonts</h2>
            <div className="font-select">
                <button className={`btn-choose-font ${font === 'serif' ? 'choosen-font' : ''} `} onClick={() => updateFonts('serif')}><span className="font-test">Aa</span>Serif</button>
                <button className={`btn-choose-font ${font === 'Lucida Console' ? 'choosen-font' : ''} `}  onClick={() => updateFonts('Lucida Console')}><span className="font-test">Aa</span>Lucida</button>
                <button className={`btn-choose-font ${font === 'monospace' ? 'choosen-font' : ''} `} onClick={() => updateFonts('monospace')}><span className="font-test">Aa</span>Mono</button>
            </div>
        </div>
    )
}

export default Fonts