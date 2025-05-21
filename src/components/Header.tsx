
import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6 flex flex-col items-center justify-center text-center mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          AI Cold Message Generator
        </h1>
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Generate personalized networking messages that make great first impressions. Just provide your details and let AI craft the perfect introduction.
      </p>
    </header>
  );
};

export default Header;
