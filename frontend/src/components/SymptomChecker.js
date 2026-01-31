import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Divider,
} from '@mui/material';
import {
  Psychology,
  Add,
  Clear,
  TrendingUp,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { auth } from '../firebase/config';

const SymptomChecker = () => {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableSymptoms] = useState([
    'fever', 'cough', 'headache', 'fatigue', 'nausea', 'dizziness',
    'chest_pain', 'shortness_of_breath', 'abdominal_pain', 'joint_pain',
    'sore_throat', 'runny_nose', 'muscle_aches', 'loss_of_appetite',
    'difficulty_sleeping', 'skin_rash', 'back_pain', 'diarrhea'
  ]);

  const addSymptom = () => {
    if (selectedSymptom && !symptoms.includes(selectedSymptom)) {
      setSymptoms([...symptoms, selectedSymptom]);
      setSelectedSymptom('');
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) {
      alert(t('pleaseSelectSymptoms') || 'Please select at least one symptom');
      return;
    }

    setLoading(true);
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error('Please log in to use this feature');
      }

      const token = await auth.currentUser.getIdToken();
      console.log('Sending symptoms:', symptoms);
      console.log('Using URL: http://localhost:5000/api/analyze-symptoms');
      
      const response = await axios.post(
        'http://localhost:5000/api/analyze-symptoms', // Use port 5000
        { symptoms },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000 // 15 second timeout
        }
      );

      console.log('Analysis response:', response.data);
      setResults(response.data);
      
    } catch (error) {
      console.error('Full error details:', error);
      
      let errorMessage = 'Analysis failed';
      
      if (error.response) {
        console.error('Server responded with error:', error.response.status, error.response.data);
        errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
      } else if (error.request) {
        console.error('Network error - no response received');
        errorMessage = 'Cannot connect to server. Please ensure backend is running on port 5000.';
      } else {
        console.error('Request setup error:', error.message);
        errorMessage = error.message;
      }
      
      alert(`Error: ${errorMessage}`);
    }
    
    setLoading(false);
  };

  const getProbabilityColor = (probability) => {
    if (probability > 0.7) return '#f44336'; // High - Red
    if (probability > 0.4) return '#ff9800'; // Medium - Orange
    return '#4caf50'; // Low - Green
  };

  const getSeverityIcon = (probability) => {
    if (probability > 0.7) return <Warning sx={{ color: '#f44336' }} />;
    if (probability > 0.4) return <TrendingUp sx={{ color: '#ff9800' }} />;
    return <CheckCircle sx={{ color: '#4caf50' }} />;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Psychology sx={{ fontSize: 32, color: '#e91e63', mr: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#e91e63' }}>
          {t('aiSymptomChecker') || 'AI Symptom Checker'}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Symptom Selection */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                {t('selectSymptoms') || 'Select Symptoms'}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>{t('symptoms') || 'Symptoms'}</InputLabel>
                  <Select
                    value={selectedSymptom}
                    onChange={(e) => setSelectedSymptom(e.target.value)}
                    label={t('symptoms') || 'Symptoms'}
                  >
                    {availableSymptoms.map((symptom) => (
                      <MenuItem key={symptom} value={symptom}>
                        {t(symptom) || symptom.replace('_', ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={addSymptom}
                  startIcon={<Add />}
                  sx={{
                    minWidth: 120,
                    background: 'linear-gradient(45deg, #e91e63 30%, #f06292 90%)',
                  }}
                >
                  {t('add') || 'Add'}
                </Button>
              </Box>

              {/* Selected Symptoms */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {t('selectedSymptoms') || 'Selected Symptoms'} ({symptoms.length})
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {symptoms.map((symptom) => (
                    <Chip
                      key={symptom}
                      label={t(symptom) || symptom.replace('_', ' ')}
                      onDelete={() => removeSymptom(symptom)}
                      deleteIcon={<Clear />}
                      color="primary"
                      variant="outlined"
                      sx={{
                        borderColor: '#e91e63',
                        color: '#e91e63',
                        '& .MuiChip-deleteIcon': {
                          color: '#e91e63',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={analyzeSymptoms}
                disabled={loading || symptoms.length === 0}
                startIcon={loading ? <CircularProgress size={20} /> : <Psychology />}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(45deg, #e91e63 30%, #f06292 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #c2185b 30%, #e91e63 90%)',
                  },
                }}
              >
                {loading ? (t('analyzing') || 'Analyzing...') : (t('analyzeSymptoms') || 'Analyze Symptoms')}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Results */}
          {results && (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  {t('analysisResults') || 'Analysis Results'}
                </Typography>

                {results.diseases?.map((disease, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: 1,
                      borderColor: getProbabilityColor(disease.probability) + '30',
                      borderRadius: 2,
                      backgroundColor: getProbabilityColor(disease.probability) + '05',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {getSeverityIcon(disease.probability)}
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 500, ml: 1, flexGrow: 1 }}
                      >
                        {disease.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: getProbabilityColor(disease.probability),
                          fontWeight: 600,
                        }}
                      >
                        {Math.round(disease.probability * 100)}%
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={disease.probability * 100}
                      sx={{
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getProbabilityColor(disease.probability),
                        },
                      }}
                    />

                    <Typography variant="body2" color="text.secondary">
                      {disease.description}
                    </Typography>
                  </Paper>
                ))}

                <Divider sx={{ my: 2 }} />

                <Alert 
                  severity="info" 
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: '#2196f3',
                    },
                  }}
                >
                  <Typography variant="body2">
                    {results.recommendation}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          )}

          {loading && (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress size={48} sx={{ color: '#e91e63', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  {t('analyzingSymptoms') || 'Analyzing Symptoms...'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('pleaseWait') || 'Please wait while we analyze your symptoms'}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SymptomChecker;
