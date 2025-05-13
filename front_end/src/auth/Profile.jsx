import React, { useState, useEffect } from 'react';
import { Save, Upload, AlertCircle, X, Edit } from 'lucide-react';

// Mock user data - replace with your actual data fetching logic
const mockUserData = {
  id: '123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  role: 'User',
  department: 'Engineering',
  avatarUrl: null,
  bio: 'Full-stack developer with 5 years of experience.'
};

const UserProfileManagement = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch user data
  useEffect(() => {
    // In a real app, replace with API call
    // Example: fetch('/api/user/profile').then(res => res.json()).then(data => setUserData(data));
    setUserData(mockUserData);
    setFormData(mockUserData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear errors for this field if any
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes('image/')) {
      setErrors({
        ...errors,
        avatar: 'Please upload an image file'
      });
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
    };
    reader.readAsDataURL(file);

    // In a real app, you would upload this file to your server/storage
    // Example:
    // const formData = new FormData();
    // formData.append('avatar', file);
    // fetch('/api/user/avatar', { method: 'POST', body: formData });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // In a real app, send form data to your API
    // Example: 
    // fetch('/api/user/profile', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    // .then(res => res.json())
    // .then(data => {
    //   setUserData(data);
    //   setNotification({ type: 'success', message: 'Profile updated successfully!' });
    // })
    // .catch(err => {
    //   setNotification({ type: 'error', message: 'Failed to update profile.' });
    // });

    // Mock successful update
    setUserData({
      ...formData,
      avatarUrl: previewImage || formData.avatarUrl
    });
    
    setNotification({ type: 'success', message: 'Profile updated successfully!' });
    setIsEditing(false);

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (!userData) {
    return <div className="flex justify-center items-center p-6">Loading profile...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-4 bg-white rounded-lg shadow">
      {notification && (
        <div className={`mb-4 p-3 rounded flex items-center justify-between ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <div className="flex items-center">
            {notification.type === 'success' ? <Save size={16} className="mr-2" /> : <AlertCircle size={16} className="mr-2" />}
            <span>{notification.message}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <Edit size={16} className="mr-2" />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              setFormData(userData);
              setPreviewImage(null);
              setErrors({});
            }}
            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            <X size={16} className="mr-2" />
            Cancel
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Avatar */}
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 mb-4">
              {(previewImage || userData.avatarUrl) ? (
                <img 
                  src={previewImage || userData.avatarUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-2xl font-bold">
                  {userData.firstName?.charAt(0)}{userData.lastName?.charAt(0)}
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="w-full">
                <label className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">
                  <Upload size={16} className="mr-2" />
                  Upload Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right column - Form */}
        <div className="w-full md:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.firstName 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'
                  } ${!isEditing ? 'bg-gray-100' : ''}`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.lastName 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'
                  } ${!isEditing ? 'bg-gray-100' : ''}`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'
                  } ${!isEditing ? 'bg-gray-100' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'
                  } ${!isEditing ? 'bg-gray-100' : ''}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 
                    border-gray-300 focus:ring-blue-200 ${!isEditing ? 'bg-gray-100' : ''}`}
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 
                    border-gray-300 focus:ring-blue-200 ${!isEditing ? 'bg-gray-100' : ''}`}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="4"
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 
                    border-gray-300 focus:ring-blue-200 ${!isEditing ? 'bg-gray-100' : ''}`}
                ></textarea>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileManagement;