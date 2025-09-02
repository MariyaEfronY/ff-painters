import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const UploadProfileImage = ({ painterId, existingImageUrl, onImageUpdated }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(existingImageUrl || '');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // live preview
    }
  };

  const upload = async () => {
    if (!image) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', image);

    try {
      const res = await API.post(`/painter/upload-profile-image/${painterId}`, formData);
      alert('Profile image uploaded successfully!');
      onImageUpdated(res.data.profileImage); // callback to update dashboard
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      alert('Failed to upload image.');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <div style={{ marginTop: '10px' }}>
          <img src={preview} alt="Preview" style={{ width: '150px', borderRadius: '8px' }} />
        </div>
      )}
      <button onClick={upload} style={{ marginTop: '10px' }}>Upload New Profile Image</button>
    </div>
  );
};

export default UploadProfileImage;
