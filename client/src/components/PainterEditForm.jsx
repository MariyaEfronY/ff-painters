import React, { useEffect, useState } from 'react';
import API from '../utils/axios'; // Your configured axios instance
import axios from 'axios';        // Optional, used in fetchPainter

const PainterEditForm = ({ painterId }) => {
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
  const [message, setMessage] = useState('');
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
  setMessage('');
  try {
    const res = await API.put('/painter/profile/update', formData);
    setMessage('✅ Profile updated successfully!');
    console.log('✅ Update response:', res.data);
  } catch (err) {
    console.error('❌ Error updating profile:', err);
    setMessage('❌ Error updating profile.');
  } finally {
    setSubmitting(false);
  }
};


  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-form">
      <h2>Edit Your Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone Number</label>
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

        <label>Work Experience</label>
        <input name="workExperience" value={formData.workExperience} onChange={handleChange} />

        <label>City</label>
        <input name="city" value={formData.city} onChange={handleChange} />

        <label>Bio</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>

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
    </div>
  );
};

export default PainterEditForm;
