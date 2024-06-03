import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import { loading, openAlert, requestDelete, requestGet, requestPost } from "../utils/tools.tsx";
import { Events } from "../utils/events.ts";
import Modal from "../components/modal.tsx";
import NoData from "../components/no-data.tsx";
import { CardList } from "../components/card-list.tsx";

const RegisterDiscipline: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [openModal, setOpenModal] = React.useState(false);
    const [disciplines, setDisciplines] = React.useState([]);

    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'register');
    }, [events]);

    useEffect(() => {
        getDisciplines()
    }, []);

    const getDisciplines = () => {
        requestGet('get-disciplines')
            .then(data => setDisciplines(data));
    }

    const saveDiscipline = () => {
        const inputNome: any = document.querySelector('input[name="course_name"]');
        const inputHour: any = document.querySelector('input[name="hour_name"]');

        if (!validadeForm(inputNome, inputHour)) return;

        loading(true);

        const data = {
            nome: inputNome.value,
            carga_horaria: inputHour.value
        }

        requestPost('set-disciplines', data, 'Disciplina cadastrada com sucesso')
            .then(() => {
                cleanForms(inputNome, inputHour);
                setOpenModal(false);
                getDisciplines();
            });
    }

    const deleteDiscipline = (id: any) => {
        requestDelete('delete-discipline', 'Disciplina removida com sucesso', id)
            .then(() => {
                getDisciplines();
            });
    }

    function validadeForm(inputNome, inputHour) {
        if (!inputNome.value || inputNome.value === '') {
            openAlert('Descrição é obrigatória', 'failure');
            inputNome.focus();
            return false;
        }

        if (!inputHour.value || inputHour.value === '') {
            openAlert('Carga horaria é obrigatória', 'failure');
            inputHour.focus();
            return false;
        }

        return true;
    }

    const cleanForms = (inputNome, inputHour) => {
        inputNome.value = '';
        inputHour.value = '';
    }

    return (
        <div className="page">
            <Header description="Cadastro de disciplina" action={() => setOpenModal(true)} actionDescription="Adicionar disciplina" iconAction="bi bi-plus-circle" />

            {(!disciplines || disciplines.length === 0) && <NoData title="Nenhuma disciplina encontrado" description="Realize o cadastro das disciplinas para visualiza-las" />}

            {disciplines && disciplines.length > 0 &&
                <div className="card-list">
                    {
                        disciplines.map((data: any) => {
                            return (
                                <CardList>
                                    <div className="data-work-boards">
                                        <div className="data-work-boards_title">{data.nome}</div>
                                        <div>
                                            <i onClick={() => deleteDiscipline(data.id)} className="bi bi-x"></i>
                                        </div>
                                    </div>
                                </CardList>)
                        })
                    }
                </div>
            }

            {openModal &&
                <Modal title="Cadastrar disciplina" funcionClose={() => setOpenModal(false)}>
                    <div className="container_description">
                        <InputDefault placeholder="Descrição" name="course_name" type="text" />
                    </div>

                    <div className="container-hour">
                        <InputDefault placeholder="Carga horaria" name="hour_name" type="number" />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={saveDiscipline} className="button-default">Salvar alterações</button>
                    </div>
                </Modal>}
        </div>
    );
}

export default RegisterDiscipline;