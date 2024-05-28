import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { Events } from "../utils/events.ts";
import Modal from "../components/modal.tsx";
import { InputDefault } from "../components/input-default.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import InputSelect from "../components/input-select.tsx";
import { loading, openAlert } from "../utils/tools.tsx";
declare var URL_API: any;

const WorkBoardList: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [openModal, setOpenModal] = React.useState(false);
    const [courses, setCourses] = React.useState([]);
    const [disciplines, setDisciplines] = React.useState([]);
    const [couseSelected, setCourseSelected] = React.useState(null);
    const [disciplineSelected, setDisciplineSelected] = React.useState([]);

    useEffect(() => {
        fetch(`${URL_API}/get-course/`)
            .then(response => response.json())
            .then(data => {
                setCourses(data);
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'reports');
    }, [events]);

    const adjustCourseDataAndGetDisciplines = (data: any) => {
        setCourseSelected(data);
        setDisciplines([]);

        fetch(`${URL_API}/get-disciplines-by-courseid/${data.id}`)
            .then(response => response.json())
            .then(data => {
                setDisciplines(data);
            })
            .catch(console.log);
    }

    const creatWorkBoard = () => {
        const inputName: any = document.querySelector('input[name="turma_name"]');

        if (!validadeForm(inputName)) return;

        const data = {
            turma: inputName.value,
            curso: couseSelected,
            disciplinas: disciplineSelected
        }

        let url = `${URL_API}/creat-work-board/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            loading(false);
            openAlert('Curso cadastrado com sucesso', 'success');
        }).catch(() => {
            loading(false);
            openAlert('Erro ao cadastrar curso', 'failure');
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