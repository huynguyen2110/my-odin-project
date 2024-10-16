function ShowExperience({experience}) {
    return (
        <>
            <div className="item-section">
                <div className="first-part">
                    {(experience.startDate || experience.endDate) &&
                        <div className="time">{experience.startDate} – {experience.endDate}</div>}
                    <div className="location">{experience.location}</div>
                </div>
                <div className="second-part">
                    <div className="company">{experience.companyName}</div>
                    <div className="position">{experience.positionTitle}</div>
                    <div className="description">{experience.description}</div>
                </div>
            </div>

        </>

    )
}

export default ShowExperience