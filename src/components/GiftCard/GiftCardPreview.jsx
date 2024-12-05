import html2canvas from 'html2canvas';
import { Download, Gift } from 'lucide-react';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui/Button';
import { useTextScale } from '../../hooks/useTextScale';

export const GiftCardPreview = ({ image, dear, message, from }) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const textScale = useTextScale(textRef, [dear, message, from]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'gift-card.png';
    document.body.appendChild(link); // Append the link to the document body
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Remove the link from the document body
  };

  return (
    <div className='space-y-4'>
      <div
        ref={cardRef}
        className='relative aspect-[4/3] bg-white rounded-lg shadow-lg overflow-hidden'
      >
        {image ? (
          <img
            src={image}
            alt='Gift Card'
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='flex items-center justify-center h-full bg-gray-100'>
            <Gift className='w-12 h-full text-gray-400' />
          </div>
        )}

        <div
          ref={textRef}
          className='absolute inset-0 flex flex-col justify-center items-center p-6'
          style={{ transform: `scale(${textScale})` }}
        >
          <h2 className='font-serif text-xl mb-6'>{dear}</h2>
          <p className='font-serif text-xl mb-6'>{message}</p>
          <h3 className='font-serif text-xl'>{from}</h3>
        </div>
      </div>

      {image && dear && message && from && (
        <>
          <div className='flex justify-center items-center'>
            <Button
              onClick={handleDownload}
              icon={<Download className='w-5 h-5' />}
            >
              Download Gift Card
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

GiftCardPreview.propTypes = {
  image: PropTypes.string,
  dear: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
};
