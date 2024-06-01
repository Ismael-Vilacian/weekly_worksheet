import React from "react";

export class CardList extends React.Component<React.PropsWithChildren<{}>> {

    public render() {
        return (
            <div className="card">{this.props.children}</div>
        )
    }
}