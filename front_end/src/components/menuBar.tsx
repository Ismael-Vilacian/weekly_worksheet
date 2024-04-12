import React from "react";
import logo from "../assets/images/logo.png";

export class MenuBar extends React.Component {
    public render() {
        return (
            <div className="menu-bar">
                <div className="menu-bar_logo">
                    <img width={152} src={logo} alt="logo" />
                </div>
                <div className="menu-bar_actions">
                    <div className="menu-bar_action menu-bar_action-select">Inicio</div>
                    <div className="menu-bar_action">Cadastros</div>
                    <div className="menu-bar_action">Relatórios</div>
                </div>
                <div></div>
            </div>
        )
    }
}