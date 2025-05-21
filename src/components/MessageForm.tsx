
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  "Marketing": ["SEO", "Content Creation", "Google Ads", "Social Media", "Email Marketing", "Branding", "Analytics", "Copywriting", "CRM", "Campaign Management"]
};

type Field = keyof typeof skillsMap;

type MessageFormProps = {
  onGenerateMessage: (name: string, field: Field, skills: string[]) => void;
  isGenerating: boolean;
};

const MessageForm = ({ onGenerateMessage, isGenerating }: MessageFormProps) => {
  const [name, setName] = useState('');
  const [field, setField] = useState<Field | ''>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [skillsOpen, setSkillsOpen] = useState(false);
  
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
      onGenerateMessage(name, field as Field, selectedSkills);
    }
  };

  const isFormValid = name.trim() !== '' && field !== '' && selectedSkills.length === 3;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field">Professional Field</Label>
            <Select value={field} onValueChange={(value) => setField(value as Field)}>
              <SelectTrigger id="field">
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
            <div className="flex justify-between">
              <Label>Select 3 Skills</Label>
              <span className="text-xs text-muted-foreground">{selectedSkills.length}/3 selected</span>
            </div>
            
            <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={skillsOpen}
                  disabled={!field}
                  className="w-full justify-between"
                >
                  {selectedSkills.length > 0 
                    ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
                    : "Select skills..."}
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
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                    <button
                      className="ml-1 rounded-full text-xs"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <Button 
            className="w-full mt-6" 
            onClick={handleGenerateClick}
            disabled={!isFormValid || isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Message'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageForm;
