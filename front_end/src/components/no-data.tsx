import React from "react";

interface PropsNoData {
    img: any;
    title: string;
    description: string;
}

const NoData: React.FC<PropsNoData> = ({ img, title, description }) => {


    return (
        <div className="no-data">
            <div className="no-data_img">
                <img src={img} alt="no-data" />
            </div>
            <div className="no-data_title">{title}</div>
            <div className="no-data_description">{description}</div>
        </div>
    );
};

export default NoData;