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
  Grid,
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

  const handleAddNote = () => {
    if (newNote.trim() === "") {
      alert("Please enter some note name first");
    } else {
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
    dispatch(updateNote(updateNoteId, { text: updatedNoteText }));
    handleCloseUpdateDialog();
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <Container maxWidth="sm" className="NoteAppContainer">
      <Typography variant="h4" align="center" gutterBottom>
        Note App
      </Typography>
      <List>
        {notes.map((note) => (
          <ListItem className="list-item" key={note.id}>
            <Grid container spacing={20}>
              <Grid item xs={6} md={8} className="grid-item-main">
                <div>{note.text}</div>
              </Grid>
              <Grid item xs={6} md={4} className="grid-item-actions">
                <div>
                  <IconButton
                    onClick={() => handleOpenUpdateDialog(note.id, note.text)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteNote(note.id)}>
                    <Delete />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
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

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button onClick={handleUpdateNote} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NoteApp;
