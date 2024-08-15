"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Pagination,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductTable from '../components/ProductTable';
import ProductDialog from '../components/ProductDialog';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

interface ProductsResponse {
  totalItems: number;
  items: Product[];
  totalPages: number;
  currentPage: number;
}
const ContainerStyled = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  minHeight: '100vh',
}));
const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#e1def9',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#d0c3f0',
  },
}));

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<{ name: string; price: string; description: string }>({
    name: '',
    price: '',
    description: ''
  });
  const [editProduct, setEditProduct] = useState<{ name: string; price: string; description: string }>({
    name: '',
    price: '',
    description: ''
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState<number>(5);

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleOpenEditDialog = (product: Product) => {
    setEditProduct({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setCurrentProduct(product);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => setOpenEditDialog(false);

  const handleOpenDeleteDialog = (id: number) => {
    setConfirmDeleteId(id);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  useEffect(() => {
    fetchProducts(page, pageSize);
  }, [page, pageSize]);

  const fetchProducts = async (page: number, limit: number) => {
    try {
      const response = await axios.get<ProductsResponse>(`${API_URL}/products`, {
        params: { page, limit }
      });
      setProducts(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post(`${API_URL}/products`, newProduct);
      setOpenAddDialog(false);
      fetchProducts(page, pageSize);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async () => {
    if (currentProduct) {
      try {
        await axios.patch(`${API_URL}/products/${currentProduct.id}`, editProduct);
        setOpenEditDialog(false);
        fetchProducts(page, pageSize);
      } catch (error) {
        console.error('Error editing product:', error);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (confirmDeleteId !== null) {
      try {
        await axios.delete(`${API_URL}/products/${confirmDeleteId}`);
        setOpenDeleteDialog(false);
        fetchProducts(page, pageSize);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <ContainerStyled maxWidth="lg">
      <Typography
        variant="h4"
        style={{
          fontFamily: 'Roboto, Arial, sans-serif',
          fontWeight: 700,
          fontSize: '2rem',
          textAlign: 'center',
          margin: '16px 0',
          letterSpacing: '0.05em',
        }}
      >
        Produtos
      </Typography>
      <Box mb={2}>
        <ButtonStyled variant="contained" onClick={handleOpenAddDialog}>
          Adicionar Produto
        </ButtonStyled>
      </Box>
      <ProductTable
        products={products}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />
     <Pagination
      count={totalPages}
      page={page}
      onChange={handleChangePage}
      color="primary"
      sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
    />
      <ProductDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        product={newProduct}
        onSave={handleAddProduct}
        onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
        title="Adicionar Produto"
      />
      {currentProduct && (
        <ProductDialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          product={editProduct}
          onSave={handleEditProduct}
          onChange={(e) => setEditProduct({ ...editProduct, [e.target.name]: e.target.value })}
          title="Editar Produto"
        />
      )}
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </ContainerStyled>
  );
};

export default ProductsPage;
