import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { Events } from "../utils/events.ts";
import Modal from "../components/modal.tsx";
import { InputDefault } from "../components/input-default.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import InputSelect from "../components/input-select.tsx";
import { openAlert, requestDelete, requestGet, requestPost } from "../utils/tools.tsx";
import NoData from "../components/no-data.tsx";
import { CardList } from "../components/card-list.tsx";
import TableTimes from "../components/table-times.tsx";

const WorkBoardList: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [openModal, setOpenModal] = React.useState(false);
    const [courses, setCourses] = React.useState([]);
    const [disciplines, setDisciplines] = React.useState([]);
    const [couseSelected, setCourseSelected] = React.useState(null);
    const [disciplineSelected, setDisciplineSelected] = React.useState([]);
    const [workBoards, setWorkBoards] = React.useState([]);
    const [table, setTable] = React.useState() as any;

    useEffect(() => {
        requestGet('get-course')
            .then(data => setCourses(data));
    }, []);


    useEffect(() => {
        getWorkBoards();
    }, []);

    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'reports');
    }, [events]);

    const getWorkBoards = () => {
        requestGet('get-work-board')
            .then(data => setWorkBoards(data));
    }

    const adjustCourseDataAndGetDisciplines = (data: any) => {
        setCourseSelected(data);
        setDisciplines([]);

        requestGet('get-disciplines-by-courseid', true, data.id)
            .then(data => setDisciplines(data));
    }

    const creatWorkBoard = () => {
        const inputName: any = document.querySelector('input[name="turma_name"]');

        if (!validadeForm(inputName)) return;

        const data = {
            turma: inputName.value,
            curso: couseSelected,
            disciplinas: disciplineSelected
        }

        requestPost('creat-work-board', data, 'Quadro de trabalho criado com sucesso').then(response => {
            if (response !== false) {
                setOpenModal(false);
                getWorkBoards();
            }
        })
    }

    const deleteWorkBoard = (id: any) => {
        const work = workBoards.filter((data: any) => data.turma.id !== id);
        requestDelete(`delete-work-board`, 'Quadro de trabalho deletado com sucesso', id)
            .then(() => {
                setWorkBoards(work);
            });
    }

    function validadeForm(inputName) {
        if (!inputName.value || inputName.value === '') {
            openAlert('O nome da turma é obrigatório', 'failure');
            inputName.focus();
            return false;
        }

        if (!couseSelected) {
            openAlert('Selecione o curso!', 'failure');
            return false;
        }

        if (!disciplineSelected || disciplineSelected.length === 0) {
            openAlert('Selecione ao menos uma disciplina!', 'failure');
            return false;
        }

        return true;
    }

    return (
        <div className="page">
            <Header description="Quadro de trabalho" action={() => setOpenModal(true)} actionDescription="Criar quadro de trabalho" iconAction="bi bi-plus-circle" />
            {(!workBoards || workBoards.length === 0) && <NoData title="Nenhum quadro de trabalho encontrado" description="Realize o cadastro para visualiza-los" />}

            {workBoards && workBoards.length > 0 &&
                <div className="card-list">
                    {
                        workBoards.map((data: any) => {
                            return (
                                <CardList>
                                    <div className="data-work-boards">
                                        <div className="data-work-boards_title">{data.turma.descricao}</div>
                                        <div>
                                            <i onClick={() => setTable(data.turma)} className="bi bi-eye"></i>
                                            <i onClick={() => deleteWorkBoard(data.turma.id)} className="bi bi-x"></i>
                                        </div>
                                    </div>
                                </CardList>)
                        })
                    }
                </div>
            }

            {table &&
                <div className="dados-qts">
                    <div className="tabela">
                        <Header description={table.descricao} action={() => setTable(null)} actionDescription="Fechar" iconAction="" />
                        <TableTimes dados={table} />
                    </div>
                </div>}

            {openModal &&
                <Modal title="Gerar quadro de trabalho" funcionClose={() => setOpenModal(false)}>
                    <InputDefault placeholder="Nome da turma" name="turma_name" type="text" />

                    <InputSelect itemSelecionado={{ id: null, nome: '' }} dados={courses} placeholder="Cursos" propriedade="id" aoSelecionar={(data: any) => adjustCourseDataAndGetDisciplines(data)} />

                    {disciplines && disciplines.length > 0 &&
                        <InputMultiSelect placeholder="Disciplinas da turma" dados={disciplines} propriedade="id" itensSelecionados={[]} change={(response) => setDisciplineSelected(response)} />
                    }

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={creatWorkBoard} className="button-default">Salvar alterações</button>
                    </div>
                </Modal>}
        </div>
    );
}

export default WorkBoardList;