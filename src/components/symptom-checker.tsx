'use client';

import {symptomChecker, SymptomCheckerInput} from '@/ai/flows/symptom-checker';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

const SymptomCheckerComponent = () => {
  const [symptoms, setSymptoms] = useState('');
  const [checkerResult, setCheckerResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSymptomCheck = async () => {
    setIsLoading(true);
    try {
      const input: SymptomCheckerInput = {
        symptoms: symptoms,
      };
      const result = await symptomChecker(input);
      setCheckerResult(result);
    } catch (error) {
      console.error('Error during symptom check:', error);
      setCheckerResult({
        potentialCauses: 'An error occurred during symptom check. Please try again.',
        suggestedNextSteps: 'Please try again or consult a healthcare professional.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Checker</CardTitle>
        <CardDescription>Enter your symptoms to get potential causes and next steps.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="symptoms">Symptoms</Label>
          <Input
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter your symptoms here."
          />
        </div>
        <Button onClick={handleSymptomCheck} disabled={isLoading}>
          {isLoading ? 'Checking...' : 'Check Symptoms'}
        </Button>

        {checkerResult && (
          <div className="mt-4">
            <h3>Symptom Check Result:</h3>
            <p>Potential Causes: {checkerResult.potentialCauses}</p>
            <p>Suggested Next Steps: {checkerResult.suggestedNextSteps}</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Disclaimer: This is an AI-powered symptom checker and should not be used as a substitute
          for professional medical advice. Always consult with a qualified healthcare
          professional for any health concerns.
        </p>
      </CardContent>
    </Card>
  );
};

export default SymptomCheckerComponent;
