import React from "react";
import { Courses } from "../components/courses.tsx";

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
            }];
        return (
            <div className="page">
                <Courses data={dados} />
            </div>
        )
    }
}