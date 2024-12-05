import { useState } from 'react';
import { Gift } from 'lucide-react';
import { ImageUpload } from './components/GiftCard/ImageUpload';
import { TextForm } from './components/GiftCard/TextForm';
import { GiftCardPreview } from './components/GiftCard/GiftCardPreview';
import { useImageUpload } from './hooks/useImageUpload';

function App() {
  const [formData, setFormData] = useState({
    dear: '',
    message: '',
    from: '',
  });
  const [errors, setErrors] = useState({});
  const { image, error: imageError, handleImageUpload } = useImageUpload();

  const handleTextChange = ({ name, value, error }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4'>
      <div className='max-w-7xl mx-auto'>
        <header className='text-center mb-8'>
          <Gift className='w-8 h-8 text-purple-600 mx-auto mb-2' />
          <h1 className='text-3xl font-bold text-purple-600'>
            Gift Card Generator
          </h1>
        </header>

        <div className='grid md:grid-cols-2 gap-6'>
          <section className='bg-white p-6 rounded-lg shadow-lg space-y-6'>
            <ImageUpload onUpload={handleImageUpload} error={imageError} />
            <TextForm
              values={formData}
              errors={errors}
              onChange={handleTextChange}
            />
          </section>

          <section className='bg-white flex items-center justify-center p-4 rounded-lg shadow-lg'>
            <GiftCardPreview
              image={image}
              dear={formData.dear}
              message={formData.message}
              from={formData.from}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
