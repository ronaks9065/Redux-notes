import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from './ActionTypes';

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});

export const updateNote = (id, updatedNote) => ({
  type: UPDATE_NOTE,
  payload: { id, updatedNote },
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: id,
});