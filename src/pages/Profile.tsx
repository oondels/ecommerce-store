import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Bell,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Camera,
  Save,
  X,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationsContext";
import { UserService } from "../services/UserService";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [expandedSection, setExpandedSection] = useState<string | null>("personal");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const formDataDto = {
    name: user?.name || "",
    email: "",
    phone: "",
    birth: "",
    username: "",
    cpf: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    emailNotifications: true,
    whatsappNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  }
  const [formData, setFormData] = useState(formDataDto);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  // Loads user data when the component mounts or when the user ID changes
  useEffect(() => {
    if (user?.id) {
      UserService.getUserById(user.id).then((userData) => {
        setFormData(userData);
      });
    }
  }, [user?.id]);

  const sections: Section[] = [
    { id: "personal", title: "Informações Pessoais", icon: <User size={20} /> },
    { id: "security", title: "Configurações de Segurança", icon: <Lock size={20} /> },
    { id: "address", title: "Endereço e Entrega", icon: <MapPin size={20} /> },
    { id: "notifications", title: "Notificações", icon: <Bell size={20} /> },
    { id: "orders", title: "Pedidos Recentes", icon: <ShoppingBag size={20} /> },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    addNotification({
      type: "success",
      title: "Perfil Atualizado",
      message: "Seu perfil foi atualizado com sucesso.",
      duration: 3000,
    });
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification({
        type: "error",
        title: "Erro de Senha",
        message: "As novas senhas não coincidem.",
        duration: 3000,
      });
      return;
    }
    // Handle password update logic here
    setShowPasswordModal(false);
    addNotification({
      type: "success",
      title: "Senha Atualizada",
      message: "Sua senha foi alterada com sucesso.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleSaveChanges}>
                    Salvar Alterações
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={user?.avatar || "https://via.placeholder.com/150"}
                    alt="Foto de perfil do usuário"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg">
                    <Camera size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">Membro desde {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>

          {/* Profile Sections */}
          {sections.map((section) => (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center space-x-3">
                  {section.icon}
                  <span className="font-medium text-gray-900 dark:text-white">{section.title}</span>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>

              {expandedSection === section.id && (
                <div className="px-6 pb-6">
                  {section.id === "personal" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nome Completo
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone|| ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Data de Aniversário
                          </label>
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birth || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nome de usuário
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CPF</label>
                          <input
                            type="text"
                            name="cpf"
                            value={formData.cpf || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "security" && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Gerencie sua senha e configurações de segurança da conta.
                      </p>
                      <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
                        Alterar Senha
                      </Button>
                    </div>
                  )}

                  {section.id === "address" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Endereço 1
                          </label>
                          <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1 || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Endereço 2
                          </label>
                          <input
                            type="text"
                            name="addressLine2"
                            value={formData.addressLine2 || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Código Postal (CEP)
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cidade
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city || ""}
                            onChange={handleInputChange }
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Estado
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            País
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country || ""}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "notifications" && (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={formData.emailNotifications || false}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Notificações por email</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="whatsappNotifications"
                            checked={formData.whatsappNotifications || false}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Notificações por WhatsApp</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="smsNotifications"
                            checked={formData.smsNotifications || false}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Notificações por SMS</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="marketingEmails"
                            checked={formData.marketingEmails || false}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Emails de Marketing</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {section.id === "orders" && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sem pedidos recentes.</p>
                      <Link to="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                        Comece a Comprar
                        {/* <ChevronRight size={16} className="ml-1" /> */}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha Atual</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nova Senha</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirme Nova Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Atualizar Senha
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
