import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-delete-dialog-title"
      aria-describedby="confirm-delete-dialog-description"
    >
      <DialogTitle id="confirm-delete-dialog-title">Confirmar Deleção</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-delete-dialog-description">
          Você tem certeza que deseja deletar este card?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Não
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
