import PropTypes from 'prop-types';

export const Button = ({ children, icon, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
      props.className || 'bg-purple-600 text-white hover:bg-purple-700'
    }`}
  >
    {icon}
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  className: PropTypes.string,
};
