import React from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import { loading } from "../utils/tools.tsx";

const RegisterTime: React.FC = () => {

    const saveTime = () => {
        loading(true);
        const inputNome: any = document.querySelector('input[name="time_name"]');
        const inputInitTime: any = document.querySelector('input[name="init-time_name"]');
        const inputEndTime: any = document.querySelector('input[name="end-time_name"]');

        const data = {
            descricao: inputNome.value,
            hora_inicio: inputInitTime.value,
            hora_fim: inputEndTime.value
        }

        let url = 'https://shiny-sniffle-rwx644pwx4vcprqg-8000.app.github.dev/set-time/';
        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then(data => {loading(false); console.log('Sucesso')})
        .catch(() => loading(false));
    }

    return (
        <div className="page">
            <Header description="Cadastro de horário" />

            <div className="container_description">
                <InputDefault placeholder="Descrição" name="time_name" type="text" />
            </div>
            
            <div className="container-range-time">
                <InputDefault placeholder="Hora início" name="init-time_name" type="time" />
                <InputDefault placeholder="Hora fim" name="end-time_name" type="time" />
            </div>

            <div style={{textAlign: 'center'}}>
                <button onClick={saveTime} className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterTime;