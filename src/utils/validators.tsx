// src/utils/validators.ts

export const validateEmail = (email: string): string => {
    if (!email) return ''; // Empty email is valid
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email) ? '' : 'Invalid email address';
  };
  
  export const validatePhoneNumber = (phoneNumber: string): string => {
    return /^\d+$/.test(phoneNumber) ? '' : 'Phone number should contain only digits';
  };
  
  export const validateTaxId = (taxId: string): string => {
    if (!/^\d{11}$/.test(taxId)) {
      return 'Tax ID must contain exactly 11 digits';
    }
    return '';
  };
  
  export const validateAnnualBilling = (value: string): string => {
    const numValue = parseFloat(value);
    return isNaN(numValue) || numValue < 0 ? 'Annual billing must be a positive number' : '';
  };