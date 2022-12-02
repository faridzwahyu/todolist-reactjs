import React from "react";
import "./App.css";

function App() {
    const [activity, setActivity] = React.useState("");
    const [todos, setTodos] = React.useState([]);
    const [edit, setEdit] = React.useState("");
    const [flash, setFlash] = React.useState("");

    function generateId() {
        return Date.now();
    }

    function tambahHandler(event) {
        event.preventDefault();

        if (!activity) {
            return setFlash("Ga boleh kosong ya !");
        }

        if (edit.id) {
            return updateHandler(edit.id);
        }

        setTodos([
            ...todos,
            {
                id: generateId(),
                activity,
            },
        ]);
        setActivity("");
        setFlash("");
    }

    function editHandler(todo) {
        setActivity(todo.activity);
        setEdit(todo);
        setFlash("");
    }

    function updateHandler(editId) {
        const updatedTodo = {
            id: editId,
            activity,
        };

        const findTodoIndex = todos.findIndex((todo) => {
            return todo.id === editId;
        });

        const updatedTodos = [...todos];
        updatedTodos[findTodoIndex] = updatedTodo;

        setActivity("");

        setTodos(updatedTodos);
        setFlash("");

        return cancelEdit();
    }

    function hapusHandler(todoId) {
        const filteredTodos = todos.filter((todo) => {
            return todo.id !== todoId;
        });

        setTodos(filteredTodos);

        if (edit.id) cancelEdit();

        setFlash("");
    }

    function cancelEdit() {
        setEdit({});
        setActivity("");
        setFlash("");
    }

    return (
        <div className="todo">
            <h1>Todo List pake React</h1>

            {flash && <div style={{ color: "red" }}>{flash}</div>}

            <form onSubmit={tambahHandler}>
                <input
                    type="text"
                    placeholder="Aktifitas apa?"
                    value={activity}
                    onChange={(event) => {
                        setActivity(event.target.value);
                    }}
                />

                <button className="button form" type="submit">
                    {edit.id ? "Ganti Bro" : "Tambah Bro"}
                </button>

                {edit.id && (
                    <button className="button cancel form" onClick={cancelEdit}>
                        Batal
                    </button>
                )}
            </form>

            {todos.length > 0 ? (
                <ul>
                    {todos.map((todo) => {
                        return (
                            <li key={todo.id}>
                                <span>{todo.activity}</span>

                                <button
                                    className="button"
                                    onClick={editHandler.bind(this, todo)}
                                >
                                    <FontAwesomeIcon icon="fa-regular fa-pen" />
                                    edit
                                </button>

                                <button
                                    className="button cancel"
                                    onClick={hapusHandler.bind(this, todo.id)}
                                >
                                    <FontAwesomeIcon icon="fa-regular fa-trash-can-list" />
                                    hapus
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p style={{ color: "grey" }}>
                    <i>List Kosong</i>
                </p>
            )}
        </div>
    );
}

export default App;
