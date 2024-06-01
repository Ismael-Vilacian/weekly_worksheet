import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import { Events } from "../utils/events.ts";
import CollectionEditor from "../components/collectionEditor.tsx";
import InputSelect from "../components/input-select.tsx";
import NoData from "../components/no-data.tsx";
import { Chip } from "../components/chip.tsx";
import { loading, openAlert, requestGet, requestPost } from "../utils/tools.tsx";
import "../declarations.d.ts"

const RegisterTeacher: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [daysOfWeeks, setDaysOfWeeks] = React.useState({});
    const [times, setTimes] = React.useState([]);
    const [dayOfWeekSelected, setdayOfWeekSelected] = React.useState({});
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
            <Header description="Cadastro de professor" />

            <div className="container_description">
                <InputDefault placeholder="Nome" name="teacher_name" type="text" />
            </div>

            <div>
                <CollectionEditor change={() => saveCollectionEditor()} description="Disponibilidade" contentPresentation={contentPresentation} editingContent={editingContent} />
            </div>

            <div style={{ textAlign: 'center', marginTop: '25px' }}>
                <button onClick={saveTeacher} className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterTeacher;