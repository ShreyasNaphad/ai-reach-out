
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
      <Card className="shadow-lg animate-fade-in bg-gradient-to-br from-background to-muted/20 border-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Professional Message Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">Your Name *</Label>
              <Input 
                id="name" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-semibold">Company Name</Label>
              <Input 
                id="company" 
                placeholder="Your current company (optional)" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="field" className="text-sm font-semibold">Professional Field *</Label>
              <Select value={field} onValueChange={(value) => setField(value as Field)}>
                <SelectTrigger id="field" className="focus:ring-2 focus:ring-primary/20">
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

            <div className="space-y-2">
              <Label htmlFor="messageType" className="text-sm font-semibold">Message Type</Label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger id="messageType" className="focus:ring-2 focus:ring-primary/20">
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
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold">Select 3 Skills *</Label>
              <Badge variant="outline" className="px-2 py-1">
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
                  className="w-full justify-between h-auto min-h-10 focus:ring-2 focus:ring-primary/20"
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
              <div className="flex flex-wrap gap-2 mt-3 p-3 bg-muted/30 rounded-lg">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs px-3 py-1 hover:bg-secondary/80">
                    {skill}
                    <button
                      className="ml-2 hover:text-destructive transition-colors"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription" className="text-sm font-semibold">Job Description</Label>
            <Textarea 
              id="jobDescription" 
              placeholder="Describe your current role or the type of work you do (optional - helps create more targeted messages)" 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-20 focus:ring-2 focus:ring-primary/20"
              rows={3}
            />
          </div>
          
          <Button 
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl" 
            onClick={handleGenerateClick}
            disabled={!isFormValid || isGenerating}
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Generating...
              </div>
            ) : (
              'Generate Professional Message'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageForm;
