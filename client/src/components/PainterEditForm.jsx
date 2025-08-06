import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
import axios from 'axios';
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

  // ✅ Fetch profile data on mount
  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const res = await axios.get('/api/painter/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('painterToken')}`,
          },
        });

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

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle checkbox toggle
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

  // ✅ Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // ✅ Basic validation
    if (!formData.phoneNumber || !formData.bio) {
      toast.error('❌ Phone number and bio are required.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await API.put('/painter/profile/update', formData);
      toast.success('✅ Profile updated successfully!');
      onProfileUpdated();

      if (onProfileUpdated) {
        onProfileUpdated(res.data.painter);
      }
    } catch (err) {
      console.error('❌ Error updating profile:', err);
      toast.error('❌ Error updating profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-form">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
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

      {/* ✅ Toast notification container */}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default PainterEditForm;
