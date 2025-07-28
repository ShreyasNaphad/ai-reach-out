
import { Sparkles, MessageSquare, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center text-center mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          AI Message Generator Pro
        </h1>
        <div className="p-2 rounded-full bg-primary/10">
          <Zap className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      <p className="text-muted-foreground max-w-3xl text-lg mb-4">
        Create personalized networking messages that make lasting impressions. Enhanced with job descriptions, 
        company details, and multiple message types for every professional scenario.
      </p>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          LinkedIn & Email Ready
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          AI-Powered
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          Multiple Message Types
        </Badge>
      </div>
    </header>
  );
};

export default Header;
