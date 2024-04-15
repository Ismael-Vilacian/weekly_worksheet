import React from "react";
import { Subjects } from "./subjects.tsx";

interface PropsCourses {
    data: any;
}

export class Courses extends React.Component<PropsCourses> {

    public render() {
        const { data } = this.props;

        return (
          <div>
            {data.map((curso: any) => {
                    return (
                        <div className="cursos">
                            <div className="cursos_descricao">{curso.descricao}</div>

                            <Subjects data={curso} />
                        </div>
                    );
                })}
 
          </div>
        )
    }
}