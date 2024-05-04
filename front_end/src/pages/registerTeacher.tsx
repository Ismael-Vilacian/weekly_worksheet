import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { InputDefault } from "../components/input-default.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import { Events } from "../utils/events.ts";
import CollectionEditor from "../components/collectionEditor.tsx";

const RegisterTeacher: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    
    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'register');
    }, [events]);

    const contentPresentation = <div>Teste</div>
    const editingContent = <div>Edição</div>
    return (
        <div className="page">
            <Header description="Cadastro de professor" />

            <div className="container_description">
                <InputDefault placeholder="Descrição" name="course_name" type="text" />
            </div>

            <div className="container_disciplines">
                <CollectionEditor description="Teste" contentPresentation={contentPresentation} editingContent={editingContent} />
                <InputMultiSelect placeholder="Disponibilidade" dados={[]} propriedade="id" itensSelecionados={[]} change={(response) => (console.log(response))} />
            </div>

            <div style={{textAlign: 'center'}}>
                <button className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterTeacher;