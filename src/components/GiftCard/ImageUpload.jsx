import { ImagePlus } from 'lucide-react';
import { useState } from 'react';
import PropTypes from 'prop-types';

// src/components/GiftCard/ImageUpload.jsx
export const ImageUpload = ({ onUpload, error }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = onUpload(file);
    if (imageUrl) setPreview(imageUrl);
  };

  return (
    <div className='space-y-2'>
      <label className='block font-medium text-gray-700'>Upload Image</label>
      <div className='relative'>
        <input
          type='file'
          onChange={handleChange}
          accept='image/*'
          className='hidden'
          id='image-upload'
        />
        <label
          htmlFor='image-upload'
          className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors'
        >
          {preview ? (
            <img
              src={preview}
              alt='Preview'
              className='h-full object-contain'
            />
          ) : (
            <>
              <ImagePlus className='w-8 h-8 text-gray-400' />
              <span className='mt-2 text-sm text-gray-500'>
                Click to upload image
              </span>
            </>
          )}
        </label>
        {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
  error: PropTypes.string,
};
