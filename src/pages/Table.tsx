import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SUPPLIERS_ENDPOINT } from '../constants/apiConstants.ts';

export interface Supplier {
  id?: number;
  name: string;
  address?: string;
  tradeName?: string;
  taxId?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  country?: string;
  annualBillingUSD?: number;
  lastEdited?: Date;
  createdAt?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 20px rgba(33, 150, 243, 0.1)',
    borderRadius: theme.spacing(3),
    overflow: 'hidden',
    marginTop: theme.spacing(4),
  }));
  
  const StyledCardHeader = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
    padding: theme.spacing(3),
    color: 'white',
  }));
  
  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 'calc(100vh - 250px)',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      background: '#F1F1F1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#BBDEFB',
      borderRadius: 2,
    },
  }));
  
  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    '& th': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#F8FBFF',
    },
    '&:hover': {
      backgroundColor: '#E3F2FD',
    },
  }));
  
  const StyledChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
  }));
  
  const ActionButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1),
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  }));

const SupplierTable: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('https://highrisklists.azurewebsites.net/list-azure-suppliers');
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      setError('Failed to load suppliers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    console.log('Edit supplier with id:', id);
  };

  const handleDeleteClick = (id: number) => {
    setSupplierToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (supplierToDelete === null) return;

    try {
      const response = await fetch(`${SUPPLIERS_ENDPOINT}/${supplierToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete supplier');
      }

      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierToDelete));
      setSnackbar({ open: true, message: 'Supplier deleted successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete supplier', severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setSupplierToDelete(null);
    }
  };

  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2} height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <StyledCard>
        <StyledCardHeader>
          <Typography variant="h4" fontWeight="bold">
            Supplier List
          </Typography>
        </StyledCardHeader>
        <CardContent>
          <StyledTableContainer>
            <Table stickyHeader>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Trade Name</TableCell>
                  <TableCell>Tax ID</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Annual Billing (USD)</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <StyledTableRow key={supplier.id}>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.tradeName || '-'}</TableCell>
                    <TableCell>{supplier.taxId || '-'}</TableCell>
                    <TableCell>{supplier.phoneNumber || '-'}</TableCell>
                    <TableCell>{supplier.email || '-'}</TableCell>
                    <TableCell>
                      {supplier.country ? (
                        <StyledChip label={supplier.country} size="small" />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {supplier.annualBillingUSD
                        ? `$${supplier.annualBillingUSD.toLocaleString()}`
                        : '-'}
                    </TableCell>
                    <TableCell align="center">
                      <ActionButton
                        onClick={() => supplier.id && handleEdit(supplier.id)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </ActionButton>
                      <ActionButton
                        onClick={() => supplier.id && handleDeleteClick(supplier.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </ActionButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </CardContent>
      </StyledCard>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this supplier? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SupplierTable;