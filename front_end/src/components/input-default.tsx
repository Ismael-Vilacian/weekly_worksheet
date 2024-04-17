import React from "react";

export interface Props {
    placeholder: string;
    type?: string;
    name: string;
    change?: any;
    disabled?: boolean;
    isCellPhone?: boolean;
}

export class InputDefault extends React.Component<Props> {

    public constructor(props: Props) {
        super(props);
    }

    applyCellPhoneMask = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { isCellPhone } = this.props;
        if (!isCellPhone) return;

        const inputValue = event.target.value;

        const cleanValue = inputValue.replace(/[^\d]/g, '');

        let maskedValue = '';
        if (cleanValue.length === 11)
            maskedValue = cleanValue.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1)$2$3-$4');
        else if (cleanValue.length === 10)
            maskedValue = cleanValue.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1)$2-$3');


        const lastChar = inputValue.slice(-1);
        if (/^\d$/.test(lastChar) && cleanValue.length <= 11) {
            if (event.target.value && maskedValue && maskedValue !== '') {
                event.target.value = maskedValue;
            }
        } else {
            event.target.value = inputValue.slice(0, -1);
        }
    };


    public render() {
        const { placeholder, type = 'text', name, change = () => { }, disabled } = this.props;

        return (
            <div className={`container-input-default ${disabled ? 'container-input-default-disabled' : ''}`}>
                <div className="container-input-default_placeholder">{placeholder}</div>
                <input disabled={disabled} className="container-input-default_input" type={type} name={name} onChange={(event) => { change(event); this.applyCellPhoneMask(event); }} />
            </div>
        );
    }
}