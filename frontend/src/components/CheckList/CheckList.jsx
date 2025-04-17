import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CheckList = ({ note, onDelete, onToggleTask, onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    onAddTask(note.id, newTask);
    setNewTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 400,
        wordWrap: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {note.title}
        </Typography>
        <List>
          {note.tasks.map((task, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon>
                <Checkbox
                  checked={task.checked}
                  onChange={() => onToggleTask(note.id, index)}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      textDecoration: task.checked ? "line-through" : "none",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {task.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <TextField
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
          sx={{ mt: 1, width: "100%" }}
        />
        <Button onClick={handleAdd} sx={{ mt: 1 }}>
          Add Task
        </Button>

        <IconButton onClick={() => onDelete(note.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CheckList;
