import { useState } from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { languages, Language } from '@/lib/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  className = "" 
}: LanguageSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 touch-target ${className}`}
        >
          <Languages className="h-4 w-4" />
          <span className="font-medium">
            {languages[currentLanguage].nativeName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => onLanguageChange(code as Language)}
            className={`text-base touch-target ${
              currentLanguage === code ? 'bg-accent' : ''
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-sm text-muted-foreground">{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}