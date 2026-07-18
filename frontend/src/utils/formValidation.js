export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isRequired(value) {
  return value.trim().length > 0;
}

export function getFieldError(value, { required = false, email = false } = {}) {
  if (required && !isRequired(value)) {
    return "This field is required.";
  }

  if (email && isRequired(value) && !isValidEmail(value)) {
    return "Enter a valid email address.";
  }

  return "";
}
