import React from "react";

export class Chip extends React.Component<React.PropsWithChildren<{}>> {

    public render() {
        return (
            <div className="chip">{this.props.children}</div>
        )
    }
}