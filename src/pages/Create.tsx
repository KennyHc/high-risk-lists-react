import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SUPPLIERS_ENDPOINT } from '../constants/apiConstants.ts';
import { validateEmail, validatePhoneNumber, validateTaxId, validateAnnualBilling } from '../utils/validators.tsx';

const StyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F9FF 35%, #E8F4FF 70%, #D6EAFF 100%)',
    boxShadow: '0 8px 20px rgba(33, 150, 243, 0.15)',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    border: '1px solid rgba(33, 150, 243, 0.1)',
  }));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  color: '#2196F3',
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: theme.spacing(3, 0, 2),
}));

interface Supplier {
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
}

const Create: React.FC = () => {
  const [formData, setFormData] = useState<Supplier>({
    name: '',
    tradeName: '',
    taxId: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: '',
    country: '',
    annualBillingUSD: undefined,
    lastEdited: new Date(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    // Validate fields
    let error = '';
    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'phoneNumber':
        error = validatePhoneNumber(value);
        break;
      case 'taxId':
        error = validateTaxId(value);
        break;
      case 'annualBillingUSD':
        error = validateAnnualBilling(value);
        break;
    }
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for validation errors
    const newErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'email' && value) {
        newErrors[key] = validateEmail(value as string);
      } else if (key === 'name' && !value) {
        newErrors[key] = 'Name is required';
      } else if (key === 'taxId' && value) {
        newErrors[key] = validateTaxId(value as string);
      }
    });

    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Prepare the data for submission
      const submissionData = {
        ...formData,
        annualBillingUSD: formData.annualBillingUSD ? parseFloat(formData.annualBillingUSD.toString()) : undefined,
      };

      const response = await fetch(SUPPLIERS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create supplier');
      }

      setSnackbar({ open: true, message: 'Supplier created successfully', severity: 'success' });
      setFormData({ name: '', tradeName: '', taxId: '', phoneNumber: '', email: '', website: '', address: '', country: '', annualBillingUSD: undefined, lastEdited: new Date() });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create supplier', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <StyledCard>
        <CardContent>
          <StyledTypography variant="h4" align="center">
            Create Supplier
          </StyledTypography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="tradeName"
                  fullWidth
                  label="Trade Name"
                  value={formData.tradeName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="taxId"
                  fullWidth
                  label="Tax ID"
                  value={formData.taxId}
                  onChange={handleChange}
                  error={!!errors.taxId}
                  helperText={errors.taxId || 'Must be 11 digits'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phoneNumber"
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="website"
                  fullWidth
                  label="Website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  fullWidth
                  label="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="country"
                  fullWidth
                  label="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="annualBillingUSD"
                  fullWidth
                  label="Annual Billing (USD)"
                  type="number"
                  value={formData.annualBillingUSD || ''}
                  onChange={handleChange}
                  error={!!errors.annualBillingUSD}
                  helperText={errors.annualBillingUSD}
                />
              </Grid>
            </Grid>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Create Supplier'}
            </StyledButton>
          </Box>
        </CardContent>
      </StyledCard>
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

export default Create;