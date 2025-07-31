import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';

const GalleryDisplay = () => {
  const [gallery, setGallery] = useState([]);

  const fetchGallery = async () => {
    const res = await API.get('/painter/gallery');
    setGallery(res.data);
  };

  const deleteImage = async (id) => {
    await API.delete(`/painter/gallery/${id}`);
    fetchGallery();
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div>
      {gallery.map((item) => (
        <div key={item._id}>
          <img src={`http://localhost:5000/${item.imageUrl}`} alt="gallery" width="100" />
          <p>{item.description}</p>
          <button onClick={() => deleteImage(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default GalleryDisplay;
