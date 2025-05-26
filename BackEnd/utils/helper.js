const validatePassword = (p) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
  return regex.test(p);
};

module.exports = { validatePassword };
