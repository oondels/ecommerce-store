import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Ban as Bank, Lock, Info } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

interface PaymentMethod {
  id: string;
  type: 'card' | 'pix' | 'bank_transfer';
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Cartão de Crédito/Débito',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Pague com seu cartão em até 12x',
  },
  {
    id: 'pix',
    type: 'pix',
    name: 'PIX',
    icon: <QrCode className="w-6 h-6" />,
    description: 'Pagamento instantâneo',
  },
  {
    id: 'bank_transfer',
    type: 'bank_transfer',
    name: 'Transferência Bancária',
    icon: <Bank className="w-6 h-6" />,
    description: 'Transferência entre contas',
  },
];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, tax, total } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [installments, setInstallments] = useState('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (selectedMethod === 'pix') {
        navigate('/payment');
      } else {
        navigate('/checkout/success');
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Payment</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
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
                          ? 'border-black bg-gray-50' 
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
                          ${selectedMethod === method.id ? 'border-black' : 'border-gray-300'}
                        `}>
                          {selectedMethod === method.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-black" />
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
                {selectedMethod === 'card' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black"
                          required
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="JOHN DOE"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          maxLength={5}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black"
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
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Installments
                      </label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black"
                      >
                        <option value="1">1x of {formatCurrency(total)}</option>
                        <option value="2">2x of {formatCurrency(total / 2)}</option>
                        <option value="3">3x of {formatCurrency(total / 3)}</option>
                        <option value="4">4x of {formatCurrency(total / 4)}</option>
                        <option value="5">5x of {formatCurrency(total / 5)}</option>
                        <option value="6">6x of {formatCurrency(total / 6)}</option>
                      </select>
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm">{error}</div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay ${formatCurrency(total)}`}
                    </Button>
                  </form>
                )}

                {/* PIX Payment */}
                {selectedMethod === 'pix' && (
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">
                      Click the button below to proceed to the PIX payment screen where you'll receive a QR code and payment instructions.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleSubmit}
                      isLoading={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Continue to PIX Payment'}
                    </Button>
                  </div>
                )}

                {/* Bank Transfer */}
                {selectedMethod === 'bank_transfer' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-medium text-gray-900 mb-4">
                        Bank Transfer Details
                      </h3>
                      <div className="space-y-3 text-sm">
                        <p><strong>Bank:</strong> 001 - Banco do Brasil</p>
                        <p><strong>Agency:</strong> 1234-5</p>
                        <p><strong>Account:</strong> 12345-6</p>
                        <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                        <p><strong>Amount:</strong> {formatCurrency(total)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      After making the transfer, please submit your receipt for validation
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => window.location.href = '/payment/upload'}
                    >
                      Submit Transfer Receipt
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
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Lock size={20} className="text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Secure Payment</p>
                    <p>Your information is protected</p>
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

export default Checkout;