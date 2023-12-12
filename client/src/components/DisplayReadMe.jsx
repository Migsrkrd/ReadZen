import React from "react";
import { Modal, Paper, Typography, Button } from "@mui/material";

const DisplayReadMe = ({ onClose, title, description, installation, usage, license, toc, credits, tests, repoLink, deployedLink }) => {
  const handleClose = () => {
    console.log("closing modal");
    onClose();
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Paper>
        <Typography variant="h3">{title}</Typography>
        <br />
        {description && (
          <>
            <Typography variant="h4">Description</Typography>
            <Typography variant="p2">{description}</Typography>
          </>
        )}
        {deployedLink && (
          <Typography variant="p2">View the project: {deployedLink}</Typography>
        )}
        <br />
        {toc && (
          <>
            <Typography variant="h4">Table of Contents</Typography>
            <Typography variant="p2">{toc}</Typography>
          </>
        )}
        {installation && (
          <>
            <Typography variant="h4">Installation</Typography>
            <Typography variant="p2">{installation}</Typography>
          </>
        )}
        <br />
        {usage && (
          <>
            <Typography variant="h4">Usage</Typography>
            <Typography variant="p2">{usage}</Typography>
          </>
        )}
        <br />
        {license && (
          <>
            <Typography variant="h4">License</Typography>
            <Typography variant="p2">{license}</Typography>
          </>
        )}
        <br />
        {credits && (
          <>
            <Typography variant="h4">Credits</Typography>
            <Typography variant="p2">{credits}</Typography>
          </>
        )}
        <br />
        {tests && (
          <>
            <Typography variant="h4">Tests</Typography>
            <Typography variant="p2">{tests}</Typography>
          </>
        )}
        <br />
        {repoLink && (
          <Typography variant="p2">Visit the official documentation here: {repoLink}</Typography>
        )}
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </Paper>
    </Modal>
  );
};

export default DisplayReadMe;