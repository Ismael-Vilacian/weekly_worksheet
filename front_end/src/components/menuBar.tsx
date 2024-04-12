import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export class MenuBar extends React.Component {
    public render() {
        return (
            <div className="menu-bar">
                <div className="menu-bar_logo">
                    <img width={152} src={logo} alt="logo" />
                </div>
                <div className="menu-bar_actions">
                    <Link to="/home" className="menu-bar_action menu-bar_action-select">Inicio</Link>
                    <Link to="/register" className="menu-bar_action">Cadastros</Link>
                    <Link to="/reports" className="menu-bar_action">Relatórios</Link>
                </div>
                <div></div>
            </div>
        )
    }
}