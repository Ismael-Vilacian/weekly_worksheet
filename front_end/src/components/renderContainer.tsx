import React from "react"

export class RenderContainer extends React.Component<React.PropsWithChildren<{}>> {
    public render() {
        return (
            <div className="render-container">
                {this.props.children}
            </div>
        )
    }
}