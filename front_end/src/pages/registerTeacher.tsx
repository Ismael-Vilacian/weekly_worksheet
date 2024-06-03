import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import { Events } from "../utils/events.ts";
import CollectionEditor from "../components/collectionEditor.tsx";
import InputSelect from "../components/input-select.tsx";
import NoData from "../components/no-data.tsx";
import { Chip } from "../components/chip.tsx";
import { loading, openAlert, requestDelete, requestGet, requestPost } from "../utils/tools.tsx";
import "../declarations.d.ts"
import Modal from "../components/modal.tsx";
import { CardList } from "../components/card-list.tsx";

const RegisterTeacher: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [daysOfWeeks, setDaysOfWeeks] = React.useState({});
    const [times, setTimes] = React.useState([]);
    const [dayOfWeekSelected, setdayOfWeekSelected] = React.useState({});
    const [openModal, setOpenModal] = React.useState(false);
    const [teachers, setTeachers] = React.useState([]);
    const [timeSelected, setTimeSelected] = React.useState([]) as any;
    const [availability, setAvailability] = React.useState([]) as any;

    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'register');
    }, [events]);

    useEffect(() => {
        requestGet('get-data-availability')
            .then(response => {
                const data = response;
                setTimes(data.times);
                setDaysOfWeeks(data.daysOfWeeks);
            });
    }, []);

    useEffect(() => {
        getTeachers()
    }, []);


    const getTeachers = () => {
        requestGet('get-teacher')
            .then(data => setTeachers(data));
    }

    const saveCollectionEditor = () => {
        setAvailability([...availability, { dayOfWeek: dayOfWeekSelected as any, times: timeSelected }]);
        setTimeSelected([]);
        setdayOfWeekSelected({});
    }

    const removeAvailability = (availabilityData: any) => {
        const newAvailability = availability.filter((item: any) => item !== availabilityData);
        setAvailability(newAvailability);
    }

    const saveTeacher = () => {

        const inputName: any = document.querySelector('input[name="teacher_name"]');

        if (!validadeForm(inputName)) return;

        loading(true);

        const availabilityModel: any = [];
        for (let availabilityData of availability) {
            for (let time of availabilityData.times) {
                availabilityModel.push({ diaSemana: availabilityData.dayOfWeek, horario: time });
            }
        }

        const data = {
            nome: inputName.value,
            disponibilidade: availabilityModel
        }

        requestPost('set-teacher', data, 'Professor cadastrado com sucesso')
            .then(() => {
                cleanForms(inputName);
                setOpenModal(false);
                getTeachers();
            });
    }

    function validadeForm(inputName) {
        if (!inputName.value || inputName.value === '') {
            openAlert('O Nome é obrigatório', 'failure');
            inputName.focus();
            return false;
        }

        if (!availability || availability.length === 0) {
            openAlert('Adicione ao menos uma disponibilidade', 'failure');
            return false;
        }

        return true;
    }

    function cleanForms(inputName) {
        inputName.value = '';
        setAvailability([]);
    }

    const deleteTeacher = (id: any) => {
        requestDelete(`delete-teacher`, 'Professor deletado com sucesso', id)
            .then(sucesso => {
                if (sucesso !== false) {
                    const teacher = teachers.filter((data: any) => data.id !== id);
                    setTeachers(teacher);
                }
            });
    }

    const contentPresentation =
        <div className="availability"> {availability && availability.length ? availability.map((item: any) => {
            return <div className="availability_data">
                <div>{item.dayOfWeek.nome}</div>
                <div className="availability_times">{item.times.map((time: any) => <Chip>{time.descricao}</Chip>)}</div>

                <div onClick={() => removeAvailability(item)} className="availability_close"><i className="bi bi-x"></i></div>
            </div>
        }) : <NoData description="Adicione as disponibilidades para poder visualizá-las" title="Nenhum disponibilidade cadastrada" />}
        </div>

    const editingContent =
        <div style={{ padding: '20px' }}>
            <InputSelect itemSelecionado={{ id: null, nome: '' }} dados={daysOfWeeks} placeholder="Dia da semana" propriedade="id" aoSelecionar={(data: any) => { setdayOfWeekSelected(data) }} />
            <InputMultiSelect placeholder="Horarios" dados={times} propriedade="id" itensSelecionados={[]} change={(data) => { setTimeSelected(data) }} />
        </div>

    return (
        <div className="page">
            <Header description="Cadastro de professor" action={() => setOpenModal(true)} actionDescription="Adicionar professor" iconAction="bi bi-plus-circle" />

            {(!teachers || teachers.length === 0) && <NoData title="Nenhuma professor encontrado" description="Realize o cadastro dos professores para visualiza-los" />}

            {teachers && teachers.length > 0 &&
                <div className="card-list">
                    {
                        teachers.map((data: any) => {
                            return (
                                <CardList>
                                    <div className="data-work-boards">
                                        <div className="data-work-boards_title">{data.nome}</div>
                                        <div>
                                            <i onClick={() => deleteTeacher(data.id)} className="bi bi-x"></i>
                                        </div>
                                    </div>
                                </CardList>)
                        })
                    }
                </div>
            }

            {openModal &&
                <Modal title="Cadastrar professor" funcionClose={() => setOpenModal(false)}>
                    <div className="container_description">
                        <InputDefault placeholder="Nome" name="teacher_name" type="text" />
                    </div>

                    <div>
                        <CollectionEditor change={() => saveCollectionEditor()} description="Disponibilidade" contentPresentation={contentPresentation} editingContent={editingContent} />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '25px' }}>
                        <button onClick={saveTeacher} className="button-default">Salvar alterações</button>
                    </div>
                </Modal>}
        </div>
    );
}

export default RegisterTeacher;