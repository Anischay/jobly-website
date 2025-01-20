'use client';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Get in Touch with Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">
              Have questions? Interested in partnerships? Drop us a line!
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Inquiry Type</label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <FaPhone size={24} style={{ color: '#2563eb', marginRight: '1rem' }} />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+91 XXXX-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaEnvelope size={24} style={{ color: '#2563eb', marginRight: '1rem' }} />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@jobly.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaMapMarkerAlt size={24} style={{ color: '#2563eb', marginRight: '1rem' }} />
                <div>
                  <h3 className="font-semibold">Office</h3>
                  <p className="text-gray-600">Your Office Address Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 