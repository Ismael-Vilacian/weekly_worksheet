import React from "react";

interface PropsHeader {
    description: string;
}

const Header: React.FC<PropsHeader> = ({ description }) => {


    return (
        <div className="header">
            <div className="header_description">{description}</div>
        </div>
    );
};

export default Header;