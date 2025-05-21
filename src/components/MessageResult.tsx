
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface MessageResultProps {
  message: string;
  onReset: () => void;
}

const MessageResult = ({ message, onReset }: MessageResultProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setIsCopied(true);
      toast.success("Message copied to clipboard!");
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-slide-up">
      <CardContent className="pt-6 space-y-4">
        <div className="bg-muted p-4 rounded-md relative">
          <div className="absolute top-2 right-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCopyClick}
              className="h-8 w-8"
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="whitespace-pre-wrap pr-8">{message}</p>
        </div>
        <Button onClick={onReset} variant="outline" className="w-full">
          Generate Another Message
        </Button>
      </CardContent>
    </Card>
  );
};

export default MessageResult;
