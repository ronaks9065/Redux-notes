import "./App.css";
import { Provider } from "react-redux";
import store from "./Store";
import NoteApp from "./components/NotesUI";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div>
          <NoteApp />
        </div>
      </Provider>
    </div>
  );
}

export default App;
