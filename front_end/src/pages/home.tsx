import React from "react";
import { Courses } from "../components/courses.tsx";
import NoData from "../components/no-data.tsx";
import NoCourse from "../assets/svg_icons/no_course.svg";

export class Home extends React.Component {
    public render() {
        const dados = [
            {
                descricao: "Engenharia da computação",
                disciplinas: [
                    {
                        descricao: "Algoritimos e estrutura de dados II",
                        professor: "Rodrigo de Souza Ataides",
                        diasLetivos: [
                            {
                                dia: "Segunda",
                                horarios: [
                                    {
                                        horaInicio: "18:55",
                                        horaFim: "19:45"
                                    }
                                ]
                            },
                            {
                                dia: "Terça",
                                horarios: [
                                    {
                                        horaInicio: "19:45",
                                        horaFim: "20:35"
                                    }
                                ]
                            }]
                    }
                ]
            }
        ];
        return (
            <div className="page">
                {dados && dados.length > 0 && <Courses data={dados} />}
                {(!dados || dados.length === 0) &&
                    <NoData img={NoCourse} title="Nenhum curso encontrado" description="Realize o cadastro dos cursos para visualiza-los" />
                }
            </div>
        )
    }
}