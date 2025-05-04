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
  overlayOpacity?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  overlayOpacity = 0.5,
}) => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-secondary-900"
          style={{ opacity: overlayOpacity }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              onClick={() => window.location.href = primaryCta.link}
            >
              {primaryCta.text}
            </Button>
            
            {secondaryCta && (
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-secondary-900"
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