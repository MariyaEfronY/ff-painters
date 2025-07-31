import React, { useState } from 'react';
import API from '../api/axiosConfig';

const GalleryUploader = () => {
  const [data, setData] = useState({ image: null, description: '' });

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('galleryImage', data.image);
    formData.append('description', data.description);
    await API.post('/painter/gallery', formData);
    alert('Gallery image uploaded');
  };

  return (
    <div>
      <input type="file" onChange={(e) => setData({ ...data, image: e.target.files[0] })} />
      <input type="text" placeholder="Description" onChange={(e) => setData({ ...data, description: e.target.value })} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default GalleryUploader;
