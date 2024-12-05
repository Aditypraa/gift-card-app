import { useState, useRef, useEffect } from 'react';
import { ImagePlus, Download, Gift } from 'lucide-react';
import html2canvas from 'html2canvas';

function App() {
  const [image, setImage] = useState(null);
  const [dear, setDear] = useState('');
  const [message, setMessage] = useState('');
  const [from, setFrom] = useState('');
  const [textScale, setTextScale] = useState(1);
  const giftCardRef = useRef(null);
  const textOverlayRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
    }
  };

  useEffect(() => {
    const adjustTextScale = () => {
      if (giftCardRef.current && textOverlayRef.current) {
        const cardWidth = giftCardRef.current.offsetWidth;
        const textWidth = textOverlayRef.current.scrollWidth;
        if (textWidth > cardWidth * 0.9) {
          setTextScale(Math.max((cardWidth * 0.9) / textWidth, 0.5));
        } else {
          setTextScale(1);
        }
      }
    };

    adjustTextScale();
  }, [dear, message, from, image]);

  const handleDownload = () => {
    const cardElement = giftCardRef.current;
    if (typeof html2canvas !== 'undefined') {
      html2canvas(cardElement, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'gift-card.png';
        link.click();
      });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 space-y-6'>
      <div className='flex items-center gap-2 mb-4'>
        <Gift className='w-8 h-8 text-purple-600' />
        <h1 className='text-3xl font-bold text-purple-600'>
          Gift Card Generator
        </h1>
      </div>

      <div className='w-full max-w-4xl flex flex-col md:flex-row gap-6'>
        <div className='flex-1 bg-white p-6 rounded-lg shadow-lg space-y-4'>
          <div className='relative group'>
            <input
              type='file'
              id='image'
              onChange={handleImageChange}
              accept='image/*'
              className='hidden'
            />
            <label
              htmlFor='image'
              className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors'
            >
              <ImagePlus className='w-8 h-8 text-gray-400' />
              <span className='mt-2 text-sm text-gray-500'>
                Click to upload image
              </span>
            </label>
          </div>

          <div>
            <label className='block mb-2 font-medium text-gray-700'>Dear</label>
            <input
              type='text'
              value={dear}
              onChange={(e) => setDear(e.target.value)}
              className='w-full p-2 border rounded-lg'
              placeholder="Enter recipient's name"
              maxLength={20}
            />
          </div>

          <div>
            <label className='block mb-2 font-medium text-gray-700'>
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full p-2 border rounded-lg'
              rows={3}
              placeholder='Write your message'
              maxLength={40}
            />
          </div>

          <div>
            <label className='block mb-2 font-medium text-gray-700'>From</label>
            <input
              type='text'
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className='w-full p-2 border rounded-lg'
              placeholder='Your name'
              maxLength={20}
            />
          </div>
        </div>

        <div className='flex-1 bg-white p-6 rounded-lg shadow-lg'>
          {image ? (
            <div
              ref={giftCardRef}
              className='relative rounded-lg overflow-hidden shadow-lg'
            >
              <img
                src={image}
                alt='Gift Card Preview'
                className='w-full h-auto object-contain rounded-lg'
              />
              <div
                ref={textOverlayRef}
                className='absolute top-1/2 left-1/2 w-[90%] text-center'
                style={{
                  transform: `translate(-50%, -50%) scale(${textScale})`,
                  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
                }}
              >
                <h2 className='text-xl font-serif mb-2'>{dear}</h2>
                <p className='text-lg mb-2 font-medium'>{message}</p>
                <h3 className='text-xl font-serif'>{from}</h3>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg'>
              <Gift className='w-12 h-12 text-gray-400 mb-2' />
              <p className='text-gray-500 text-center'>
                Upload an image to preview
              </p>
            </div>
          )}

          {image && (
            <button
              onClick={handleDownload}
              className='mt-4 w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700'
            >
              <Download className='w-5 h-5' />
              Download Gift Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
