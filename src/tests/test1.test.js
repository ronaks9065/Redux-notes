// src/components/NoteApp.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import NoteApp from "../components/NotesUI";

describe("NoteApp Component", () => {
  test("renders NoteApp component", () => {
    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    // Check if the component renders without errors
    expect(screen.getByText(/Redux Note App/i)).toBeInTheDocument();
  });

  test("adds a new note", () => {
    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    // Get the input field and the "Add Note" button
    const inputField = screen.getByRole("textbox");
    const addButton = screen.getByText(/Add Note/i);

    // Type a new note in the input field
    fireEvent.change(inputField, { target: { value: "Test Note" } });

    // Click the "Add Note" button
    fireEvent.click(addButton);

    // Check if the new note is added to the list
    expect(screen.getByText(/Test Note/i)).toBeInTheDocument();
  });

  test("updates an existing note", () => {
    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    // Get the "Update" button for the first note
    const updateButton = screen.getByText(/Update/i);

    // Click the "Update" button
    fireEvent.click(updateButton);

    // Enter new text in the prompt
    const updatedText = "Updated Note";
    const promptMock = jest.fn(() => updatedText);
    global.prompt = promptMock;

    // Click the "OK" button in the prompt
    fireEvent.click(screen.getByText(/OK/i));

    // Check if the note is updated in the list
    expect(screen.getByText(new RegExp(updatedText, "i"))).toBeInTheDocument();
  });

  test("deletes an existing note", () => {
    render(
      <Provider store={store}>
        <NoteApp />
      </Provider>
    );

    // Get the "Delete" button for the first note
    const deleteButton = screen.getByText(/Delete/i);

    // Click the "Delete" button
    fireEvent.click(deleteButton);

    // Check if the note is deleted from the list
    expect(screen.queryByText(/Test Note/i)).not.toBeInTheDocument();
  });
});
