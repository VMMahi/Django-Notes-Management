import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            <p className="note-title"><strong>Title:</strong>{note.title}</p>
            <p className="note-content"><strong>Content:</strong>{note.content}</p>
            <p className="note-date">Created on:{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    );
}

export default Note