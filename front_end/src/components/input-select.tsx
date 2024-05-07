import React, { useEffect, useState } from "react";

const InputSelect: React.FC<Props> = ({
    dados,
    placeholder,
    itemSelecionado,
    aoSelecionar,
    propriedade,
    disabled,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dadosState, setDadosState] = useState<any[]>([]);
    const [completeObject, setCompleteObject] = useState<any[]>([]);
    const [classInput, setClassInput] = useState<string>();
    const [selected, setSelected] = useState();

    useEffect(() => {
        setClassInput(gerarClasseAleatoria());
        setDadosState(dados);
        setCompleteObject(dados);
        setSelected(itemSelecionado);
    }, [dados]);

    useEffect(() => {
        adjustmentsInput(itemSelecionado);
    }, [classInput])

    const gerarClasseAleatoria = () => {
        const letras = 'abcdefghijklmnopqrstuvwxyz';
        const numeros = '0123456789';
        const caracteres = letras + letras.toUpperCase() + numeros;
        let classe = 'input_';

        for (let i = 0; i < 8; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            classe += caracteres.charAt(indice);
        }

        return classe;
    }

    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
        eventClickCloseDropdown();
        const input: any = document.querySelector(`.${classInput}`);
        input.focus();
        if (input) input.value = '';
    };

    const handleItemClick = (item: any) => {
        if (!completeObject) return;

        setIsOpen(false);
        aoSelecionar(item);
        adjustmentsInput(item);
        setDadosState(completeObject);
        setSelected(item);
    };

    const adjustmentsInput = (item: any) => {
        const itemSelected = item ? item : selected;
        if (!itemSelected) return;

        const input: any = document.querySelector(`.${classInput}`);
        if (input) input.value = itemSelected.descricao ?? itemSelected.nome;
    }

    const eventClickCloseDropdown = () => {
        var app: any = document.querySelector('.App');
        var funcao = (event: any) => {

            if (event) var path = event.path || event.composedPath();
            if (!path) return

            for (const caminho of path) {
                if (caminho.className) {
                    if (caminho.className.search('dropdown-options') >= 0 || caminho.className.search('dropdown-header') >= 0) return;
                    else {
                        setDadosState(completeObject);
                        setIsOpen(false);

                        var input: any = document.querySelector(`.${classInput}`);
                        if (input) {
                            var selectedItem = completeObject.find((m: any) => itemSelecionado[propriedade] === m[propriedade]);
                            if (selectedItem) input.value = selectedItem.descricao ?? selectedItem.nome 
                        }
                        break;
                    }
                }
            }

            app.removeEventListener('click', funcao);
        };

        app.addEventListener('click', funcao);
    };

    const searchForDescription = (event: any) => {
        setTimeout(() => {
            const description = event.target.value.toLowerCase();
            if (description && description !== '') {
                const dados = completeObject.filter((m: any) => m.descricao ? m.descricao.toLowerCase().includes(description) : m.nome.toLowerCase().includes(description));
                setDadosState(dados);
            } else {
                setDadosState(completeObject);
            }
        }, 100);
    }

    return (
        <div className={`container-custom-dropdown  ${disabled ? 'container-custom-dropdown-disabled' : ''}`}>
            <div className="placeholder">{placeholder}</div>

            <div className={`dropdown-header ${disabled ? 'dropdown-header-disabled' : ''}`} onClick={!disabled ? toggleDropdown : () => { }}>

                <input autoComplete="off" disabled={disabled} className={classInput} onKeyDown={searchForDescription} id="input-options" type="text" />

                <div className="arrow-icon">
                    <span className={!isOpen ? 'arrow-icon-active' : 'arrow-icon-inactive'}><i className="bi bi-chevron-down"></i></span>
                    <span className={isOpen ? 'arrow-icon-active' : 'arrow-icon-inactive'}><i className="bi bi-chevron-up"></i></span>
                </div>
            </div>

            {isOpen && (
                <ul className="dropdown-options">

                    {(!dadosState || dadosState.length === 0) &&
                        <li>
                            <i className="fas fa-ban"></i>
                            Nenhum item encontrado
                        </li>
                    }

                    {dadosState && dadosState.length > 0 && dadosState.map((item: any) => (
                        <li key={item[propriedade]}
                            onClick={() => { handleItemClick(item); itemSelecionado[propriedade] = item[propriedade]; }}
                            className={
                                itemSelecionado && itemSelecionado[propriedade] === item[propriedade]
                                    ? "option-selected"
                                    : ""
                            }>
                            {item?.descricao ?? item?.nome}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InputSelect;

interface Props {
    dados: any;
    placeholder?: string;
    itemSelecionado?: any;
    aoSelecionar: (item: any) => void;
    propriedade: string;
    disabled?: boolean;
}