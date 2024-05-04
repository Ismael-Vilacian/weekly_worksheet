import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import FloatingMenu from "./floatingMenu.tsx";
import { Events } from "../utils/events.ts";

const MenuBar: React.FC = () => {
    const events = useMemo(() => new Events(), []);
    const [renderMenuRegister, setRenderMenuRegister] = useState(false);
    const [renderMenuReports, setrenderMenuReports] = useState(false);
    const [actionSelect, setActionSelect] = useState('home');

    const renderMenuController = (render: any, setRender: any) => {
        setRenderMenuRegister(false);
        setrenderMenuReports(false);
        if (render != null && setRender != null) {
            setRender(!render)
        }
    }

    useEffect(() => {
        events.subscribe('menuBar:setMenuBar', (action: string) => {
            debugger
            setActionSelect(action[0]);
        });
    }, [events]);

    return (
        <div className="menu-bar">
            <div className="menu-bar_logo">
                <img width={152} src={logo} alt="logo" />
            </div>
            <div className="menu-bar_actions">
                <Link onClick={() => renderMenuController(null, null)} to="home" className={`menu-bar_action ${actionSelect === 'home' ? 'menu-bar_action-select' : '' }`}>Inicio</Link>
                <div className={`menu-bar_action ${actionSelect === 'register' ? 'menu-bar_action-select' : '' }`} onClick={() => renderMenuController(renderMenuRegister, setRenderMenuRegister)}>
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