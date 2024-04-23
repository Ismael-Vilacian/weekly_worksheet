import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import FloatingMenu from "./floatingMenu.tsx";

const MenuBar: React.FC = () => {
    const [renderMenuRegister, setRenderMenuRegister] = useState(false);
    const [renderMenuReports, setrenderMenuReports] = useState(false);

    const renderMenuController = (render: any, setRender: any) => {
        setRenderMenuRegister(false);
        setrenderMenuReports(false);
        if (render != null && setRender != null) {
            setRender(!render)
        }
    }

    return (
        <div className="menu-bar">
            <div className="menu-bar_logo">
                <img width={152} src={logo} alt="logo" />
            </div>
            <div className="menu-bar_actions">
                <Link onClick={() => renderMenuController(null, null)} to="home" className="menu-bar_action menu-bar_action-select">Inicio</Link>
                <div onClick={() => renderMenuController(renderMenuRegister, setRenderMenuRegister)} className="menu-bar_action">
                    Cadastros
                    <FloatingMenu data={
                        [
                            { description: 'Curso', link: 'register-course' },
                            { description: 'Disciplina', link: 'register-discipline' },
                            { description: 'Horário', link: 'register-time' },
                            { description: 'Professor', link: 'register-teacher' }
                        ]} render={renderMenuRegister} setData={setRenderMenuRegister} />
                </div>
                <div onClick={() => renderMenuController(renderMenuReports, setrenderMenuReports)} className="menu-bar_action">
                    Relatórios
                    <FloatingMenu data={[{ description: 'Teste', link: 'home' }]} render={renderMenuReports} setData={setrenderMenuReports} />
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default MenuBar;