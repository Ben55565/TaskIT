import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import { TextField } from "@mui/material";

import ListItemText from "@mui/material/ListItemText";

export default function NotesDrawer() {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState(["Notes"]);
  const [newCategory, setNewCategory] = React.useState("");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Button onClick={toggleDrawer(false)} sx={{ p: 2 }}>
        Close Catagories
      </Button>
      <List>
        {categories.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <TextField
        id="standard-basic"
        label="Add new category"
        variant="standard"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{ ml: 2 }}
      />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Categories</Button>
      <Drawer open={open}>{DrawerList}</Drawer>
    </div>
  );
}
