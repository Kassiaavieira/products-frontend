import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#e1def9",
  color: theme.palette.primary.contrastText,
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#e1def9',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#d0c3f0',
  },
}));

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: { name: string; price: string; description: string };
  onSave: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onClose,
  product,
  onSave,
  onChange,
  title,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitleStyled>{title}</DialogTitleStyled>
    <DialogContentStyled>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={product.name}
        onChange={onChange}
        name="name"
        variant="outlined"
      />
      <TextField
        label="Preço"
        type="number"
        fullWidth
        margin="normal"
        value={product.price}
        onChange={onChange}
        name="price"
        variant="outlined"
      />
      <TextField
        label="Descrição"
        fullWidth
        margin="normal"
        value={product.description}
        onChange={onChange}
        name="description"
        variant="outlined"
      />
    </DialogContentStyled>
    <DialogActions>
      <ButtonStyled onClick={onClose}>Cancelar</ButtonStyled>
      <ButtonStyled onClick={onSave} color="primary">Salvar</ButtonStyled>
    </DialogActions>
  </Dialog>
);

export default ProductDialog;
