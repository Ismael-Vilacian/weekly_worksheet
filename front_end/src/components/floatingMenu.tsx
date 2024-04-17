import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { generateRandomClassName } from "../utils/tools.tsx";

interface PropsMenu {
    data: ItemMenu[];
    render: boolean;
    setData: (value: boolean) => void;
}

interface ItemMenu {
    description: string;
    link: string;
}

const FloatingMenu: React.FC<PropsMenu> = ({ data, render, setData }) => {
    const className = generateRandomClassName();

    useEffect(() => {
        if (render) {
            const app: any = document.querySelector('.App');

            const handleClickEvent = (event: any) => {
                if (event) {
                    const path = event.path || event.composedPath();
                    if (!path) return;

                    for (const caminho of path) {
                        if (caminho.className) {
                            if (caminho.className.search('menu-bar_action') >= 0 || caminho.className.search('menu-bar_action') >= 0) {
                                return;
                            } else {
                                setData(false);
                                break;
                            }
                        }
                    }

                    app.removeEventListener('click', handleClickEvent);
                }
            };

            app.addEventListener('click', handleClickEvent);

            return () => {
                app.removeEventListener('click', handleClickEvent);
            };
        }
    }, [render, setData]);

    return (
        <span>
            {render &&
                <div className={`floating-menu ${className}`}>
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
    );
};

export default FloatingMenu;