import React from "react";

interface PropsHeader {
    description: string;
    action?: Function;
    actionDescription?: string;
    iconAction?: string;
}

const Header: React.FC<PropsHeader> = ({ description, action, actionDescription, iconAction }) => {


    return (
        <div className="header">
            <div className="header_description">{description}</div>
            {action && actionDescription &&
                <div className="header_action" onClick={() => action()}>
                    {actionDescription} {iconAction && <i className={iconAction}></i>}
                </div>}
        </div>
    );
};

export default Header;