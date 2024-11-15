import { PublicLayout } from '@/layouts';
import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = { name: '', email: '', phoneNumber: '' };
    let isValid = true;

    // Name validation
    if (!formData.name) {
      formErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      formErrors.email = 'Enter a valid email';
      isValid = false;
    }

    // Phone number validation
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phoneNumber) {
      formErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!phonePattern.test(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Enter a valid phone number (10 digits)';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (e.g., send data to the server)
      console.log('Form submitted successfully', formData);
      // Clear the form
      setFormData({ name: '', email: '', phoneNumber: '' });
    }
  };

  return (
   <PublicLayout>
     <div className="max-w-md mx-auto mt-10 p-6 border border-primary rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center font-[poppins]">User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border rounded"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border rounded"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-4 border rounded"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div></PublicLayout>
  );
};

export default UserForm;
