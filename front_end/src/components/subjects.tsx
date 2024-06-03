import React from "react";
import { Schedules } from "./schedules.tsx";

interface PropsSubjects {
    data: any;
}

export class Subjects extends React.Component<PropsSubjects> {

    public render() {
        const { data } = this.props;

        return (
            <div className="subjects-container">
                {data.map((aula: any) => {
                    return (
                        <div className="subjects">
                            <div className="subjects_container">
                                <div className="subjects_description-action">
                                    <div className="subjects_description">
                                        {aula.aula}
                                        <div className="subjects_teacher">{aula.professor}</div>
                                    </div>
                                    {/* <div className="subjects_action"><i className="bi bi-pencil-square"></i></div> */}
                                </div>

                                <Schedules data={aula} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}