import React from "react";
import { Modal, Paper, Typography, Button } from "@mui/material";

const DisplayReadMe = ({ onClose, username, title, description }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Paper>
        <Typography variant="h5">{username}'s ReadMe Info Here!!!</Typography>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="p2">{description}!</Typography>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </Paper>
    </Modal>
  );
};

export default DisplayReadMe;