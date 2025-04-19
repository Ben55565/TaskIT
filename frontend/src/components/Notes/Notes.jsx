import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Dialog,
  Button,
  Snackbar,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import NotesController from "../NotesController/NotesController";
import Fade from "@mui/material/Fade";
import "./Notes.css";
import CheckList from "../CheckList/CheckList";
import axios from "axios";

// in the future use:
// NotesDrawer - for controlling catarogies of the notes
// CheckList - for Creating notes that are checklists

const Notes = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNoteFormActive, setNewNoteFormActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [showSnackBar, setShowSnackBar] = useState(false);

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && body.trim() !== "") {
      e.preventDefault();
      setTasks([...tasks, { text: body, checked: false }]);
      setBody("");
    }
  };

  const handleDiscard = () => {
    setNewNoteFormActive(false);
    setBody("");
    setTitle("");
    setTasks([]);
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleAddTaskToNote = (noteId, taskText) => {
    if (!taskText.trim()) return;

    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        const updatedTasks = [
          ...note.tasks,
          { text: taskText.trim(), checked: false },
        ];
        return { ...note, tasks: updatedTasks };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const toggleTask = (noteId, taskIndex) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        const updatedTasks = [...note.tasks];
        const [toggledTask] = updatedTasks.splice(taskIndex, 1);
        toggledTask.checked = !toggledTask.checked;

        if (toggledTask.checked) {
          updatedTasks.push(toggledTask);
        } else {
          updatedTasks.unshift(toggledTask);
        }

        return { ...note, tasks: updatedTasks };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const handleAddNote = (title, body) => {
    let updatedTasks = [...tasks];

    if (body.trim() !== "") {
      updatedTasks.push({ text: body.trim(), checked: false });
    }
    const newNote = {
      id: notes.length + 1,
      title: title,
      tasks: updatedTasks,
    };
    setNotes([...notes, newNote]);
    setShowSnackBar(true);
    setNewNoteFormActive(false);
    setTitle("");
    setBody("");
    setTasks([]);

    if (user) {
      axios.post("http://localhost:8080/api/checklists", {
        checklist: {
          username: user.username,
          title: title,
        },
        tasks: updatedTasks.map((task) => ({
          text: task.text,
          checked: task.checked,
        })),
      });
    } else {
      localStorage.setItem("guest_notes", JSON.stringify([...notes, newNote]));
      localStorage.setItem("guest_notes_timestamp", Date.now());
    }
  };

  useEffect(() => {
    const loadNotes = async () => {
      if (user) {
        try {
          const { data } = await axios.get(
            "http://localhost:8080/api/checklists",
            {
              params: { username: user.username },
            }
          );

          const transformedNotes = data.map((item) => ({
            id: item.checklist.id,
            title: item.checklist.title,
            tasks: item.tasks ?? [],
          }));

          setNotes(transformedNotes);
        } catch (error) {
          console.error("Failed to fetch checklists:", error);
        }
      } else {
        const savedNotes = localStorage.getItem("guest_notes");
        const savedTimestamp = localStorage.getItem("guest_notes_timestamp");

        if (savedNotes && savedTimestamp) {
          const now = Date.now();
          const age = now - parseInt(savedTimestamp, 10);
          const oneDay = 24 * 60 * 60 * 1000;

          if (age < oneDay) {
            setNotes(JSON.parse(savedNotes));
          } else {
            localStorage.removeItem("guest_notes");
            localStorage.removeItem("guest_notes_timestamp");
          }
        }
      }
      setIsLoaded(true);
    };

    loadNotes();
  }, [user]);

  useEffect(() => {
    if (!isLoaded || user) return;

    localStorage.setItem("guest_notes", JSON.stringify(notes));
    localStorage.setItem("guest_notes_timestamp", Date.now());
  }, [notes, isLoaded, user]);

  return (
    <Box sx={{ mt: 20 }}>
      <Grid container spacing={2} justifyContent="center">
        {notes.length !== 0 ? (
          notes.map((note) => (
            <Grid item key={note.id}>
              <CheckList
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onToggleTask={toggleTask}
                onAddTask={handleAddTaskToNote}
              />
              {console.log(note)}
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
        <Box
          sx={{
            width: 500,
            height: 300,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            sx={{ mt: 2, mb: 2, width: "50%", ml: "25%" }}
            value={title}
            onChange={handleSetTitle}
          />
          <DialogContent>
            <TextField
              label="Add new tasks here.."
              variant="outlined"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ width: "100%", mb: 2 }}
            />
            <List>
              {tasks.map((task, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon>
                    <Checkbox
                      checked={task.checked}
                      onChange={() => toggleTask(index)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          textDecoration: task.checked
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent="center">
              <Button onClick={() => handleAddNote(title, body)}>Add</Button>
              <Button onClick={() => handleDiscard()}>Discard</Button>
            </Grid>
          </DialogActions>
        </Box>
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
