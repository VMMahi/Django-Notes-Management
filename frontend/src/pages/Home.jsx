import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            setNotes(res.data);
            console.log(res.data);
        } catch (err) {
            alert("Failed to fetch notes: " + err);
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`/api/notes/delete/${id}/`);
            if (res.status === 204) {
                alert("Note deleted!");
                getNotes();
            } else {
                alert("Failed to delete note.");
            }
        } catch (error) {
            alert("Failed to delete note: " + error);
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { content, title });
            if (res.status === 201) {
                alert("Note created!");
                setTitle("");
                setContent("");
                getNotes();
            } else {
                alert("Failed to create note.");
            }
        } catch (err) {
            alert("Failed to create note: " + err);
        }
    };

    return (
        <div>
            <header>
            <div><h1>Notes Management App</h1></div>
            </header>
            <div className="main-container">
                <div className="form-section">
                    <h2>Create a Note</h2>
                    <form onSubmit={createNote}>
                        <label htmlFor="title">Title:</label>
                        <br />
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <label htmlFor="content">Content:</label>
                        <br />
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div className="notes-section">
                    <h2>Your Notes</h2>
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
