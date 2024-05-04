import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import { loading, openAlert } from "../utils/tools.tsx";
import { Events } from "../utils/events.ts";

const RegisterDiscipline: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    
    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'register');
    }, [events]);

    const saveDiscipline = () => {
        const inputNome: any = document.querySelector('input[name="course_name"]');
        const inputHour: any = document.querySelector('input[name="hour_name"]');

        if (!validadeForm(inputNome, inputHour)) return;

        loading(true);

        const data = {
            descricao: inputNome.value,
            carga_horaria: inputHour.value
        }

        let url = 'https://shiny-sniffle-rwx644pwx4vcprqg-8000.app.github.dev/set-disciplines/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            loading(false);
            openAlert('Disciplina cadastrado com sucesso', 'success');
            cleanForms(inputNome, inputHour);
        }).catch(() => {
            loading(false);
            openAlert('Erro ao cadastrar a disciplina', 'failure');
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
            <Header description="Cadastro de disciplina" />

            <div className="container_description">
                <InputDefault placeholder="Descrição" name="course_name" type="text" />
            </div>

            <div className="container-hour">
                <InputDefault placeholder="Carga horaria" name="hour_name" type="number" />
            </div>

            <div style={{ textAlign: 'center' }}>
                <button onClick={saveDiscipline} className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterDiscipline;