import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Image as ImageIcon } from 'lucide-react';
import Button from '../components/ui/Button';

interface CustomOrderForm {
  type: string;
  colors: string;
  measurements: string;
  deadline: string;
  notes: string;
}

const Crochet: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CustomOrderForm>({
    type: '',
    colors: '',
    measurements: '',
    deadline: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitação enviada com sucesso! Entraremos em contato em até 24 horas.');
    setShowForm(false);
    setFormData({
      type: '',
      colors: '',
      measurements: '',
      deadline: '',
      notes: ''
    });
  };

  const sampleProducts = [
    {
      id: 1,
      name: 'Blusa de Crochê Floral',
      image: 'https://images.pexels.com/photos/6814555/pexels-photo-6814555.jpeg',
      price: 'R$ 189,90'
    },
    {
      id: 2,
      name: 'Tapete Mandala',
      image: 'https://images.pexels.com/photos/6814562/pexels-photo-6814562.jpeg',
      price: 'R$ 149,90'
    },
    {
      id: 3,
      name: 'Bolsa de Crochê',
      image: 'https://images.pexels.com/photos/6814586/pexels-photo-6814586.jpeg',
      price: 'R$ 129,90'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Crochê Artesanal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra peças únicas feitas à mão com amor e dedicação. Cada item conta uma história e traz consigo o carinho do trabalho artesanal.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Peças Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.map(product => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{product.price}</p>
                  <Button variant="primary" fullWidth>
                    Comprar Agora
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Order Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Peça Personalizada
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Quer algo único e especial? Solicite uma peça personalizada e nossos artesãos criarão algo exclusivo para você.
            </p>
            
            {!showForm ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowForm(true)}
              >
                Solicitar Peça Personalizada
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="text-left space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Peça*
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Blusa, Tapete, Bolsa"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cores Desejadas*
                  </label>
                  <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Azul claro, Branco"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Medidas*
                  </label>
                  <input
                    type="text"
                    name="measurements"
                    value={formData.measurements}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: 40cm x 40cm, Tamanho M"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prazo Desejado
                  </label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Em 30 dias"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Observações Adicionais
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Detalhes adicionais sobre o seu pedido..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    rightIcon={<Send size={16} />}
                  >
                    Enviar Solicitação
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crochet;