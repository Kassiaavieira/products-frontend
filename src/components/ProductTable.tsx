import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const TableHeaderStyled = styled(TableHead)(({ theme }) => ({
    backgroundColor: '#e1def9',
    color: theme.palette.primary.contrastText,
}));
  
const TableCellStyled = styled(TableCell)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSize,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => (
  <TableContainer component={Paper} elevation={3}>
    <Table>
      <TableHeaderStyled>
        <TableRow>
          <TableCellStyled><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Nome</Typography></TableCellStyled>
          <TableCellStyled><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Preço</Typography></TableCellStyled>
          <TableCellStyled><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Descrição</Typography></TableCellStyled>
          <TableCellStyled><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Ações</Typography></TableCellStyled>
        </TableRow>
      </TableHeaderStyled>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
              <IconButton
                color="primary"
                onClick={() => onEdit(product)}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => onDelete(product.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ProductTable;
