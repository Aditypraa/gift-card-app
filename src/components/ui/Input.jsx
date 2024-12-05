import PropTypes from 'prop-types';

export const Input = ({ label, error, ...props }) => (
  <div className='space-y-1'>
    <label className='block font-medium text-gray-700'>{label}</label>
    <input
      {...props}
      className={`w-full p-2 border rounded-lg outline-none focus:ring-2 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className='text-sm text-red-500'>{error}</p>}
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};
