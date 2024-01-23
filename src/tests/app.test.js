import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import NoteApp from "../components/NotesUI";

test("UI Render Test", () => {
  render(
    <Provider store={store}>
      <NoteApp />
    </Provider>
  );

  const ui = screen.getByTestId("test-1");
  expect(ui).toHaveTextContent("Redux Note App");
});
