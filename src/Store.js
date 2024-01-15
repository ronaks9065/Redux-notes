import { createStore } from "redux";
import notesReducer from "./reducers/Reducer";

const store = createStore(notesReducer);

export default store;