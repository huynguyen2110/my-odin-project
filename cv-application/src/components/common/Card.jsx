import arrowUpImage from "../../assets/arrow-up.svg";
import arrowDownImage from "../../assets/arrow-down.svg";

function Card({isExpand, setIsExpand, title, image}) {
    return (
        <div className="template-container">
            <h2 className="flex justify-content-between cursor-pointer" onClick={() => setIsExpand(!isExpand)}>
                <div>
                    <img src={image} width="20px" className="mr-10"/>
                    {title}
                </div>
                <img src={isExpand ? arrowUpImage : arrowDownImage} width="25px"/>
            </h2>
        </div>
    )
}

export default Card