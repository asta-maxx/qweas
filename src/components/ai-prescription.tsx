'use client';

import {generatePrescription, GeneratePrescriptionInput, GeneratePrescriptionOutput} from '@/ai/flows/ai-prescription';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

const AIPrescriptionComponent = () => {
  const [condition, setCondition] = useState('');
  const [patientDetails, setPatientDetails] = useState('');
  const [prescriptionResult, setPrescriptionResult] = useState<GeneratePrescriptionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePrescription = async () => {
    setIsLoading(true);
    try {
      const input: GeneratePrescriptionInput = {
        condition: condition,
        patientDetails: patientDetails,
      };
      const result = await generatePrescription(input);
      setPrescriptionResult(result);
    } catch (error) {
      console.error('Error during prescription generation:', error);
      setPrescriptionResult({
        possiblePrescriptions: [],
        disclaimer: 'An error occurred during prescription generation. Please try again.',
      } as any);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Prescription Generator</CardTitle>
        <CardDescription>
          Enter the diagnosed condition and patient details to generate possible prescriptions.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="condition">Condition</Label>
          <Input
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Enter the diagnosed medical condition."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="patient-details">Patient Details</Label>
          <Input
            id="patient-details"
            value={patientDetails}
            onChange={(e) => setPatientDetails(e.target.value)}
            placeholder="Enter patient details like age, weight, and allergies."
          />
        </div>
        <Button onClick={handleGeneratePrescription} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Prescription'}
        </Button>

        {prescriptionResult && (
          <div className="mt-4">
            <h3>Possible Prescriptions:</h3>
            {prescriptionResult.possiblePrescriptions.length > 0 ? (
              <ul>
                {prescriptionResult.possiblePrescriptions.map((prescription: any, index: number) => (
                  <li key={index} className="mb-2">
                    <p>Medication Name: {prescription.medicationName}</p>
                    <p>Dosage: {prescription.dosage}</p>
                    <p>Instructions: {prescription.instructions}</p>
                    <p>Rationale: {prescription.rationale}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No prescriptions found.</p>
            )}
            <p className="text-sm text-muted-foreground">
              {prescriptionResult.disclaimer}
            </p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Disclaimer: This is an AI-powered prescription generator and should not be used as a
          substitute for professional medical advice. Always consult with a qualified healthcare
          professional for any health concerns.
        </p>
      </CardContent>
    </Card>
  );
};

export default AIPrescriptionComponent;
