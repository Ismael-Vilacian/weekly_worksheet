import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import { InputDefault } from "../components/input-default.tsx";
import { loading, openAlert } from "../utils/tools.tsx";
import { Events } from "../utils/events.ts";
declare var URL_API: any;

const RegisterCourse: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [disciplinesData, setDisciplinesData] = React.useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = React.useState([]);
    const [rebuildComponent, setRebuildComponent] = React.useState(false);
    
    useEffect(() => {
        fetch(`${URL_API}/get-disciplines/`)
            .then(response => response.json())
            .then(data => {
                setDisciplinesData(JSON.parse(data));
                console.log(JSON.parse(data));
            })
            .catch(console.log);
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
            descricao: inputName.value,
            carga_horaria: inputHour.value,
            disciplinas: selectedDisciplines
        }

        let url = `${URL_API}/set-course/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            loading(false);
            openAlert('Curso cadastrado com sucesso', 'success');
            cleanForms(inputName, inputHour);
        }).catch(() => {
            loading(false);
            openAlert('Erro ao cadastrar curso', 'failure');
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

    return (
        <div className="page">
            <Header description="Cadastro de curso" />

            <div className="container_description">
                <InputDefault placeholder="Descrição" name="course_name" type="text" />
            </div>

            <div className="container-hour">
                <InputDefault placeholder="Carga horaria" name="hour_name" type="number" />
            </div>

            <div className="container_disciplines">
                {!rebuildComponent &&
                    <InputMultiSelect placeholder="Disciplinas" dados={disciplinesData} propriedade="id" itensSelecionados={[]} change={(response) => setSelectedDisciplines(response)} />
                }
            </div>

            <div style={{ textAlign: 'center' }}>
                <button onClick={saveCourse} className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterCourse;