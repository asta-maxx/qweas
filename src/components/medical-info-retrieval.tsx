'use client';

import {medicalInfoRetrieval, MedicalInfoRetrievalInput, MedicalInfoRetrievalOutput} from '@/ai/flows/medical-info-retrieval';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

const MedicalInfoRetrievalComponent = () => {
  const [query, setQuery] = useState('');
  const [medicalInfo, setMedicalInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMedicalInfoRetrieval = async () => {
    setIsLoading(true);
    try {
      const input: MedicalInfoRetrievalInput = {
        query: query,
      };
      const result: MedicalInfoRetrievalOutput = await medicalInfoRetrieval(input);
      setMedicalInfo(result.answer);
    } catch (error) {
      console.error('Error during medical info retrieval:', error);
      setMedicalInfo('An error occurred while retrieving medical information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Information Retrieval</CardTitle>
        <CardDescription>Ask a medical question and get relevant information.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="medical-query">Medical Query</Label>
          <Input
            id="medical-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your medical question here."
          />
        </div>
        <Button onClick={handleMedicalInfoRetrieval} disabled={isLoading}>
          {isLoading ? 'Retrieving...' : 'Get Medical Info'}
        </Button>

        {medicalInfo && (
          <div className="mt-4">
            <h3>Medical Information:</h3>
            <p>{medicalInfo}</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Disclaimer: This information is for educational purposes only and does not constitute
          medical advice. Always consult with a qualified healthcare professional for any health
          concerns.
        </p>
      </CardContent>
    </Card>
  );
};

export default MedicalInfoRetrievalComponent;
