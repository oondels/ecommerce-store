import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={20} />}
              onClick={() => window.location.href = primaryCta.link}
              className="min-w-[200px]"
            >
              {primaryCta.text}
            </Button>
            
            {secondaryCta && (
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-white text-white hover:bg-white hover:text-black"
                onClick={() => window.location.href = secondaryCta.link}
              >
                {secondaryCta.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;