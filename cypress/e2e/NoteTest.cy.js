/* eslint-disable no-undef */
describe("Note App Test", () => {
  it("Checks that UI is rendering", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-testid="test-1"]').should("exist");
  });

  it("Checks that input form exists", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-testid="test-2"]').should("exist");
  });

  it("Checks that button is working", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Add Note").click();
  });

  it("Checks that input tag is working", () => {
    cy.visit("http://localhost:3000/");

    const notename = "Note 1";
    cy.get(".NoteInput").type(notename);
  });

  it("Checks that note is adding", () => {
    cy.visit("http://localhost:3000/");

    const notename = "Note 1";
    cy.get(".NoteInput").type(notename);
    cy.contains("Add Note").click();
    cy.get("[title='Edit Note']").should("exist");
    cy.get("[title='Delete Note']").should("exist");
  });

  it("Checks that delete not is working", () => {
    cy.visit("http://localhost:3000/");

    const notename = "Note 1";
    cy.get(".NoteInput").type(notename);
    cy.contains("Add Note").click();
    cy.get("[title='Delete Note']").click();
  });

  it("Adds note, opens update popup, and updates note", () => {
    cy.visit("http://localhost:3000/");

    const originalNoteName = "Note 1";
    const updatedNoteName = "Note 3";
    const clearedNoteName = " ";

    // Add a new note
    cy.get(".NoteInput").type(originalNoteName);
    cy.contains("Add Note").click();

    // Open the update popup
    cy.get("[title='Edit Note']").click();

    // Clear the existing text and type the updated note name
    cy.get("#updatedNoteText").clear().type(clearedNoteName);

    // Save the updated note
    cy.contains("Save").click();

    // Clear the existing text and type the updated note name
    cy.get("#updatedNoteText").clear().type(updatedNoteName);

    // Save the updated note
    cy.contains("Save").click();
  });
});
