import React from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";

const RegisterDiscipline: React.FC = () => {

    return (
        <div className="page">
            <Header description="Cadastro de disciplina" />

            <div className="container_description">
                <InputDefault placeholder="Descrição" name="course_name" type="text" />
            </div>
            
            <div className="container-hour">
                <InputDefault placeholder="Carga horaria" name="hour_name" type="number" />
            </div>

            <div style={{textAlign: 'center'}}>
                <button className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterDiscipline;