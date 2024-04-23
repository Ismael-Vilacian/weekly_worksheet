import React from "react";

export interface Props {
    placeholder: string;
    type?: string;
    name: string;
    change?: any;
    disabled?: boolean;
}

export class InputDefault extends React.Component<Props> {

    public constructor(props: Props) {
        super(props);
    }

    public render() {
        const { placeholder, type = 'text', name, change = () => { }, disabled } = this.props;

        return (
            <div className={`container-input-default ${disabled ? 'container-input-default-disabled' : ''}`}>
                <div className="container-input-default_placeholder">{placeholder}</div>
                <input disabled={disabled} className="container-input-default_input" type={type} name={name} onChange={(event) => { change(event); }} />
            </div>
        );
    }
}