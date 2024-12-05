export const validateText = (text, field) => {
  const maxLength = field === 'message' ? 40 : 20;

  if (!text.trim()) return `${field} cannot be empty`;
  if (text.length > maxLength) return `Maximum ${maxLength} characters allowed`;
  return '';
};
