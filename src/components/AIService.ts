
import { pipeline } from "@huggingface/transformers";

// Define types for the fields
type Field = "Web Development" | "Data Science" | "Marketing";

// Cached model instance
let generatorModel: any = null;

// Setup function to load the model
async function setupModel() {
  if (generatorModel) return generatorModel;
  
  try {
    // For our text generation we'll use Flan-T5-Small which is lightweight but effective
    generatorModel = await pipeline(
      "text2text-generation",
      "google/flan-t5-small",
      { max_new_tokens: 200 }
    );
    return generatorModel;
  } catch (error) {
    console.error("Failed to load model:", error);
    throw new Error("Failed to load AI model");
  }
}

// Function to generate a cold message
export async function generateColdMessage(name: string, field: Field, skills: string[]) {
  try {
    const model = await setupModel();
    
    // Create a prompt that instructs the model what to generate
    const prompt = `Generate a professional and friendly cold networking message for someone named ${name} 
    who works in ${field} with skills in ${skills.join(', ')}. The message should be concise, 
    engaging, and highlight their expertise without sounding generic or using templates. Make it 
    sound natural and personable.`;
    
    // Generate the response
    const result = await model(prompt, {
      temperature: 0.7, // Add some randomness for creativity
      top_p: 0.95, // Nucleus sampling for diverse outputs
    });
    
    // Clean up the generated text
    let message = result[0].generated_text as string;
    
    // Post-process the text to ensure it starts with "Hi" or another greeting
    if (!message.trim().toLowerCase().startsWith("hi") && 
        !message.trim().toLowerCase().startsWith("hello") && 
        !message.trim().toLowerCase().startsWith("greetings")) {
      message = `Hi! ${message}`;
    }
    
    return message;
  } catch (error) {
    console.error("Error generating message:", error);
    throw new Error("Failed to generate message");
  }
}
