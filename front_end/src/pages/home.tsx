import React, { useEffect, useMemo } from "react";
import { Courses } from "../components/courses.tsx";
import NoData from "../components/no-data.tsx";
import { Events } from "../utils/events.ts";
import { requestGet } from "../utils/tools.tsx";

const Home: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [dados, setDados] = React.useState([]);


    useEffect(() => {
        requestGet('get-home-data')
            .then(data => {
                setDados(ajustarObjeto(data))
            });
    }, []);

    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'home');
    }, [events]);
    function ajustarObjeto(objeto) {
        return objeto.map(curso => {
            return {
                descricao: curso.descricao,
                turmas: curso.turmas.map(turma => {
                    const aulas = Object.values(turma.aulas).flat();
                    const aulasAgrupadas = aulas.reduce((acc: any, aulaAtual: any) => {
                        const aulaExistente = acc.find(aula => aula.aula === aulaAtual.descricao);
                        if (aulaExistente) {
                            const diaExistente = aulaExistente.diasLetivos.find(dia => dia.dia === aulaAtual.diasLetivos[0].dia);
                            if (diaExistente) {
                                diaExistente.horarios.push({ horario: aulaAtual.diasLetivos[0].horario });
                            } else {
                                aulaExistente.diasLetivos.push({
                                    dia: aulaAtual.diasLetivos[0].dia,
                                    horarios: [{ 
                                        horario: aulaAtual.diasLetivos[0].horario, 
                                        inicio: aulaAtual.diasLetivos[0].inicio, 
                                        fim: aulaAtual.diasLetivos[0].fim}]
                                });
                            }
                        } else {
                            acc.push({
                                aula: aulaAtual.descricao,
                                professor: aulaAtual.professor,
                                diasLetivos: [{
                                    dia: aulaAtual.diasLetivos[0].dia,
                                    horarios: [{ horario: aulaAtual.diasLetivos[0].horario }]
                                }]
                            });
                        }
                        return acc;
                    }, []);
                    return {
                        descricao: turma.descricao,
                        aulas: aulasAgrupadas
                    };
                })
            };
        });
    }

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