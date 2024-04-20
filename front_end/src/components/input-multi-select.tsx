import React, { useState, useEffect } from "react"; 

const InputMultiSelect: React.FC<InputMultiSelectProps> = ({ dados, placeholder = "", itensSelecionados, change: change, propriedade, disabled = false, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [itens, setItens] = useState<any[]>([]);
    const [dadosState, setDadosState] = useState<any[]>([]);
    const [completeObject, setCompleteObject] = useState<any[]>([]);

    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
        eventClickCloseDropdown();
        setDadosState(completeObject);
        const input: any = document.getElementById('input-options');
        input.focus();
    };

    const eventClickCloseDropdown = () => {
        const app: any = document.querySelector('.App');

        const handleClickEvent = (event: any) => {
            if (event) {
                const path = event.path || event.composedPath();
                if (!path) return;

                for (const caminho of path) {
                    if (caminho.className) {
                        if (caminho.className.search('dropdown-options') >= 0 || caminho.className.search('dropdown-header') >= 0) {
                            return;
                        } else {
                            clearInput();
                            setIsOpen(false);
                            break;
                        }
                    }
                }

                app.removeEventListener('click', handleClickEvent);
            }
        };

        app.addEventListener('click', handleClickEvent);
    };

    const adjustmentsData = (dadosState: any, itensSelecionados: any, isOpen: boolean) => {

        if (itensSelecionados && itensSelecionados.length > 0) {
            itensSelecionados.forEach((element: any) => {
                dadosState.filter((stateData: any) => stateData.id === element.id)[0].selecionado = true;
            });
        }

        setIsOpen(isOpen);
        setDadosState(dadosState);
        setCompleteObject(dadosState);
        setItens(itensSelecionados ?? []);
    };

    useEffect(() => {
        adjustmentsData(dados, itensSelecionados, isOpen);
        change(itensSelecionados);
    }, []);

    const handleItemClick = (item: any) => {
        if (!completeObject) return;
        const dados = completeObject.map((m) => m[propriedade] === item[propriedade] ? { ...m, selecionado: !m.selecionado } : m);
        const dataSelected = dados.filter((m: any) => m.selecionado);

        setCompleteObject(dados)
        setDadosState(dados);
        setItens(dataSelected);
        change(dataSelected);
        clearInput();
    };

    const clearInput = () => {
        const input: any = document.getElementById('input-options');
        if (input) input.value = '';
    }

    const searchForDescription = (event: any) => {
        setTimeout(() => {
            const description = event.target.value.toLowerCase();
            if (description && description !== '') {
                const dados = completeObject.filter((m: any) => m.descricao.toLowerCase().includes(description));
                setDadosState(dados);
            } else {
                setDadosState(completeObject);
            }
        }, 100);
    }

    const selectAll = () => {
        const selectionType = completeObject.filter((m: any) => m.selecionado).length > 0 ? 'markOff' : 'toMark';
        const dados = completeObject;

        if (selectionType === 'toMark') {
            dados.forEach((m: any) => { m.selecionado = true });
        } else if (selectionType === 'markOff') {
            dados.forEach((m: any) => { m.selecionado = false });
        }

        const dataSelected = dados.filter((m: any) => m.selecionado);
        
        setCompleteObject(dados);
        setDadosState(dados);
        setItens(dataSelected);
        change(dataSelected);
        clearInput();
    }

    return (
        <div className={`container-custom-dropdown ${disabled ? 'container-custom-dropdown-disabled' : ''}`}>
            <div className="placeholder">{placeholder}</div>

            <div
                className={`dropdown-header ${disabled ? 'dropdown-header-disabled' : ''}`}
                onClick={!disabled ? () => { if (!isOpen) toggleDropdown(); } : () => { }}>
                <input onKeyDown={searchForDescription} id="input-options" type="text" />

                <div className="arrow-icon">
                    <span className={!isOpen ? 'arrow-icon-active' : 'arrow-icon-inactive'}>
                        <i className="fas fa-chevron-down"></i>
                    </span>
                    <span className={isOpen ? 'arrow-icon-active' : 'arrow-icon-inactive'}>
                        <i className="fas fa-chevron-up"></i>
                    </span>
                </div>
            </div>

            <div className="options-selected">
                {itens?.map((itemSelected) => (
                    <div className="option" key={itemSelected[propriedade]}>
                        {itemSelected.descricao} <span onClick={() => handleItemClick(itemSelected)} className="icon-close-item"><i className="fas fa-times"></i></span>
                    </div>
                ))}
            </div>

            {isOpen && (
                <ul className="dropdown-options dropdown-options-multi">
                    {dadosState && dadosState.length > 0 &&
                        <li onClick={selectAll}>
                            <input type="checkbox" checked={completeObject.filter((m: any) => m.selecionado).length > 0}></input>
                            {completeObject.filter((m: any) => m.selecionado).length > 0 ? 'Desmarcar todos' : 'Marcar todos'}
                        </li>
                    }

                    {(!dadosState || dadosState.length === 0) &&
                        <li>
                            <i className="bi bi-ban"></i>
                            Nenhum item encontrado
                        </li>
                    }

                    {dadosState && dadosState.length > 0 && dadosState.map((item: any) => (
                        <li key={item[propriedade]} onClick={() => handleItemClick(item)}>
                            <input type="checkbox" checked={item.selecionado}></input>
                            {item?.descricao}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

interface InputMultiSelectProps {
    dados: any;
    placeholder?: string;
    itensSelecionados?: any[];
    change: (item: any) => void;
    propriedade: string;
    disabled?: boolean;
}

export default InputMultiSelect;