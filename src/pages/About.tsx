import React from 'react';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Inovação e Excelência em Cada Detalhe
          </h1>

          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Desde 2015, a Loja tem se destacado no mercado brasileiro como referência em produtos inovadores e de alta qualidade. Nossa jornada começou com uma visão clara: transformar a experiência de compra online em algo extraordinário, combinando tecnologia de ponta com atendimento personalizado.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Nossa missão é proporcionar aos nossos clientes acesso às melhores marcas e produtos, sempre com preços justos e um serviço excepcional. Acreditamos que cada compra é uma oportunidade de superar expectativas, por isso investimos constantemente em tecnologia, logística avançada e capacitação de nossa equipe.
              </p>

              <p className="text-gray-600 leading-relaxed">
                O que nos diferencia é nosso compromisso inabalável com a satisfação do cliente. Oferecemos uma curadoria criteriosa de produtos, garantia estendida exclusiva e um time de especialistas sempre prontos para auxiliar em cada etapa da sua compra. Nossa política de devolução sem complicações e entrega expressa são apenas alguns dos benefícios que proporcionamos.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Olhando para o futuro, nossa visão é nos tornarmos a principal referência em e-commerce de produtos premium no Brasil. Continuaremos expandindo nosso catálogo, investindo em inovação e fortalecendo nossos laços com a comunidade, sempre mantendo nosso compromisso com a sustentabilidade e responsabilidade social.
              </p>
            </div>

            <div className="flex justify-center pt-8">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
                onClick={() => window.location.href = '/products'}
              >
                Conheça Nossos Produtos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;