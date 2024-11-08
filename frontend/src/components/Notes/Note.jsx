// import * as React from "react";
// import Box from "@mui/material/Box";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

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

const Note = ({ note, onDelete, onEdit }) => {
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
        <IconButton onClick={() => onEdit(note.id)} color="primary">
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
