import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Settings, Eye, EyeOff, Edit2, Save, X } from 'lucide-react';
import Button from '../components/ui/Button';

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [storeData, setStoreData] = useState({
    name: 'My Store Name',
    description: 'A premium retail store offering quality products and exceptional service.',
    email: 'contact@mystore.com',
    phone: '(555) 123-4567',
    address: '123 Store Street, City, State 12345',
    logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=150',
    isPublic: true,
    offersDelivery: true,
    isFeatured: false,
  });

  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([
    { day: 'Monday', open: '09:00', close: '18:00', closed: false },
    { day: 'Tuesday', open: '09:00', close: '18:00', closed: false },
    { day: 'Wednesday', open: '09:00', close: '18:00', closed: false },
    { day: 'Thursday', open: '09:00', close: '18:00', closed: false },
    { day: 'Friday', open: '09:00', close: '18:00', closed: false },
    { day: 'Saturday', open: '10:00', close: '16:00', closed: false },
    { day: 'Sunday', open: '00:00', close: '00:00', closed: true },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (name: string) => {
    setStoreData(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev]
    }));
  };

  const handleHoursChange = (index: number, field: keyof BusinessHours, value: string | boolean) => {
    const newHours = [...businessHours];
    newHours[index] = {
      ...newHours[index],
      [field]: value
    };
    setBusinessHours(newHours);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Store Profile</h1>
              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="md"
                    leftIcon={<Edit2 size={16} />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="md"
                      leftIcon={<X size={16} />}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      leftIcon={<Save size={16} />}
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Store Logo */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={storeData.logo}
                    alt="Store Logo"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={storeData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={storeData.description}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="flex items-center">
                  <Mail size={16} className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={storeData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    name="phone"
                    value={storeData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="address"
                    value={storeData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Business Hours</h2>
              <Clock size={20} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {businessHours.map((hours, index) => (
                <div key={hours.day} className="flex items-center gap-4">
                  <div className="w-32">
                    <span className="text-sm font-medium text-gray-700">{hours.day}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => handleHoursChange(index, 'open', e.target.value)}
                      disabled={!isEditing || hours.closed}
                      className="px-2 py-1 border border-gray-300 rounded-md disabled:bg-gray-50"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleHoursChange(index, 'close', e.target.value)}
                      disabled={!isEditing || hours.closed}
                      className="px-2 py-1 border border-gray-300 rounded-md disabled:bg-gray-50"
                    />
                    {isEditing && (
                      <label className="flex items-center gap-2 ml-4">
                        <input
                          type="checkbox"
                          checked={hours.closed}
                          onChange={(e) => handleHoursChange(index, 'closed', e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-600">Closed</span>
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Store Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Store Settings</h2>
              <Settings size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Public Profile</h3>
                  <p className="text-sm text-gray-500">Make your store visible to customers</p>
                </div>
                <button
                  onClick={() => isEditing && handleToggleChange('isPublic')}
                  disabled={!isEditing}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    storeData.isPublic ? 'bg-primary-600' : 'bg-gray-200'
                  } ${!isEditing && 'cursor-not-allowed opacity-50'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    storeData.isPublic ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Delivery Service</h3>
                  <p className="text-sm text-gray-500">Offer delivery to your customers</p>
                </div>
                <button
                  onClick={() => isEditing && handleToggleChange('offersDelivery')}
                  disabled={!isEditing}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    storeData.offersDelivery ? 'bg-primary-600' : 'bg-gray-200'
                  } ${!isEditing && 'cursor-not-allowed opacity-50'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    storeData.offersDelivery ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Featured Store</h3>
                  <p className="text-sm text-gray-500">Display your store in featured listings</p>
                </div>
                <button
                  onClick={() => isEditing && handleToggleChange('isFeatured')}
                  disabled={!isEditing}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    storeData.isFeatured ? 'bg-primary-600' : 'bg-gray-200'
                  } ${!isEditing && 'cursor-not-allowed opacity-50'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    storeData.isFeatured ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowPasswordModal(true)}
                  className="text-gray-700"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    // Handle password change
                    setShowPasswordModal(false);
                  }}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;