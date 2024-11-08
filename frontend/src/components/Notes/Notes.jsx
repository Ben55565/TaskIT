import React, { useState } from "react";
import Note from "./Note";
import { Grid } from "@mui/material";

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1", content: "This is the first note" },
    { id: 2, title: "Note 2", content: "This is the second note" },
    { id: 3, title: "Note 3", content: "This is the second note" },
    { id: 4, title: "Note 4", content: "This is the second note" },
    { id: 5, title: "Note 5", content: "This is the second note" },
    { id: 6, title: "Note 6", content: "This is the second note" },
    { id: 7, title: "Note 7", content: "This is the second note" },
    // Add more notes as needed
  ]);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Edit note with ID: ${id}`);
    // Your edit logic here
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {notes.map((note) => (
        <Grid item key={note.id}>
          <Note note={note} onDelete={handleDelete} onEdit={handleEdit} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Notes;
