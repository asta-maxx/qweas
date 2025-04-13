'use server';

/**
 * @fileOverview An AI agent for checking symptoms and providing potential causes and next steps.
 *
 * - symptomChecker - A function that handles the symptom checking process.
 * - SymptomCheckerInput - The input type for the symptomChecker function.
 * - SymptomCheckerOutput - The return type for the symptomChecker function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('The symptoms experienced by the user.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  potentialCauses: z.string().describe('A list of potential causes for the symptoms.'),
  suggestedNextSteps: z.string().describe('Suggested next steps for the user to take.'),
  medicalDatabaseSearchResult: z.string().optional().describe('Relevant medical information if found.'),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function symptomChecker(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const searchMedicalDatabase = ai.defineTool(
  {
    name: 'searchMedicalDatabase',
    description: 'Searches a medical database for information related to the symptoms.',
    inputSchema: z.object({
      query: z.string().describe('The search query to use for the medical database.'),
    }),
    outputSchema: z.string(),
  },
  async input => {
    // Placeholder for actual database search implementation.
    // In a real application, this would connect to and query a medical database.
    // For now, it just returns a canned response.
    return `Medical database search results for "${input.query}": No specific results found, consult a doctor for proper diagnosis.`;
  }
);

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {
    schema: z.object({
      symptoms: z.string().describe('The symptoms experienced by the user.'),
    }),
  },
  output: {
    schema: z.object({
      potentialCauses: z.string().describe('A list of potential causes for the symptoms.'),
      suggestedNextSteps: z.string().describe('Suggested next steps for the user to take.'),
    }),
  },
  tools: [searchMedicalDatabase],
  prompt: `You are a helpful AI assistant that analyzes user-provided symptoms and provides potential causes and suggested next steps.

  User Symptoms: {{{symptoms}}}

  Based on the user's symptoms, provide a list of potential causes and suggest appropriate next steps. If the symptoms indicate the need for specific medical information, use the searchMedicalDatabase tool to get relevant information and incorporate it into your response.

  If the symptoms are vague, use the tool to search for "general medical advice".

  Format your response as follows:

  Potential Causes: [list of potential causes]
  Suggested Next Steps: [list of suggested next steps]`,
});

const symptomCheckerFlow = ai.defineFlow<
  typeof SymptomCheckerInputSchema,
  typeof SymptomCheckerOutputSchema
>(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt({
      symptoms: input.symptoms,
    });

    return output!;
  }
);
