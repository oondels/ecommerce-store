import React, { useState, useEffect } from 'react';
import { staffService } from '../data/staffService';
import { StaffMember } from '../data/staffData';

const Staff = () => {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: '',
    age: 0,
    email: '',
    phone: '',
    role: 'Employee',
    department: '',
    joinDate: '',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  });

  useEffect(() => {
    loadStaffData();
  }, []);

  const loadStaffData = () => {
    const data = staffService.getAllStaff();
    setStaffList(data);
  };

  const handleEditClick = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setFormData(staff);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setSelectedStaff(null);
    setFormData({
      name: '',
      age: 0,
      email: '',
      phone: '',
      role: 'Employee',
      department: '',
      joinDate: new Date().toISOString().split('T')[0],
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    });
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      staffService.deleteStaff(id);
      loadStaffData();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && selectedStaff) {
      staffService.updateStaff(selectedStaff.id, formData);
    } else if (isAdding) {
      staffService.addStaff(formData as Omit<StaffMember, 'id'>);
    }
    
    loadStaffData();
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Staff Management</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Staff
        </button>
      </div>

      {(isEditing || isAdding) && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium mb-4">
            {isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role & Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffList.map((staff) => (
              <tr key={staff.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={staff.avatar}
                        alt={staff.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                      <div className="text-sm text-gray-500">{staff.age} years old</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    staff.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {staff.role}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">{staff.department}</div>
                  <div className="text-xs text-gray-400">Joined: {staff.joinDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{staff.email}</div>
                  <div>{staff.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditClick(staff)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(staff.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;