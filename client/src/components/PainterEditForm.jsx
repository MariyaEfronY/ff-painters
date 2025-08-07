import React, { useEffect, useState } from 'react';

import axios from 'axios';

import API from '../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PainterEditForm = ({ painterId, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    workExperience: '',
    city: '',
    bio: '',
    specification: [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const specOptions = ['interior', 'exterior'];

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const res = await API.get('/painter/profile');
        const data = res.data;
        setFormData({
          name: data.name || '',
          phoneNumber: data.phoneNumber || '',
          workExperience: data.workExperience || '',
          city: data.city || '',
          bio: data.bio || '',
          specification: data.specification || [],
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        toast.error('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPainter();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let specs = [...prev.specification];
      if (checked) {
        specs.push(value);
      } else {
        specs = specs.filter((s) => s !== value);
      }
      return { ...prev, specification: specs };
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const token = localStorage.getItem('painterToken');
    const submitData = new FormData();

    submitData.append('name', formData.name);
    submitData.append('phoneNumber', formData.phoneNumber);
    submitData.append('workExperience', formData.workExperience);
    submitData.append('city', formData.city);
    submitData.append('bio', formData.bio);
    formData.specification.forEach((spec) => {
      submitData.append('specification[]', spec);
    });
    if (formData.profileImage) {
      submitData.append('profileImage', formData.profileImage);
    }

   const response = await axios.put(
  'http://localhost:5000/api/painter/profile', // ✅ Correct URL (no :id)
  submitData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }
);


    toast.success('Profile updated successfully!');
    onProfileUpdated(); // notify parent to refresh data
  } catch (error) {
    console.error('Update failed:', error);
    toast.error('Update failed. Check console for details.');
  } finally {
    setSubmitting(false);
  }
};






  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-form">
      <form onSubmit={handleSubmit}>
        <label>Profile Image</label>
        <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }))
  }
/>


        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone Number *</label>
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

        <label>Work Experience</label>
        <input name="workExperience" value={formData.workExperience} onChange={handleChange} />

        <label>City</label>
        <input name="city" value={formData.city} onChange={handleChange} />

        <label>Bio *</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} required></textarea>

        <label>Specification</label>
        <div>
          {specOptions.map((spec) => (
            <label key={spec} style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                value={spec}
                checked={formData.specification.includes(spec)}
                onChange={handleCheckbox}
              />
              {spec}
            </label>
          ))}
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default PainterEditForm;
