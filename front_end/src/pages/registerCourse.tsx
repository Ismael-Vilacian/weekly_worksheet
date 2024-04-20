import React, { useEffect } from "react";
import Header from "../components/header.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";

const RegisterCourse: React.FC = () => {

    useEffect(() => {
        fetch('https://shiny-sniffle-rwx644pwx4vcprqg-8000.app.github.dev/curso',  { mode: 'no-cors' })
        .then(data => { 
          console.log(data);
        })
        .catch(console.log);
    }, []);

    return (
        <div className="page">
            <Header description="Cadastro de curso" />

            <InputMultiSelect placeholder="Tags" dados={[]} propriedade="id" itensSelecionados={[]} change={(response) => (console.log(response))} />
        </div>
    );
}

export default RegisterCourse;