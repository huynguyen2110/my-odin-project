import Input from "../common/Input.jsx";

function Personal({handleChangeInput, infoPerson}) {
    return (
        <div className="template-container personal-template">
            <h2>Personal Details</h2>
            <form className="form-add" data-section="personal">
                <Input
                    id="fullName"
                    name="Full name"
                    placeHolder="First and last name"
                    value={infoPerson.fullName}
                    handleChangeInput={handleChangeInput}
                />
                <Input
                    id="email"
                    name="Email"
                    placeHolder="Enter email"
                    value={infoPerson.email}
                    handleChangeInput={handleChangeInput}
                />
                <Input
                    id="phoneNumber"
                    name="Phone number"
                    placeHolder="Enter phone number"
                    value={infoPerson.phoneNumber}
                    handleChangeInput={handleChangeInput}
                />
                <Input
                    id="address"
                    name="Address"
                    placeHolder="City, Country"
                    value={infoPerson.address}
                    handleChangeInput={handleChangeInput}
                />
            </form>
        </div>
    )
}

export default Personal