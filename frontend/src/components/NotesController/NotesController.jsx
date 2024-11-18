import { React } from "react";
import { Box } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShareIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";

const NotesController = ({
  setNotes,
  newNoteFormActive,
  setNewNoteFormActive,
}) => {
  const hanleClickNew = () => {
    setNewNoteFormActive(true);
  };

  const handleClickShare = () => {
    console.log("clicked share");
  };

  const actions = [
    { icon: <AddIcon />, name: "New", onClick: hanleClickNew },
    {
      icon: <ShareIcon />,
      name: "Share",
      onClick: handleClickShare,
    },
  ];

  const speedDialStyle = {
    position: "absolute",
    bottom: 80,
    right: 30,
  };

  return (
    <Box sx={speedDialStyle}>
      <SpeedDial ariaLabel="SpeedDial" icon={<MenuIcon />} direction="up">
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default NotesController;
