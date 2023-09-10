import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

function DialogComp(props) {
  const { onCancel, open, onRestart } = props;

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>GAME OVER !!!</DialogTitle>
      <DialogActions>
        <Button onClick={onRestart}>
          Restart
        </Button>
        <Button onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogComp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function GameOver({ restart, gameOver }) {
  const [open, setOpen] = React.useState(gameOver);

  const handleRestart = () => {
    setOpen(false);
    restart();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <DialogComp keepMounted open={open} onCancel={handleCancel} onRestart={handleRestart} />
    </Box>
  );
}
