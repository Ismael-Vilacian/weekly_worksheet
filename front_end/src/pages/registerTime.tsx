import React from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";

const RegisterTime: React.FC = () => {

    return (
        <div className="page">
            <Header description="Cadastro de horário" />

            <div className="container_description">
                <InputDefault placeholder="Descrição" name="course_name" type="text" />
            </div>
            
            <div className="container-range-time">
                <InputDefault placeholder="Hora início" name="init-time_name" type="time" />
                <InputDefault placeholder="Hora fim" name="end-time_name" type="time" />
            </div>

            <div style={{textAlign: 'center'}}>
                <button className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterTime;