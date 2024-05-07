import React from "react";

interface props {
    contentPresentation: JSX.Element;
    editingContent: JSX.Element;
    description: string;
    change?: any;
}

const CollectionEditor: React.FC<props> = ({ contentPresentation, editingContent, description, change }) => {
    const [editing, setEditing] = React.useState(false)
    return (
        <div className="collection-editor">
            <div className="collection-editor_header">
                <div className="collection-editor_description">
                    {description}
                </div>

                <div className="collection-editor_buttons">
                    {!editing ?
                        <i onClick={() => setEditing(true)} className="bi bi-plus-lg"></i> :
                        <span>
                            <i onClick={() => setEditing(false)} className="bi bi-x-lg"></i>
                            <i onClick={() => {
                                change();
                                setEditing(false)
                            }} className="bi bi-check2"></i>
                        </span>
                    }
                </div>
            </div>

            <div className="collection-editor_content">
                {editing ? editingContent : contentPresentation}
            </div>
        </div>
    )
}

export default CollectionEditor;