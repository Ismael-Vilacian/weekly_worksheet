import React, { useEffect } from "react";
import Header from "../components/header.tsx";
import InputMultiSelect from "../components/input-multi-select.tsx";
import { InputDefault } from "../components/input-default.tsx";

const RegisterCourse: React.FC = () => {
    const [disciplinesData, setDisciplinesData] = React.useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = React.useState([]);

    useEffect(() => {
        fetch('https://shiny-sniffle-rwx644pwx4vcprqg-8000.app.github.dev/get-disciplines/')
            .then(response => response.json())
            .then(data => {
                setDisciplinesData(JSON.parse(data));
                console.log(JSON.parse(data));
            })
            .catch(console.log);
    }, []);

    const saveCourse = () => {
        const inputNome: any = document.querySelector('input[name="course_name"]');
        const inputHour: any = document.querySelector('input[name="hour_name"]');

        const data = {
            descricao: inputNome.value,
            carga_horaria: inputHour.value,
            disciplinas: selectedDisciplines
        }

        let url = 'https://shiny-sniffle-rwx644pwx4vcprqg-8000.app.github.dev/set-course/';
        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then(data => console.log(data))
        .catch(console.log);
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
                <InputMultiSelect placeholder="Disciplinas" dados={disciplinesData} propriedade="id" itensSelecionados={[]} change={(response) => setSelectedDisciplines(response)} />
            </div>

            <div style={{textAlign: 'center'}}>
                <button onClick={saveCourse} className="button-default">Salvar alterações</button>
            </div>
        </div>
    );
}

export default RegisterCourse;