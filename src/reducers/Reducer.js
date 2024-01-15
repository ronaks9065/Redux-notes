import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from "../actions/ActionTypes";

const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  if (action.type === "ADD_NOTE") {
    return {
      ...state,
      notes: [...state.notes, action.payload],
    };
  } else if (action.type === "UPDATE_NOTE") {
    return {
      ...state,
      notes: state.notes.map((note) =>
        note.id === action.payload.id ? action.payload.updatedNote : note
      ),
    };
  } else if (action.type === "DELETE_NOTE") {
    return {
      ...state,
      notes: state.notes.filter((note) => note.id !== action.payload),
    };
  } else {
    return state;
  }
};

export default notesReducer;
