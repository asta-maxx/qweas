'use client';

import {aiDiagnosis, AIDiagnosisInput} from '@/ai/flows/ai-diagnosis';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

const AIDiagnosisComponent = () => {
  const [medicalState, setMedicalState] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiagnosis = async () => {
    setIsLoading(true);
    try {
      const input: AIDiagnosisInput = {
        medicalState: medicalState,
      };
      const result = await aiDiagnosis(input);
      setDiagnosisResult(result);
    } catch (error) {
      console.error('Error during diagnosis:', error);
      setDiagnosisResult({
        possibleDiagnosis: 'An error occurred during diagnosis.',
        confidenceLevel: 0,
        nextSteps: 'Please try again or consult a healthcare professional.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Diagnosis Tool</CardTitle>
        <CardDescription>Enter your medical information to get a possible diagnosis.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="medical-state">Medical State</Label>
          <Input
            id="medical-state"
            value={medicalState}
            onChange={(e) => setMedicalState(e.target.value)}
            placeholder="Enter your symptoms, medical history, and other relevant information."
          />
        </div>
        <Button onClick={handleDiagnosis} disabled={isLoading}>
          {isLoading ? 'Diagnosing...' : 'Get Diagnosis'}
        </Button>

        {diagnosisResult && (
          <div className="mt-4">
            <h3>Diagnosis Result:</h3>
            <p>Possible Diagnosis: {diagnosisResult.possibleDiagnosis}</p>
            <p>Confidence Level: {diagnosisResult.confidenceLevel}</p>
            <p>Suggested Next Steps: {diagnosisResult.nextSteps}</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Disclaimer: This is an AI-powered diagnosis tool and should not be used as a substitute
          for professional medical advice. Always consult with a qualified healthcare
          professional for any health concerns.
        </p>
      </CardContent>
    </Card>
  );
};

export default AIDiagnosisComponent;
