import React from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";

const RegisterTeacher: React.FC = () => {

    return (
        <div className="page">
            <Header description="Cadastro de professor" />

            <div className="container_description">
                <InputDefault placeholder="Descrição" name="course_name" type="text" />
            </div>

            <div className="container_disciplines">
                <InputMultiSelect placeholder="Disponibilidade" dados={[]} propriedade="id" itensSelecionados={[]} change={(response) => (console.log(response))} />
            </div>

            <div style={{textAlign: 'center'}}>
                <button className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterTeacher;