import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import { InputDefault } from "../components/input-default.tsx";
import { loading, openAlert, requestDelete, requestGet, requestPost } from "../utils/tools.tsx";
import { Events } from "../utils/events.ts";
import Modal from "../components/modal.tsx";
import NoData from "../components/no-data.tsx";
import { CardList } from "../components/card-list.tsx";

const RegisterCourse: React.FC = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const events = useMemo(() => new Events(), []);
    const [disciplinesData, setDisciplinesData] = React.useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = React.useState([]);
    const [rebuildComponent, setRebuildComponent] = React.useState(false);
    const [courses, setCourses] = React.useState([]);

    useEffect(() => {
        requestGet('get-disciplines')
            .then(data => setDisciplinesData(data));
    }, []);

    useEffect(() => {
        requestGet('get-course')
            .then(data => setCourses(data));
    }, []);

    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'register');
    }, [events]);

    const saveCourse = () => {

        const inputName: any = document.querySelector('input[name="course_name"]');
        const inputHour: any = document.querySelector('input[name="hour_name"]');

        if (!validadeForm(inputName, inputHour)) return;

        loading(true);

        const data = {
            nome: inputName.value,
            carga_horaria: inputHour.value,
            disciplinas: selectedDisciplines
        }

        requestPost('set-course', data, 'Curso cadastrado com sucesso')
            .then(() => {
                cleanForms(inputName, inputHour);
            });
    }

    function validadeForm(inputName, inputHour) {
        if (!inputName.value || inputName.value === '') {
            openAlert('Descrição é obrigatória', 'failure');
            inputName.focus();
            return false;
        }

        if (!inputHour.value || inputHour.value === '') {
            openAlert('Carga horaria é obrigatória', 'failure');
            inputHour.focus();
            return false;
        }

        if (!selectedDisciplines || selectedDisciplines.length === 0) {
            openAlert('Selecione ao menos uma disciplina', 'failure');
            return false;
        }

        return true;
    }

    const cleanForms = (inputName, inputHour) => {
        inputName.value = '';
        inputHour.value = '';
        setSelectedDisciplines([]);
        setRebuildComponent(true);
        setTimeout(() => {
            setRebuildComponent(false);
        }, 100);
    }

    const deleteCourse = (id: any) => {
        requestDelete(`delete-course`, 'Curso deletado com sucesso', id)
            .then(() => {
                const course = courses.filter((data: any) => data.id !== id);
                setCourses(course);
            });
    }

    return (
        <div className="page">
            <Header description="Cadastro de curso" action={() => setOpenModal(true)} actionDescription="Adicionar curso" iconAction="bi bi-plus-circle" />

            {(!courses || courses.length === 0) && <NoData title="Nenhum curso encontrado" description="Realize o cadastro dos cursos para visualiza-los" />}

            {courses && courses.length > 0 &&
                <div className="card-list">
                    {
                        courses.map((data: any) => {
                            return (
                                <CardList>
                                    <div className="data-work-boards">
                                        <div className="data-work-boards_title">{data.nome}</div>
                                        <div>
                                            <i onClick={() => deleteCourse(data.id)} className="bi bi-x"></i>
                                        </div>
                                    </div>
                                </CardList>)
                        })
                    }
                </div>
            }

            {openModal &&
                <Modal title="Gerar quadro de trabalho" funcionClose={() => setOpenModal(false)}>
                    <div className="container_description">
                        <InputDefault placeholder="Descrição" name="course_name" type="text" />
                    </div>

                    <div className="container-hour">
                        <InputDefault disabled={true} placeholder="Carga horaria" name="hour_name" type="number" />
                    </div>

                    <div className="container_disciplines">
                        {!rebuildComponent &&
                            <InputMultiSelect placeholder="Disciplinas" dados={disciplinesData} propriedade="id" itensSelecionados={[]} change={(response) => {
                                setSelectedDisciplines(response)
                                const inputHour: any = document.querySelector('input[name="hour_name"]');
                                let hours = 0;
                                response.forEach((item) => { hours += item.carga_horaria });
                                inputHour.value = hours;
                            }} />
                        }
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={saveCourse} className="button-default">Salvar alterações</button>
                    </div>

                </Modal>}
        </div>
    );
}

export default RegisterCourse;