import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import { loading, openAlert } from "../utils/tools.tsx";
import { Events } from "../utils/events.ts";
declare var URL_API: any;

const RegisterTime: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    
    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'register');
    }, [events]);

    const saveTime = () => {
        const inputNome: any = document.querySelector('input[name="time_name"]');
        const inputInitTime: any = document.querySelector('input[name="init-time_name"]');
        const inputEndTime: any = document.querySelector('input[name="end-time_name"]');

        if (!validadeForm(inputNome, inputInitTime, inputEndTime)) return;

        loading(true);

        const data = {
            descricao: inputNome.value,
            inicio: inputInitTime.value,
            fim: inputEndTime.value
        }

        let url = `${URL_API}/set-time/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            loading(false);
            openAlert('Horario cadastrado com sucesso', 'success');
            cleanForms(inputNome, inputInitTime, inputEndTime);
        }).catch(() => {
            loading(false);
            openAlert('Erro ao cadastrar o horario', 'failure');
        });

        function validadeForm(inputNome, inputInitTime, inputEndTime) {
            if (!inputNome.value || inputNome.value === '') {
                openAlert('Descrição é obrigatória', 'failure');
                inputNome.focus();
                return false;
            }

            if (!inputInitTime.value || inputInitTime.value === '') {
                openAlert('Hora de início é obrigatória', 'failure');
                inputInitTime.focus();
                return false;
            }

            if (!inputEndTime.value || inputEndTime.value === '') {
                openAlert('Hora de fim é obrigatória', 'failure');
                inputEndTime.focus();
                return false;
            }

            return true;
        }

        const cleanForms = (inputNome, inputInitTime, inputEndTime) => {
            inputNome.value = '';
            inputInitTime.value = '';
            inputEndTime.value = '';
        }
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

            <div style={{ textAlign: 'center' }}>
                <button onClick={saveTime} className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterTime;