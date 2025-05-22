import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, QrCode, Ban as Bank, Lock, Info, Copy, Shield, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Cartão de Crédito/Débito',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Pague com seu cartão em até 12x',
  },
  {
    id: 'pix',
    name: 'PIX',
    icon: <QrCode className="w-6 h-6" />,
    description: 'Pagamento instantâneo',
  },
  {
    id: 'bank_transfer',
    name: 'Transferência Bancária',
    icon: <Bank className="w-6 h-6" />,
    description: 'Transferência entre contas',
  },
];

const Payment: React.FC = () => {
  const { total } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [installments, setInstallments] = useState('1');
  const [pixCode] = useState('00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (selectedMethod === 'pix' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedMethod, timeLeft]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      alert('Código PIX copiado!');
    } catch (err) {
      console.error('Failed to copy PIX code:', err);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page
      window.location.href = '/payment/success';
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/cart" className="text-gray-600 hover:text-gray-900 flex items-center">
            <ChevronLeft size={16} className="mr-1" />
            Voltar para o Carrinho
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Methods */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">Pagamento</h1>
              </div>

              <div className="p-6">
                {/* Payment Method Selection */}
                <div className="space-y-4 mb-8">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`
                        flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all
                        ${selectedMethod === method.id 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${selectedMethod === method.id ? 'border-primary-500' : 'border-gray-300'}
                        `}>
                          {selectedMethod === method.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {method.icon}
                          <div>
                            <p className="font-medium text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Credit Card Form */}
                {selectedMethod === 'credit_card' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome no Cartão
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                        placeholder="NOME COMO ESTÁ NO CARTÃO"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Validade
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          maxLength={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                          placeholder="MM/AA"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                          <button
                            type="button"
                            className="ml-1 text-gray-400 hover:text-gray-500"
                            title="The 3 or 4 digit security code on your card"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          maxLength={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parcelas
                      </label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="1">À vista - {formatCurrency(total)}</option>
                        <option value="2">2x de {formatCurrency(total / 2)}</option>
                        <option value="3">3x de {formatCurrency(total / 3)}</option>
                        <option value="4">4x de {formatCurrency(total / 4)}</option>
                        <option value="5">5x de {formatCurrency(total / 5)}</option>
                        <option value="6">6x de {formatCurrency(total / 6)}</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isProcessing}
                    >
                      {isProcessing ? 'Processando...' : `Pagar ${formatCurrency(total)}`}
                    </Button>
                  </form>
                )}

                {/* PIX Payment */}
                {selectedMethod === 'pix' && (
                  <div className="text-center">
                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000"
                        alt="QR Code PIX"
                        className="w-48 h-48 mx-auto mb-4"
                      />
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-500">
                          Expira em {formatTime(timeLeft)}
                        </span>
                      </div>
                      <button
                        onClick={handleCopyPix}
                        className="flex items-center justify-center gap-2 w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <Copy size={16} />
                        <span>Copiar código PIX</span>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Abra o app do seu banco e escaneie o QR Code ou cole o código PIX
                    </p>
                  </div>
                )}

                {/* Bank Transfer */}
                {selectedMethod === 'bank_transfer' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-medium text-gray-900 mb-4">
                        Dados para Transferência
                      </h3>
                      <div className="space-y-3 text-sm">
                        <p><strong>Banco:</strong> 001 - Banco do Brasil</p>
                        <p><strong>Agência:</strong> 1234-5</p>
                        <p><strong>Conta:</strong> 12345-6</p>
                        <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                        <p><strong>Valor:</strong> {formatCurrency(total)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Após realizar a transferência, envie o comprovante para validação
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => window.location.href = '/payment/upload'}
                    >
                      Enviar Comprovante
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total * 0.9)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impostos</span>
                  <span>{formatCurrency(total * 0.1)}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield size={20} className="text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Pagamento Seguro</p>
                    <p>Suas informações estão protegidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;