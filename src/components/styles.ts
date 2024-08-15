import { styled } from '@mui/material/styles';
import { Button, Container, TableHead, TableCell, DialogTitle, DialogContent } from '@mui/material';

const ContainerStyled = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  minHeight: '100vh',
}));

export const TableHeaderStyled = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#e1def9',
  color: theme.palette.primary.contrastText,
}));

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.fontSize,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#e1def9",
  color: theme.palette.primary.contrastText,
}));

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#e1def9',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#d0c3f0',
  },
}));
