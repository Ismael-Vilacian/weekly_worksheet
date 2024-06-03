import React, { useEffect } from 'react';

const TableTimes = ({ dados }) => {
  const [table, setTable] = React.useState({});
  const [horarios, setHorarios] = React.useState() as any;
  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const group = () => {
    const aulas = dados.aulas;
    const resultado = {};

    for (const aula of aulas) {
      const diaSemana = aula.diaSemana__nome;
      const horario = aula.horario__descricao;

      if (!resultado[diaSemana]) {
        resultado[diaSemana] = {};
      }

      if (!resultado[diaSemana][horario]) {
        resultado[diaSemana][horario] = [];
      }

      resultado[diaSemana][horario].push(aula);
    }

    return resultado;
  }

  const obterNomesHorarios = (dados) => {
    const nomesHorarios = new Set();

    for (const dia in dados) {
      for (const horario in dados[dia]) {
        const nomeHorario = dados[dia][horario][0].horario__descricao;
        nomesHorarios.add(nomeHorario);
      }
    }

    return Array.from(nomesHorarios);
  }


  useEffect(() => {
    const data = group();
    const dataHorario: any = obterNomesHorarios(data);
    setHorarios(dataHorario)
    setTable(data);
  }, [dados]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {diasSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        {table && horarios &&
          <tbody>
            {horarios.map((horario) => (
              <tr key={horario}>
                <td>{horario}</td>
                {diasSemana.map((dia) => (
                  <td key={dia}>
                    {table[dia] && table[dia][horario] ? (
                      <>
                        <p className='disciplina-table'>{table[dia][horario][0].disciplina__disciplina__nome}</p>
                        <p>{table[dia][horario][0].professor__nome}</p>
                      </>
                    ) : (
                      <p>-</p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        }
      </table>
    </div>
  );
};

export default TableTimes;
