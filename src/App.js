import "./App.css";

function App() {
    return (
        <>
            <h1>Todo List pake React</h1>

            <form>
                <input type="text" placeholder="Aktifitas apa?" />
                <button type="submit">Tambah Bro!</button>
            </form>

            <ul>
                <li>Makan</li>
                <li>Minum</li>
                <li>Ngopi</li>
                <li>Jalan</li>
            </ul>
        </>
    );
}

export default App;
