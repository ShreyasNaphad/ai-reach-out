
import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import MessageForm from "@/components/MessageForm";
import MessageResult from "@/components/MessageResult";
import { generateColdMessage } from "@/components/AIService";
import { Card, CardContent } from "@/components/ui/card";

// Type definition for professional fields
type Field = "Web Development" | "Data Science" | "Marketing";

const Index = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);

  const handleGenerateMessage = async (name: string, field: Field, skills: string[]) => {
    setIsGenerating(true);
    
    try {
      // First try to generate with Hugging Face
      if (!fallbackMode) {
        try {
          const generatedMessage = await generateColdMessage(name, field, skills);
          setMessage(generatedMessage);
          setIsGenerating(false);
          return;
        } catch (error) {
          console.error("Error with Hugging Face model:", error);
          toast.error("AI model failed to load. Using fallback mode.");
          setFallbackMode(true);
        }
      }
      
      // If Hugging Face fails or fallback mode is active, use a template-based approach
      const fallbackMessage = generateFallbackMessage(name, field, skills);
      setMessage(fallbackMessage);
    } catch (error) {
      console.error("Error generating message:", error);
      toast.error("Failed to generate message. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Fallback function in case the AI model fails
  const generateFallbackMessage = (name: string, field: Field, skills: string[]) => {
    const intros = [
      `Hi there! I'm ${name}, a ${field.toLowerCase()} professional specializing in ${skills.join(", ")}.`,
      `Hello! My name is ${name} and I work in ${field} with expertise in ${skills.join(", ")}.`,
      `Greetings! I'm ${name}, and I've specialized my career in ${field} focusing on ${skills.join(", ")}.`
    ];
    
    const bodies = [
      `I've been following your work and I'm impressed with your contributions to the field.`,
      `I came across your profile and I'm really interested in the projects you've been working on.`,
      `Your experience in the industry caught my attention, and I believe we share similar professional interests.`
    ];
    
    const closings = [
      `I'd love to connect, share insights, and potentially explore collaboration opportunities in the future.`,
      `Would you be open to connecting? I'm always looking to expand my network with fellow professionals.`,
      `I'd appreciate the chance to exchange ideas and learn from each other's experiences.`
    ];
    
    const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    
    return `${getRandomItem(intros)} ${getRandomItem(bodies)} ${getRandomItem(closings)}`;
  };

  const handleReset = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <Header />
        
        <div className="w-full flex flex-col items-center justify-center">
          {message === null ? (
            <MessageForm 
              onGenerateMessage={handleGenerateMessage} 
              isGenerating={isGenerating} 
            />
          ) : (
            <MessageResult message={message} onReset={handleReset} />
          )}
          
          {isGenerating && (
            <Card className="w-full max-w-md mx-auto mt-6 border border-primary/30">
              <CardContent className="py-4 text-center">
                <p className="text-sm text-muted-foreground animate-pulse">
                  Creating your personalized message...
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© 2025 AI Cold Message Generator • Powered by Hugging Face Transformers</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
