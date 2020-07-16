export const validateEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validatePassword = (password) => {
  /*
  To check a password between 8 to 15 characters
   which contain at least one lowercase letter,
   one uppercase letter,
   one numeric digit,
   and one special character
   */
  return password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
  );
};
