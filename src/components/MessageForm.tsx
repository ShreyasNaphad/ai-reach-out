
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

// Skills mapping for different fields
const skillsMap = {
  "Web Development": ["React", "Node.js", "CSS", "HTML", "JavaScript", "Python", "Django", "Flask", "Git", "Webpack"],
  "Data Science": ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "R", "SQL", "Data Visualization", "Statistics", "Big Data"],
  "Marketing": ["SEO", "Content Creation", "Google Ads", "Social Media", "Email Marketing", "Branding", "Analytics", "Copywriting", "CRM", "Campaign Management"],
  "Design": ["Figma", "Adobe Creative Suite", "Sketch", "InVision", "Prototyping", "User Research", "UI/UX", "Design Systems", "Wireframing", "Visual Design"],
  "Product Management": ["Agile", "Scrum", "Product Strategy", "User Stories", "Roadmapping", "Analytics", "A/B Testing", "Stakeholder Management", "Market Research", "Feature Planning"]
};

// Message types
const messageTypes = [
  { value: "linkedin", label: "LinkedIn Connection" },
  { value: "email", label: "Email Introduction" },
  { value: "networking", label: "Networking Event" },
  { value: "collaboration", label: "Collaboration Proposal" }
];

export type Field = keyof typeof skillsMap;

export type MessageFormData = {
  name: string;
  field: Field;
  skills: string[];
  jobDescription?: string;
  companyName?: string;
  messageType: string;
};

type MessageFormProps = {
  onGenerateMessage: (data: MessageFormData) => void;
  isGenerating: boolean;
};

