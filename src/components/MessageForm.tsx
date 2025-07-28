
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
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="animate-slide-up border-0 shadow-card relative overflow-hidden" style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        <CardHeader className="pb-6 relative z-10">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            AI Message Generator
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-2">
            Create personalized professional messages with AI
          </p>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold text-foreground">Your Name *</Label>
              <Input 
                id="name" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="company" className="text-sm font-semibold text-foreground">Company Name</Label>
              <Input 
                id="company" 
                placeholder="Your current company (optional)" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-11 border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="field" className="text-sm font-semibold text-foreground">Professional Field *</Label>
              <Select value={field} onValueChange={(value) => setField(value as Field)}>
                <SelectTrigger id="field" className="h-11 border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="Select your field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.keys(skillsMap).map((fieldName) => (
                      <SelectItem key={fieldName} value={fieldName}>
                        {fieldName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="messageType" className="text-sm font-semibold text-foreground">Message Type</Label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger id="messageType" className="h-11 border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="Select message type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {messageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold text-foreground">Select 3 Skills *</Label>
              <Badge variant="outline" className="px-3 py-1 bg-muted/50 border-border/60">
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
                  className="w-full justify-between h-11 border-border/60 bg-background/50 backdrop-blur-sm hover:bg-accent/5 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                >
                  {selectedSkills.length > 0 
                    ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
                    : "Select your top skills..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search skills..." />
                  <CommandList>
                    <CommandEmpty>No skills found.</CommandEmpty>
                    <CommandGroup>
                      {availableSkills.map((skill) => (
                        <CommandItem
                          key={skill}
                          value={skill}
                          onSelect={() => handleSkillToggle(skill)}
                          disabled={selectedSkills.length >= 3 && !selectedSkills.includes(skill)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
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
              <div className="flex flex-wrap gap-2 mt-4 p-4 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/30">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs px-3 py-1.5 bg-secondary/70 hover:bg-secondary/90 transition-colors duration-200">
                    {skill}
                    <button
                      className="ml-2 hover:text-destructive transition-colors duration-200"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="jobDescription" className="text-sm font-semibold text-foreground">
              Job Description 
              <span className="text-primary/70 font-normal">(Optional - enhances AI personalization)</span>
            </Label>
            <Textarea 
              id="jobDescription" 
              placeholder="Describe your current role, responsibilities, or the type of work you do. This helps the AI create more targeted and relevant messages..." 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-24 border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
              rows={3}
            />
          </div>
          
          <Button 
            className="w-full h-14 text-lg font-semibold relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02]" 
            onClick={handleGenerateClick}
            disabled={!isFormValid || isGenerating}
            style={{ 
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isGenerating ? (
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                <span>Creating your message...</span>
              </div>
            ) : (
              <span className="relative z-10">✨ Generate AI Message</span>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageForm;
