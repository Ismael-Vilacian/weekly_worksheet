import React from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import { loading } from "../utils/tools.tsx";

const RegisterDiscipline: React.FC = () => {

    const saveDiscipline = () => {
        loading(true);
        const inputNome: any = document.querySelector('input[name="course_name"]');
        const inputHour: any = document.querySelector('input[name="hour_name"]');

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
        })
        .then(data => loading(false))
        .catch(() => loading(false));
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