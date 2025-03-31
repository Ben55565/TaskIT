import React, { useState } from "react";
import Note from "../Note/Note";
import {
  Grid,
  Box,
  Typography,
  Dialog,
  Button,
  Snackbar,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import NotesController from "../NotesController/NotesController";
import Fade from "@mui/material/Fade";
import "./Notes.css";

// in the future use:
// NotesDrawer - for controlling catarogies of the notes
// CheckList - for Creating notes that are checklists

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1", content: "This is the first note" },
  ]);
  const [newNoteFormActive, setNewNoteFormActive] = useState(false);

  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Edit note with ID: ${id}`);
  };

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {notes.length !== 0 ? (
          notes.map((note) => (
            <Grid item key={note.id}>
              <Note note={note} onDelete={handleDelete} onEdit={handleEdit} />
            </Grid>
          ))
        ) : (
          <Typography variant="h4" className="clock">
            Currently no Notes existing, feel free to add new ones!
          </Typography>
        )}
      </Grid>
      <NotesController
        setNotes={setNotes}
        newNoteFormActive={newNoteFormActive}
        setNewNoteFormActive={setNewNoteFormActive}
      />

      <Dialog
        open={newNoteFormActive}
        TransitionComponent={Fade}
        keepMounted
        disablePortal
        disablebackdropclick="true"
        onClose={() => {
          setNewNoteFormActive(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <React.Fragment>
          <DialogTitle>{"Create new note"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              body text here
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent="center">
              <Button onClick={() => setShowSnackBar(true)}>Add</Button>
              <Button onClick={() => setNewNoteFormActive(false)}>
                Discard
              </Button>
            </Grid>
          </DialogActions>
        </React.Fragment>
      </Dialog>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackBar(false);
          setNewNoteFormActive(false);
        }}
        message="Note Added"
      />
    </Box>
  );
};

export default Notes;