const MessageForm = ({ onGenerateMessage, isGenerating }: MessageFormProps) => {
  const [name, setName] = useState('');
  const [field, setField] = useState<Field | ''>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [messageType, setMessageType] = useState('linkedin');
  
  // Update available skills when field changes
  useEffect(() => {
    if (field && field in skillsMap) {
      setAvailableSkills(skillsMap[field as Field]);
      setSelectedSkills([]);
    } else {
      setAvailableSkills([]);
      setSelectedSkills([]);
    }
  }, [field]);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleGenerateClick = () => {
    if (name && field && selectedSkills.length === 3) {
      const formData: MessageFormData = {
        name,
        field: field as Field,
        skills: selectedSkills,
        jobDescription: jobDescription.trim() || undefined,
        companyName: companyName.trim() || undefined,
        messageType
      };
      onGenerateMessage(formData);
    }
  };

  const isFormValid = name.trim() !== '' && field !== '' && selectedSkills.length === 3;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{ background: 'var(--gradient-mesh)' }}></div>
      
      <Card className="animate-slide-up border-0 relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-gray-900/80" style={{ boxShadow: 'var(--shadow-elegant)' }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-accent/10 pointer-events-none animate-gradient-x"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary-glow/20 to-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-2xl animate-bounce-gentle"></div>
        
        <CardHeader className="pb-8 pt-10 relative z-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r from-primary to-accent shadow-lg animate-glow">
              <span className="text-2xl">✨</span>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              AI Message Generator
            </CardTitle>
            <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
              Create personalized professional messages with AI-powered intelligence
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 relative z-10 px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 group">
              <Label htmlFor="name" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                Your Name *
              </Label>
              <Input 
                id="name" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 border-0 bg-white/60 backdrop-blur-sm shadow-soft focus:shadow-primary/20 focus:bg-white/80 focus:ring-2 focus:ring-primary/30 transition-all duration-300 rounded-xl"
              />
            </div>
            
            <div className="space-y-4 group">
              <Label htmlFor="company" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-accent to-primary-glow rounded-full"></span>
                Company Name
              </Label>
              <Input 
                id="company" 
                placeholder="Your current company (optional)" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-12 border-0 bg-white/60 backdrop-blur-sm shadow-soft focus:shadow-primary/20 focus:bg-white/80 focus:ring-2 focus:ring-primary/30 transition-all duration-300 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 group">
              <Label htmlFor="field" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-primary-glow to-accent rounded-full"></span>
                Professional Field *
              </Label>
              <Select value={field} onValueChange={(value) => setField(value as Field)}>
                <SelectTrigger id="field" className="h-12 border-0 bg-white/60 backdrop-blur-sm shadow-soft focus:shadow-primary/20 focus:bg-white/80 focus:ring-2 focus:ring-primary/30 transition-all duration-300 rounded-xl">
                  <SelectValue placeholder="Select your field" />
                </SelectTrigger>
                <SelectContent className="border-0 shadow-elegant backdrop-blur-xl bg-white/95 rounded-xl">
                  <SelectGroup>
                    {Object.keys(skillsMap).map((fieldName) => (
                      <SelectItem key={fieldName} value={fieldName} className="rounded-lg focus:bg-primary/10">
                        {fieldName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 group">
              <Label htmlFor="messageType" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full"></span>
                Message Type
              </Label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger id="messageType" className="h-12 border-0 bg-white/60 backdrop-blur-sm shadow-soft focus:shadow-primary/20 focus:bg-white/80 focus:ring-2 focus:ring-primary/30 transition-all duration-300 rounded-xl">
                  <SelectValue placeholder="Select message type" />
                </SelectTrigger>
                <SelectContent className="border-0 shadow-elegant backdrop-blur-xl bg-white/95 rounded-xl">
                  <SelectGroup>
                    {messageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="rounded-lg focus:bg-primary/10">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-primary to-primary-glow rounded-full"></span>
                Select 3 Skills *
              </Label>
              <Badge variant="outline" className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-primary font-medium">
                {selectedSkills.length}/3 selected
              </Badge>
            </div>
            
            <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={skillsOpen}
                  disabled={!field}
                  className="w-full justify-between h-12 border-0 bg-white/60 backdrop-blur-sm shadow-soft focus:shadow-primary/20 focus:bg-white/80 focus:ring-2 focus:ring-primary/30 transition-all duration-300 rounded-xl"
                >
                  {selectedSkills.length > 0 
                    ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
                    : "Select your top skills..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 border-0 shadow-elegant backdrop-blur-xl bg-white/95 rounded-xl" align="start">
                <Command className="rounded-xl">
                  <CommandInput placeholder="Search skills..." className="border-0 focus:ring-0" />
                  <CommandList>
                    <CommandEmpty>No skills found.</CommandEmpty>
                    <CommandGroup>
                      {availableSkills.map((skill) => (
                        <CommandItem
                          key={skill}
                          value={skill}
                          onSelect={() => handleSkillToggle(skill)}
                          disabled={selectedSkills.length >= 3 && !selectedSkills.includes(skill)}
                          className="rounded-lg focus:bg-primary/10 aria-selected:bg-primary/10"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 text-primary",
                              selectedSkills.includes(skill) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {skill}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-3 p-6 bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-sm rounded-2xl border border-white/30 shadow-soft">
                {selectedSkills.map((skill) => (
                  <Badge 
                    key={skill} 
                    className="text-sm px-4 py-2 bg-gradient-to-r from-primary/90 to-accent/90 text-white hover:from-primary hover:to-accent transition-all duration-200 shadow-lg border-0 rounded-full"
                  >
                    {skill}
                    <button
                      className="ml-2 hover:text-white/70 transition-colors duration-200 text-lg font-bold"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="jobDescription" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-accent to-primary-glow rounded-full"></span>
              Job Description 
              <span className="text-primary/70 font-normal ml-2">(Optional - enhances AI personalization)</span>
            </Label>
            <Textarea 
              id="jobDescription" 
              placeholder="Describe your current role, responsibilities, or the type of work you do. This helps the AI create more targeted and relevant messages..." 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-32 border-0 bg-white/60 backdrop-blur-sm shadow-soft focus:shadow-primary/20 focus:bg-white/80 focus:ring-2 focus:ring-primary/30 transition-all duration-300 resize-none rounded-xl"
              rows={4}
            />
          </div>
          
          <div className="pt-4">
            <Button 
              className="w-full h-16 text-xl font-bold relative overflow-hidden group transition-all duration-500 hover:scale-[1.02] focus:scale-[1.02] border-0 rounded-2xl shadow-lg" 
              onClick={handleGenerateClick}
              disabled={!isFormValid || isGenerating}
              style={{ 
                background: 'var(--gradient-hero)',
                boxShadow: 'var(--shadow-elegant)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 animate-shimmer"></div>
              {isGenerating ? (
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-6 h-6 border-3 border-white/40 border-t-white rounded-full animate-spin"></div>
                  <span>Creating your perfect message...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 relative z-10">
                  <span className="text-2xl animate-bounce-gentle">✨</span>
                  <span>Generate AI Message</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageForm;
