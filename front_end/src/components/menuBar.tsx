import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FloatingMenu } from "./floatingMenu.tsx";

const MenuBar: React.FC = () => {
    const [renderMenuRegister, setRenderMenuRegister] = useState(false);
        
    return (
        <div className="menu-bar">
            <div className="menu-bar_logo">
                <img width={152} src={logo} alt="logo" />
            </div>
            <div className="menu-bar_actions">
                <Link to="home" className="menu-bar_action menu-bar_action-select">Inicio</Link>
                <div onClick={() => setRenderMenuRegister(!renderMenuRegister)} className="menu-bar_action">
                    Cadastros
                    <FloatingMenu data={[{description: 'Teste', link: 'home'}]} render={renderMenuRegister} />    
                </div>
                <div className="menu-bar_action">Relatórios</div>
            </div>
            <div></div>
        </div>
    )
}

export default MenuBar;