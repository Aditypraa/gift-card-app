import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { validateText } from '../../utils/validation.js';
import PropTypes from 'prop-types';

// src/components/GiftCard/TextForm.jsx
export const TextForm = ({ values, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      name,
      value,
      error: validateText(value, name),
    });
  };

  return (
    <div className='space-y-4'>
      <Input
        label='Dear'
        name='dear'
        value={values.dear}
        error={errors.dear}
        onChange={handleChange}
        maxLength={20}
      />

      <TextArea
        label='Message'
        name='message'
        value={values.message}
        error={errors.message}
        onChange={handleChange}
        maxLength={40}
        rows={3}
      />

      <Input
        label='From'
        name='from'
        value={values.from}
        error={errors.from}
        onChange={handleChange}
        maxLength={20}
      />
    </div>
  );
};

TextForm.propTypes = {
  values: PropTypes.shape({
    dear: PropTypes.string,
    message: PropTypes.string,
    from: PropTypes.string,
  }),
  onChange: PropTypes.func,
  errors: PropTypes.shape({
    dear: PropTypes.string,
    message: PropTypes.string,
    from: PropTypes.string,
  }),
};
