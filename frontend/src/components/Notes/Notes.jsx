import React, { useState } from "react";
import Note from "../Note/Note";
import {
  Grid,
  Box,
  Typography,
  Dialog,
  Button,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import NotesController from "../NotesController/NotesController";
import "./Notes.css";

// in the future use:
// NotesDrawer - for controlling catarogies of the notes
// CheckList - for Creating notes that are checklists

// URGENT PROBLEM - FIX THAT ON CREATING A NEW NOTE, AND THEN DISCARDING IT, I CANNOT TOUCH ANYTHING IN THE SITE

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1", content: "This is the first note" },
  ]);
  const [newNoteFormActive, setNewNoteFormActive] = useState(false);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Edit note with ID: ${id}`);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  // On add note or edit or anything show the snackbar:
  /* <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message="Note Added"
      action={action}
    /> */

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
      <React.Fragment>
        <Dialog
          open={newNoteFormActive}
          TransitionComponent={Transition}
          keepMounted
          disableEnforceFocus
          onClose={() => {
            setNewNoteFormActive(false);
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Create new note"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              body text here
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent="center">
              <Button>Add</Button>
              <Button onClick={() => setNewNoteFormActive(false)}>
                Discard
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Box>
  );
};

export default Notes;
