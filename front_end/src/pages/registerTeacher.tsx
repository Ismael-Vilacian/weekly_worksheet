import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import { Events } from "../utils/events.ts";
import CollectionEditor from "../components/collectionEditor.tsx";
import InputSelect from "../components/input-select.tsx";

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
        fetch('http://127.0.0.1:8000/get-data-availability/')
        .then(response => response.json())
        .then(response => {
            const data = JSON.parse(response);
            setTimes(data.times);
            setDaysOfWeeks(data.daysOfWeeks);
        })
        .catch(console.log);
    }, []);

    const saveCollectionEditor = () => {
        setAvailability([...availability, {dayOfWeek: dayOfWeekSelected as any, times: timeSelected}]);
        setTimeSelected([]);
        setdayOfWeekSelected({});
    }

    const contentPresentation = 
    <div>
        {availability.map((item: any) => {
            return <div>
                <span>{item.dayOfWeek.nome}</span>
                <span>{item.times.map((time: any) => time.nome).join(', ')}</span>
            </div>
        })}
    </div>
    const editingContent = 
    <div style={{padding: '20px'}}>
        <InputSelect itemSelecionado={{id: null, nome: ''}} dados={daysOfWeeks} placeholder="Dia da semana" propriedade="id" aoSelecionar={(data: any) => { setdayOfWeekSelected(data) }} />
        <InputMultiSelect placeholder="Disciplinas" dados={times} propriedade="id" itensSelecionados={[]} change={(data) => { setTimeSelected(data) }} />
    </div>
    return (
        <div className="page">
            <Header description="Cadastro de professor" />

            <div className="container_description">
                <InputDefault placeholder="Descrição" name="course_name" type="text" />
            </div>

            <div>
                <CollectionEditor change={() => saveCollectionEditor()} description="Teste" contentPresentation={contentPresentation} editingContent={editingContent} />
            </div>

            <div style={{textAlign: 'center'}}>
                <button className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterTeacher;