import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote, deleteNote } from "../actions/Actions";
import {
  Container,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import "./NoteApp.css";

const NoteApp = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  const [newNote, setNewNote] = useState("");
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateNoteId, setUpdateNoteId] = useState("");
  const [updatedNoteText, setUpdatedNoteText] = useState("");
  const [newNoteError, setNewNoteError] = useState("");
  const [updatedNoteError, setUpdatedNoteError] = useState("");

  const handleAddNote = () => {
    if (newNote.trim() === "") {
      setNewNoteError("Please enter some note name");
    } else {
      setNewNoteError("");
      dispatch(addNote({ id: Date.now(), text: newNote }));
      setNewNote("");
    }
  };

  const handleOpenUpdateDialog = (id, text) => {
    setUpdateNoteId(id);
    setUpdatedNoteText(text);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleUpdateNote = () => {
    if (updatedNoteText.trim() === "") {
      setUpdatedNoteError("Please enter some note name");
    } else {
      setUpdatedNoteError("");
      dispatch(updateNote(updateNoteId, { text: updatedNoteText }));
      handleCloseUpdateDialog();
    }
  };

  const handleDeleteNote = (id, text) => {
    if (
      window.confirm(
        "Are you sure you want to delete this '" + text + "' note?"
      )
    ) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ padding: { xs: 2, md: 4 } }}
      className="NoteAppContainer"
    >
      <Typography variant="h4" align="center" gutterBottom>
        Redux Note App
      </Typography>
      <List>
        {notes.map((note) => (
          <ListItem
            className="list-item"
            key={note.id}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 8,
              marginBottom: 2,
              padding: 2,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ flex: 1, marginRight: 2, overflowWrap: "break-word" }}
            >
              {note.text}
            </Typography>
            <div className="grid-item-actions">
              <IconButton
                onClick={() => handleOpenUpdateDialog(note.id, note.text)}
                title="Edit Note"
                sx={{ marginRight: 1 }}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteNote(note.id, note.text)}
                title="Delete Note"
              >
                <Delete />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
      <div className="AddNoteContainer">
        <TextField
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="NoteInput"
          label="Add a new note"
          fullWidth
        />
        {newNoteError && (
          <div
            style={{ color: "red", textAlign: "left" }}
            className="error-message"
          >
            {newNoteError}
          </div>
        )}
        <Button
          onClick={handleAddNote}
          variant="contained"
          color="primary"
          className="Button"
          size="medium"
          fullWidth
        >
          Add Note
        </Button>
      </div>

      <Dialog
        open={isUpdateDialogOpen}
        onClose={handleCloseUpdateDialog}
        PaperProps={{
          elevation: 4,
          style: {
            minWidth: 300,
            padding: 16,
          },
        }}
      >
        <DialogTitle className="DialogTitle">Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="updatedNoteText"
            label="Updated Note"
            type="text"
            fullWidth
            value={updatedNoteText}
            onChange={(e) => setUpdatedNoteText(e.target.value)}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {updatedNoteError && (
            <div
              style={{ color: "red", textAlign: "left" }}
              className="error-message"
            >
              {updatedNoteError}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateNote}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NoteApp;
