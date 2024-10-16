import mailImage from "../../assets/email.svg";
import phoneImage from "../../assets/phone.svg";
import locationImage from "../../assets/location.svg";
import {useMemo} from "react";

function ShowPerson({infoPerson, backgroundColor}) {
    return useMemo(() => (
        <div className="header" >
            <h1 className="name-info">
                {infoPerson['fullName']}
            </h1>
            <div className="info-user">
                {infoPerson['email'] && <div className="item-info">
                    <img src={mailImage} width="20px" className="mr-10"/>
                    {infoPerson['email']}
                </div>}
                {infoPerson['phoneNumber'] && <div className="item-info">
                    <img src={phoneImage} width="20px" className="mr-10"/>
                    {infoPerson['phoneNumber']}
                </div>}
                {infoPerson['address'] && <div className="item-info">
                    <img src={locationImage} width="20px" className="mr-10"/>
                    {infoPerson['address']}
                </div>}
            </div>
        </div>
    ), [infoPerson, backgroundColor])
}

export default ShowPerson