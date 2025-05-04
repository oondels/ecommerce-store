import React, { useState } from 'react';
import Button from './Button';
import { Mail } from 'lucide-react';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
  title?: string;
  description?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  variant = 'light',
  title = 'Assine nossa newsletter',
  description = 'Receba as últimas novidades, promoções e inspirações de design diretamente em sua caixa de entrada.',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Por favor, informe seu e-mail');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, informe um e-mail válido');
      return;
    }

    // Simulating API call
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  const textColors = variant === 'light' 
    ? 'text-secondary-900' 
    : 'text-white';

  const descriptionColors = variant === 'light' 
    ? 'text-secondary-600' 
    : 'text-gray-300';

  const inputBgColor = variant === 'light' 
    ? 'bg-white' 
    : 'bg-secondary-800';

  const inputBorderColor = variant === 'light' 
    ? 'border-gray-300 focus:border-primary-500' 
    : 'border-secondary-600 focus:border-primary-400';

  return (
    <div className="w-full">
      {!isSubscribed ? (
        <>
          <div className="mb-4">
            <h3 className={`text-lg font-semibold ${textColors}`}>
              {title}
            </h3>
            <p className={`text-sm ${descriptionColors}`}>
              {description}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Mail 
                  size={18} 
                  className={variant === 'light' ? 'text-gray-400' : 'text-gray-500'} 
                />
              </div>
              <input
                type="email"
                placeholder="Seu endereço de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full py-2 pl-10 pr-3 rounded-md border ${inputBgColor} ${inputBorderColor} ${variant === 'light' ? 'placeholder-gray-400' : 'placeholder-gray-500'} focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
            </div>
            
            {error && (
              <p className="text-error-500 text-sm">{error}</p>
            )}
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
            >
              Assinar
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-success-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className={`text-lg font-semibold ${textColors}`}>
            Obrigado por assinar!
          </h3>
          <p className={`text-sm ${descriptionColors}`}>
            Você será o primeiro a saber sobre novos produtos e ofertas exclusivas.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;