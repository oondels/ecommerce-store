// filepath: /home/oendel/Documentos/code/ecommerce-store/src/components/Unauthorized.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Button from './ui/Button';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <ShieldAlert 
            className="mx-auto h-16 w-16 text-red-500 dark:text-red-400" 
            strokeWidth={1.5} 
          />
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Acesso Restrito
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Você não tem permissão para acessar esta página.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-soft sm:rounded-xl sm:px-10">
          <div className="text-center">
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Esta área é restrita e requer permissões específicas. Se você acredita que deveria ter acesso, 
              entre em contato com o administrador do sistema.
            </p>
            
            <div className="mt-6 flex flex-col space-y-4">
              <Button 
                type="button"
                variant="primary" 
                size="lg" 
                fullWidth
                leftIcon={<ArrowLeft size={16} />}
                onClick={() => navigate('/')}
              >
                Voltar para Página Inicial
              </Button>
              
              <Button 
                type="button"
                variant="outline" 
                size="lg" 
                fullWidth
                onClick={() => navigate('/login')}
              >
                Fazer Login com Outra Conta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;