import React, { useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import { Events } from "../utils/events.ts";
import Modal from "../components/modal.tsx";
import { InputDefault } from "../components/input-default.tsx";
// import InputMultiSelect from "../components/input-multi-select.tsx";
import InputSelect from "../components/input-select.tsx";
declare var URL_API: any;

const WorkBoardList: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [openModal, setOpenModal] = React.useState(false);
    const [courses, setCourses] = React.useState([]);
    const [couseSelected, setCourseSelected] = React.useState(null);

    useEffect(() => {
        fetch(`${URL_API}/get-course/`)
            .then(response => response.json())
            .then(data => {
                setCourses(JSON.parse(data));
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        events.publish('menuBar:setMenuBar', 'reports');
    }, [events]);

    const adjustCourseDataAndGetDisciplines = (data: any) => {
        setCourseSelected(data);
        
        fetch(`${URL_API}/get-disciplines-by-courseid/${data.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data));
            })
            .catch(console.log);
    }

    return (
        <div className="page">
            <Header description="Quadro de trabalho" action={() => setOpenModal(true)} actionDescription="Criar quadro de trabalho" iconAction="bi bi-plus-circle" />
            {openModal &&
                <Modal title="Gerar quadro de trabalho" funcionClose={() => setOpenModal(false)}>
                    <InputDefault placeholder="Nome da turma" name="turma_name" type="text" />

                    <InputSelect itemSelecionado={{ id: null, nome: '' }} dados={courses} placeholder="Cursos" propriedade="id" aoSelecionar={(data: any) => adjustCourseDataAndGetDisciplines(data)} />

                    {/* <InputMultiSelect placeholder="Cursos" dados={courses} propriedade="id" itensSelecionados={[]} change={(response) => {}} /> */}
                </Modal>}
        </div>
    );
}

export default WorkBoardList;