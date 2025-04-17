import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Note = ({ note, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "10px" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {note.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {note.content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(note.id)} color="secondary">
          <DeleteIcon />
        </IconButton>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Note;
