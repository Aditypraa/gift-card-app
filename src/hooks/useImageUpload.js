// src/hooks/useImageUpload.js
import { useState } from 'react';

export const useImageUpload = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleImageUpload = (file) => {
    if (!file) {
      setError('Please select a file');
      return null;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return null;
    }

    const url = URL.createObjectURL(file);
    setImage(url);
    setError('');
    return url;
  };

  return { image, error, handleImageUpload };
};
