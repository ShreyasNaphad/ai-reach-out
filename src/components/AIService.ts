
import { pipeline } from "@huggingface/transformers";

// Import types from MessageForm
import type { MessageFormData, Field } from "./MessageForm";

// Cached model instance
let generatorModel: any = null;

// Setup function to load the model
async function setupModel() {
  if (generatorModel) return generatorModel;
  
  try {
    // For our text generation we'll use Flan-T5-Small which is lightweight but effective
    generatorModel = await pipeline(
      "text2text-generation",
      "google/flan-t5-small"
    );
    return generatorModel;
  } catch (error) {
    console.error("Failed to load model:", error);
    throw new Error("Failed to load AI model");
  }
}

// Function to generate a cold message
export async function generateColdMessage(data: MessageFormData) {
  try {
    const model = await setupModel();
    
    // Create a comprehensive, context-aware prompt
    let prompt = `Create a highly personalized and professional ${data.messageType} message for ${data.name}.

BACKGROUND INFORMATION:
- Name: ${data.name}
- Professional Field: ${data.field}
- Key Skills: ${data.skills.join(', ')}`;
    
    if (data.companyName) {
      prompt += `
- Company: ${data.companyName}`;
    }
    
    if (data.jobDescription && data.jobDescription.trim()) {
      prompt += `
- Role & Responsibilities: ${data.jobDescription.trim()}`;
    }

    prompt += `

INSTRUCTIONS:
- Use ALL the provided information to create a highly targeted message
- Reference specific skills and experience when relevant
- Make it sound natural and conversational, not templated
- Include specific details that show genuine interest
- Tailor the tone and content for ${data.messageType} context`;
    
    // Add specific instructions based on message type
    switch (data.messageType) {
      case 'linkedin':
        prompt += ' The message should be suitable for LinkedIn connection requests, concise and professional.';
        break;
      case 'email':
        prompt += ' The message should be formatted as an email introduction, slightly more formal.';
        break;
      case 'networking':
        prompt += ' The message should be appropriate for networking events, warm and engaging.';
        break;
      case 'collaboration':
        prompt += ' The message should focus on potential collaboration opportunities.';
        break;
    }
    
    prompt += ' Make it sound natural, personable, and avoid generic templates.';
    
    // Generate the response
    const result = await model(prompt, {
      max_length: 200,
      temperature: 0.7,
      top_p: 0.95,
    });
    
    // Clean up the generated text
    let message = result[0].generated_text as string;
    
    // Post-process the text to ensure it starts with an appropriate greeting
    if (!message.trim().toLowerCase().startsWith("hi") && 
        !message.trim().toLowerCase().startsWith("hello") && 
        !message.trim().toLowerCase().startsWith("greetings") &&
        !message.trim().toLowerCase().startsWith("dear")) {
      const greeting = data.messageType === 'email' ? 'Hello' : 'Hi';
      message = `${greeting}! ${message}`;
    }
    
    return message;
  } catch (error) {
    console.error("Error generating message:", error);
    throw new Error("Failed to generate message");
  }
}
