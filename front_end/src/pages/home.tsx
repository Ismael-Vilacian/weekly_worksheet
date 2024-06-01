import React, { useEffect, useMemo } from "react";
import { Courses } from "../components/courses.tsx";
import NoData from "../components/no-data.tsx";
import { Events } from "../utils/events.ts";

const Home: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    
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

    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'home');
    }, [events]);

    return (
        <div className="page">
            {dados && dados.length > 0 && <Courses data={dados} />}
            {(!dados || dados.length === 0) &&
                <NoData title="Nenhum curso encontrado" description="Realize o cadastro dos cursos para visualiza-los" />
            }
        </div>
    )
}

export default Home;