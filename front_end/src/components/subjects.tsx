import React from "react";

interface PropsSubjects {
    data: any;
}

export class Subjects extends React.Component<PropsSubjects> {

    public render() {
        const { data } = this.props;

        return (
            <div>
                {data.disciplinas.map((disciplina: any) => {
                    return (
                        <div>
                            <div>
                                <div>
                                    {disciplina.descricao}
                                    <div>{disciplina.professor}</div>
                                </div>
                                <div>editar</div>
                            </div>

                            <div>
                                {disciplina.diasLetivos.map((dia: any) => {
                                    return (
                                        <div>{dia.dia}</div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}