function ShowEducation({education}) {
    return (
        <>
            <div className="item-section">
                <div className="first-part">
                    {(education.startDate || education.endDate) &&
                        <div className="time">{education.startDate} – {education.endDate}</div>}
                    <div className="location">{education.location}</div>
                </div>
                <div className="second-part">
                    <div className="school">{education.schoolName}</div>
                    <div className="degree">{education.degree}</div>
                </div>
            </div>

        </>
    )
}

export default ShowEducation