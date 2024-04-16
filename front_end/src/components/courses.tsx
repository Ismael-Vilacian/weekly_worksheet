import React from "react";
import { Subjects } from "./subjects.tsx";

interface PropsCourses {
    data: any;
}

export class Courses extends React.Component<PropsCourses> {

    public render() {
        const { data } = this.props;

        return (
          <div className="courses">
            {data.map((curso: any) => {
                    return (
                        <div className="courses_container">
                            <div className="courses_description">{curso.descricao}</div>

                            <Subjects data={curso} />
                        </div>
                    );
                })}
 
          </div>
        )
    }
}