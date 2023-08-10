export const validEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validPhone = (phone: string): boolean => {
  const phoneRegex = /^1\d{10}$/;
  return phoneRegex.test(phone);
};
