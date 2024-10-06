import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

interface RiskScreeningModalProps {
  open: boolean;
  onClose: () => void;
  supplierName: string;
}

// Placeholder function for risk screening
const performRiskScreening = async (supplierName: string): Promise<string> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Placeholder logic - you'll replace this with your actual implementation
  const riskLevel = Math.random();
  if (riskLevel < 0.3) {
    return "Low Risk";
  } else if (riskLevel < 0.7) {
    return "Medium Risk";
  } else {
    return "High Risk";
  }
};

const RiskScreeningModal: React.FC<RiskScreeningModalProps> = ({ open, onClose, supplierName }) => {
  const [riskAssessment, setRiskAssessment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScreening = async () => {
    setLoading(true);
    try {
      const result = await performRiskScreening(supplierName);
      setRiskAssessment(result);
    } catch (error) {
      console.error('Error performing risk screening:', error);
      setRiskAssessment('Error occurred during screening');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Risk Screening: {supplierName}</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : riskAssessment ? (
          <Typography variant="h6" align="center" color={
            riskAssessment === "Low Risk" ? "success.main" :
            riskAssessment === "Medium Risk" ? "warning.main" : "error.main"
          }>
            {riskAssessment}
          </Typography>
        ) : (
          <Typography>Click "Perform Screening" to assess the risk level.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
        <Button onClick={handleScreening} color="primary" variant="contained" disabled={loading}>
          Perform Screening
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RiskScreeningModal;