
import ShowEducation from "../education/ShowEducation.jsx";
import ShowPerson from "../personal/ShowPerson.jsx";
import ShowExperience from "../experience/ShowExperience.jsx";
import {useMemo} from "react";

function ShowCv({ infoPerson, educations, experiences }) {
    const memoizedEducationSection = useMemo(() => {
        return educations.length > 0 && (
            <div className="section-education">
                <h2 className="header-section">Education</h2>
                {educations.map(edu => <ShowEducation key={edu.id} education={edu}/>)}
            </div>
        );
    }, [educations]);

    const memoizedExperienceSection = useMemo(() => {
        return experiences.length > 0 && (
            <div className="section-experience">
                <h2 className="header-section">Experience</h2>
                {experiences.map(exp => <ShowExperience key={exp.id} experience={exp}/>)}
            </div>
        );
    }, [experiences]);

    return (
        <div className="show-cv">
            <ShowPerson infoPerson={infoPerson} />
            {memoizedEducationSection}
            {memoizedExperienceSection}
        </div>
    );
}

export default ShowCv