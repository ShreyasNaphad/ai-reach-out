
import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import MessageForm, { type MessageFormData } from "@/components/MessageForm";
import MessageResult from "@/components/MessageResult";
import { generateColdMessage } from "@/components/AIService";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);

  const handleGenerateMessage = async (data: MessageFormData) => {
    setIsGenerating(true);
    
    try {
      // First try to generate with Hugging Face
      if (!fallbackMode) {
        try {
          const generatedMessage = await generateColdMessage(data);
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
      const fallbackMessage = generateFallbackMessage(data);
      setMessage(fallbackMessage);
    } catch (error) {
      console.error("Error generating message:", error);
      toast.error("Failed to generate message. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Fallback function in case the AI model fails
  const generateFallbackMessage = (data: MessageFormData) => {
    const { name, field, skills, companyName, jobDescription, messageType } = data;
    
    const companyInfo = companyName ? ` at ${companyName}` : '';
    const roleInfo = jobDescription ? ` focusing on ${jobDescription.substring(0, 50)}...` : '';
    
    const intros = [
      `Hi there! I'm ${name}, a ${field.toLowerCase()} professional${companyInfo} specializing in ${skills.join(", ")}.`,
      `Hello! My name is ${name} and I work in ${field}${companyInfo} with expertise in ${skills.join(", ")}.`,
      `Greetings! I'm ${name}, and I've specialized my career in ${field}${roleInfo} focusing on ${skills.join(", ")}.`
    ];
    
    const bodies = messageType === 'collaboration' 
      ? [
          `I've been following your work and I'm impressed with your contributions. I believe there might be some interesting collaboration opportunities between us.`,
          `I came across your profile and I'm really interested in the projects you've been working on. I think our skills could complement each other well.`,
          `Your experience in the industry caught my attention, and I believe we could create something impactful together.`
        ]
      : [
          `I've been following your work and I'm impressed with your contributions to the field.`,
          `I came across your profile and I'm really interested in the projects you've been working on.`,
          `Your experience in the industry caught my attention, and I believe we share similar professional interests.`
        ];
    
    const closings = messageType === 'email'
      ? [
          `I would love to connect and discuss potential opportunities. Please let me know if you'd be interested in a brief conversation.`,
          `I'd appreciate the opportunity to learn more about your work and share insights from my experience.`,
          `Would you be available for a brief call to explore how we might be able to help each other?`
        ]
      : [
          `I'd love to connect, share insights, and potentially explore opportunities in the future.`,
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
