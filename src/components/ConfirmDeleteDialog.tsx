import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#e1def9",
  color: theme.palette.primary.contrastText,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#e1def9',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#d0c3f0',
  },
}));

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitleStyled>Confirmar Exclusão</DialogTitleStyled>
    <DialogContent>
      <p>Você tem certeza de que deseja excluir este item?</p>
    </DialogContent>
    <DialogActions>
      <ButtonStyled onClick={onClose}>Cancelar</ButtonStyled>
      <ButtonStyled onClick={onConfirm} color="primary">Excluir</ButtonStyled>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteDialog;
