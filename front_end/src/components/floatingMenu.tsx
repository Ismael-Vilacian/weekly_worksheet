import React from "react";
import { Link } from "react-router-dom";

interface PropsMenu {
    data: ItemMenu[];
    render: boolean;
}

interface ItemMenu {
    description: string;
    link: string;
}

export class FloatingMenu extends React.Component<PropsMenu> {

    public render() {
        const { data, render } = this.props;

        return (
            <span>
                {render &&
                    <div className="floating-menu">
                        {data.map((m: ItemMenu) => {
                            return (
                                <Link to={m.link} className="floating-menu_item">
                                    {m.description}
                                </Link>
                            )
                        })}
                    </div>
                }
            </span>
        )
    }
}