// 'use server';

/**
 * @fileOverview This file defines the Genkit flow for the AIDiagnosis story.
 *
 * It allows users to input their current medical state and receive a possible diagnosis.
 * The flow uses a tool to search a medical database when appropriate.
 *
 * - aiDiagnosis - A function that handles the AI diagnosis process.
 * - AIDiagnosisInput - The input type for the aiDiagnosis function.
 * - AIDiagnosisOutput - The return type for the aiDiagnosis function.
 */

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AIDiagnosisInputSchema = z.object({
  medicalState: z
    .string()
    .describe(
      'Detailed description of the current medical state, including symptoms, medical history, and any other relevant information.'
    ),
});
export type AIDiagnosisInput = z.infer<typeof AIDiagnosisInputSchema>;

const AIDiagnosisOutputSchema = z.object({
  possibleDiagnosis: z
    .string()
    .describe('A possible diagnosis based on the provided medical state.'),
  confidenceLevel: z
    .number()
    .describe('A numerical value (0-1) indicating the confidence level of the diagnosis.'),
  nextSteps: z
    .string()
    .describe('Recommended next steps, such as consulting a doctor or further testing.'),
});
export type AIDiagnosisOutput = z.infer<typeof AIDiagnosisOutputSchema>;

const searchMedicalDatabase = ai.defineTool({
  name: 'searchMedicalDatabase',
  description: 'Searches a medical database for information related to a given medical state.',
  inputSchema: z.object({
    query: z.string().describe('The search query to use for the medical database.'),
  }),
  outputSchema: z.string().describe('The information found in the medical database.'),
});

const aiDiagnosisPrompt = ai.definePrompt({
  name: 'aiDiagnosisPrompt',
  input: {
    schema: z.object({
      medicalState: z
        .string()
        .describe(
          'Detailed description of the current medical state, including symptoms, medical history, and any other relevant information.'
        ),
    }),
  },
  output: {
    schema: z.object({
      possibleDiagnosis: z
        .string()
        .describe('A possible diagnosis based on the provided medical state.'),
      confidenceLevel: z
        .number()
        .describe('A numerical value (0-1) indicating the confidence level of the diagnosis.'),
      nextSteps: z
        .string()
        .describe('Recommended next steps, such as consulting a doctor or further testing.'),
    }),
  },
  prompt: `Based on the following medical state: {{{medicalState}}}, provide a possible diagnosis, a confidence level (0-1), and recommended next steps. If the medical state is unclear or requires more information, use the searchMedicalDatabase tool to gather additional details. Be sure to include as much detail as possible in your output.

  Remember that you are not a real doctor, and this diagnosis should not be taken as medical advice. It is intended for informational purposes only. Always consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment.
  `,
  tools: [searchMedicalDatabase],
});

const aiDiagnosisFlow = ai.defineFlow<typeof AIDiagnosisInputSchema, typeof AIDiagnosisOutputSchema>(
  {
    name: 'aiDiagnosisFlow',
    inputSchema: AIDiagnosisInputSchema,
    outputSchema: AIDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await aiDiagnosisPrompt(input);
    return output!;
  }
);

export async function aiDiagnosis(input: AIDiagnosisInput): Promise<AIDiagnosisOutput> {
  return aiDiagnosisFlow(input);
}
