import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  ArrowUpDown, 
  EyeIcon, 
  X, 
  Check,
  Save,
  Upload
} from 'lucide-react';
import { products, categories } from '../data/mockData';
import { Product } from '../types';

// Interface para o formulário de produto
interface ProductFormData {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  shortDescription: string;
  category: string;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  images: string[];
}

const emptyProductForm: ProductFormData = {
  id: '',
  name: '',
  price: 0,
  discountPrice: undefined,
  description: '',
  shortDescription: '',
  category: '',
  stock: 0,
  isNew: false,
  isFeatured: false,
  isTrending: false,
  images: ['https://placehold.co/600x400?text=Adicionar+Imagem']
};

const AdminProducts = () => {
  // Estados para gerenciar a lista de produtos
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<'name' | 'price' | 'stock' | 'category'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Estados para gerenciar o modal de edição/adição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductFormData>(emptyProductForm);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  
  // Estado para confirmação de exclusão
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Carregar produtos
  useEffect(() => {
    setIsLoading(true);
    // Simula uma chamada de API
    setTimeout(() => {
      setProductsList(products);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filtrar e ordenar produtos
  useEffect(() => {
    let results = [...productsList];
    
    // Aplicar filtro de pesquisa
    if (searchQuery) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Aplicar filtro de categoria
    if (selectedCategory) {
      results = results.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Aplicar ordenação
    results.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'price') {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
      } else if (sortField === 'stock') {
        return sortDirection === 'asc' ? a.stock - b.stock : b.stock - a.stock;
      } else if (sortField === 'category') {
        return sortDirection === 'asc' 
          ? a.category.localeCompare(b.category) 
          : b.category.localeCompare(a.category);
      }
      return 0;
    });
    
    setFilteredProducts(results);
  }, [productsList, searchQuery, selectedCategory, sortField, sortDirection]);

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Manipuladores para ordenação
  const handleSort = (field: 'name' | 'price' | 'stock' | 'category') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Abrir modal para adicionar produto
  const handleAddProduct = () => {
    setCurrentProduct(emptyProductForm);
    setModalMode('add');
    setIsModalOpen(true);
  };

  // Abrir modal para editar produto
  const handleEditProduct = (product: Product) => {
    const formData: ProductFormData = {
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      description: product.description,
      shortDescription: product.shortDescription || '',
      category: product.category,
      stock: product.stock,
      isNew: product.isNew || false,
      isFeatured: product.isFeatured || false,
      isTrending: product.isTrending || false,
      images: product.images || []
    };
    
    setCurrentProduct(formData);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Manipulador para confirmar exclusão
  const handleDeleteConfirm = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  // Manipulador para excluir produto
  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    
    // Aqui você faria uma chamada para API para deletar o produto
    // Simulando a operação com o state local
    setProductsList(prev => prev.filter(product => product.id !== productToDelete));
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  // Manipulador para salvar produto (adicionar ou editar)
  const handleSaveProduct = () => {
    // Validação básica
    if (!currentProduct.name || currentProduct.price <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (modalMode === 'add') {
      // Gerar ID único para novo produto
      const newId = String(Math.max(...productsList.map(p => parseInt(p.id))) + 1);
      
      // Criar novo produto
      const newProduct: Product = {
        ...currentProduct,
        id: newId,
        createdAt: new Date().toISOString(),
        rating: 0,
        reviews: 0,
        tags: [],
      };
      
      // Adicionar à lista (simula uma chamada de API)
      setProductsList(prev => [...prev, newProduct]);
    } else {
      // Atualizar produto existente
      setProductsList(prev => 
        prev.map(product => 
          product.id === currentProduct.id ? {...product, ...currentProduct} : product
        )
      );
    }
    
    // Fechar modal
    setIsModalOpen(false);
  };

  // Manipulador para input de formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Para checkboxes
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCurrentProduct(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      // Para campos numéricos
      if (type === 'number') {
        setCurrentProduct(prev => ({
          ...prev,
          [name]: value === '' ? 0 : parseFloat(value)
        }));
      } else {
        // Para campos de texto
        setCurrentProduct(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };

  // Manipulador para adicionar imagem
  const handleAddImage = () => {
    setCurrentProduct(prev => ({
      ...prev,
      images: [...prev.images, 'https://placehold.co/600x400?text=Nova+Imagem']
    }));
  };

  // Manipulador para remover imagem
  const handleRemoveImage = (index: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Modal de Edição/Adição de Produto
  const ProductModal = () => {
    if (!isModalOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {modalMode === 'add' ? 'Adicionar Novo Produto' : 'Editar Produto'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Imagens do Produto */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagens do Produto
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentProduct.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={img} 
                        alt={`Imagem ${index + 1}`} 
                        className="h-32 w-full object-cover rounded-md border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="h-32 w-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
                  >
                    <Upload size={24} className="mr-2" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
              
              {/* Nome do Produto */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto*
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              {/* Preço e Desconto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$)*
                </label>
                <input
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço com Desconto (R$)
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={currentProduct.discountPrice || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  min="0"
                  step="0.01"
                />
              </div>
              
              {/* Categoria e Estoque */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria*
                </label>
                <select
                  name="category"
                  value={currentProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estoque*
                </label>
                <input
                  type="number"
                  name="stock"
                  value={currentProduct.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  min="0"
                  required
                />
              </div>
              
              {/* Descrição Curta */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição Curta*
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={currentProduct.shortDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              {/* Descrição Completa */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição Completa*
                </label>
                <textarea
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              {/* Flags */}
              <div className="md:col-span-2 flex flex-wrap gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isNew"
                    name="isNew"
                    checked={currentProduct.isNew}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="isNew" className="ml-2 text-sm text-gray-700">
                    Produto Novo
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={currentProduct.isFeatured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                    Produto em Destaque
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isTrending"
                    name="isTrending"
                    checked={currentProduct.isTrending}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="isTrending" className="ml-2 text-sm text-gray-700">
                    Produto em Tendência
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveProduct}
              className="px-4 py-2 bg-primary-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-700"
            >
              <Save size={16} className="inline mr-1" />
              Salvar Produto
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal de Confirmação de Exclusão
  const DeleteConfirmationModal = () => {
    if (!showDeleteConfirm) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar Exclusão</h3>
          <p className="text-sm text-gray-500 mb-6">
            Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDeleteProduct}
              className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Gerenciar Produtos</h1>
        <button
          onClick={handleAddProduct}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus size={16} className="mr-2" />
          Adicionar Produto
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">Todas as Categorias</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-2"></div>
            <p className="text-gray-500">Carregando produtos...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('name')}
                        className="group flex items-center space-x-1 focus:outline-none"
                      >
                        <span>Produto</span>
                        <ArrowUpDown size={14} className={`${sortField === 'name' ? 'text-primary-600' : 'text-gray-400'} group-hover:text-primary-600`} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('category')}
                        className="group flex items-center space-x-1 focus:outline-none"
                      >
                        <span>Categoria</span>
                        <ArrowUpDown size={14} className={`${sortField === 'category' ? 'text-primary-600' : 'text-gray-400'} group-hover:text-primary-600`} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('price')}
                        className="group flex items-center space-x-1 focus:outline-none"
                      >
                        <span>Preço</span>
                        <ArrowUpDown size={14} className={`${sortField === 'price' ? 'text-primary-600' : 'text-gray-400'} group-hover:text-primary-600`} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('stock')}
                        className="group flex items-center space-x-1 focus:outline-none"
                      >
                        <span>Estoque</span>
                        <ArrowUpDown size={14} className={`${sortField === 'stock' ? 'text-primary-600' : 'text-gray-400'} group-hover:text-primary-600`} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded-md object-cover"
                                src={product.images[0]} 
                                alt={product.name} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-[200px]">
                                {product.shortDescription}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.discountPrice ? (
                            <div>
                              <span className="text-sm font-medium text-gray-900">R${product.discountPrice.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                R${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-900">R${product.price.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock} unidades
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {product.isNew && (
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                Novo
                              </span>
                            )}
                            {product.isFeatured && (
                              <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                Destaque
                              </span>
                            )}
                            {product.isTrending && (
                              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                Tendência
                              </span>
                            )}
                            {product.stock === 0 && (
                              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                Esgotado
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className="text-primary-600 hover:text-primary-900 p-1"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteConfirm(product.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Excluir"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button
                              onClick={() => window.open(`/products/${product.id}`, '_blank')}
                              className="text-gray-600 hover:text-gray-900 p-1"
                              title="Visualizar"
                            >
                              <EyeIcon size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        Nenhum produto encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Paginação */}
            {filteredProducts.length > 0 && (
              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1 ? 'text-gray-300 bg-gray-50' : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === totalPages ? 'text-gray-300 bg-gray-50' : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Próximo
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> de <span className="font-medium">{filteredProducts.length}</span> resultados
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Paginação">
                      <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Anterior</span>
                        <ChevronLeft size={18} />
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = idx + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = idx + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + idx;
                        } else {
                          pageNumber = currentPage - 2 + idx;
                        }
                        
                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                              currentPage === pageNumber 
                                ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' 
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Próximo</span>
                        <ChevronRight size={18} />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Modais */}
      <ProductModal />
      <DeleteConfirmationModal />
    </div>
  );
};

export default AdminProducts;