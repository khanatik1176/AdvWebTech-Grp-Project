'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'

const url = window.location.pathname;
const parts = url.split('/');
const adminId = parts[3]; // Index 3 contains the admin ID (4 in this case)

const CreateDoctorForm = () => {
  const [formData, setFormData] = useState({
    doctorFullName: '',
    doctorEmail: '',
    doctorDateOfBirth: '',
    doctorAddress: '',
    doctorPhoneNumber: '',
    doctorNID: '',
    doctorBMDCNo: '',
    doctorSpeciality: '',
    doctorAvailableDay: '',
    doctorStartingTime: '',
    doctorEndingTime: '',
    doctorCommission: '',
    doctorFee: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const token = Cookies.get('token');
  const router = useRouter(); // Get the router instance

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:4000/admin/doctors', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccess('Doctor created successfully!');
      setError(null);
      setTimeout(() => {
        router.push(`/admin/${adminId}/doctors`);
      }, 2000);
    } catch (err: any) {
      setError(err.response.data.message);
      setSuccess('');
    }
  };

  return (
    <div className="form-container bg-gray-600 h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-5">Create Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="doctorFullName"
                value={formData.doctorFullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="doctorEmail"
                value={formData.doctorEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="doctorDateOfBirth"
                value={formData.doctorDateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="doctorAddress"
                value={formData.doctorAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="doctorPhoneNumber"
                value={formData.doctorPhoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">NID</label>
              <input
                type="text"
                name="doctorNID"
                value={formData.doctorNID}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">BMDC No</label>
              <input
                type="text"
                name="doctorBMDCNo"
                value={formData.doctorBMDCNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Speciality</label>
              <input
                type="text"
                name="doctorSpeciality"
                value={formData.doctorSpeciality}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Available Day</label>
              <input
                type="text"
                name="doctorAvailableDay"
                value={formData.doctorAvailableDay}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Starting Time</label>
              <input
                type="time"
                name="doctorStartingTime"
                value={formData.doctorStartingTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Ending Time</label>
              <input
                type="time"
                name="doctorEndingTime"
                value={formData.doctorEndingTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Commission (%)</label>
              <input
                type="number"
                step="0.01"
                name="doctorCommission"
                value={formData.doctorCommission}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fee ($)</label>
              <input
                type="number"
                step="0.01"
                name="doctorFee"
                value={formData.doctorFee}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Create Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDoctorForm;