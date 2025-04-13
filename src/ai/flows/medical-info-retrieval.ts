'use server';
/**
 * @fileOverview An AI agent for medical information retrieval.
 *
 * - medicalInfoRetrieval - A function that retrieves medical information based on user queries.
 * - MedicalInfoRetrievalInput - The input type for the medicalInfoRetrieval function.
 * - MedicalInfoRetrievalOutput - The return type for the medicalInfoRetrieval function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const MedicalInfoRetrievalInputSchema = z.object({
  query: z.string().describe('The medical question or information request from the user.'),
});
export type MedicalInfoRetrievalInput = z.infer<typeof MedicalInfoRetrievalInputSchema>;

const MedicalInfoRetrievalOutputSchema = z.object({
  answer: z.string().describe('The relevant medical information retrieved from trusted sources.'),
});
export type MedicalInfoRetrievalOutput = z.infer<typeof MedicalInfoRetrievalOutputSchema>;

export async function medicalInfoRetrieval(input: MedicalInfoRetrievalInput): Promise<MedicalInfoRetrievalOutput> {
  return medicalInfoRetrievalFlow(input);
}

const searchMedicalDatabase = ai.defineTool(
  {
    name: 'searchMedicalDatabase',
    description: 'Searches a medical database for relevant information based on the user query.',
    inputSchema: z.object({
      query: z.string().describe('The search query to use for the medical database.'),
    }),
    outputSchema: z.string(),
  },
  async input => {
    // Simulate searching a medical database and returning the result.
    // Replace with actual database search logic in a real application.
    const medicalInfo = `This is a simulated result for the query: ${input.query}.  Consult a doctor for real medical advice.`;
    return medicalInfo;
  }
);

const medicalInfoRetrievalPrompt = ai.definePrompt(
  {
    name: 'medicalInfoRetrievalPrompt',
    input: {
      schema: z.object({
        query: z.string().describe('The medical question or information request from the user.'),
      }),
    },
    output: {
      schema: z.object({
        answer: z.string().describe('The relevant medical information retrieved from trusted sources.'),
      }),
    },
    tools: [searchMedicalDatabase],
    prompt: `You are a medical information retrieval expert.  Based on the user's query, use the searchMedicalDatabase tool to find relevant information from trusted medical sources.  Answer the user's query using the information found from the tool, but always remind them to consult a doctor for real medical advice.

User Query: {{{query}}}
`,
  }
);

const medicalInfoRetrievalFlow = ai.defineFlow<
  typeof MedicalInfoRetrievalInputSchema,
  typeof MedicalInfoRetrievalOutputSchema
>(
  {
    name: 'medicalInfoRetrievalFlow',
    inputSchema: MedicalInfoRetrievalInputSchema,
    outputSchema: MedicalInfoRetrievalOutputSchema,
  },
  async input => {
    const {output} = await medicalInfoRetrievalPrompt(input);
    return output!;
  }
);
