const { loginService, signUpService } = require('../services/authService');

// Controller to handle login logic
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, error } = await loginService(email, password);

    if (error) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller to handle signUp logic
const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const { user, error } = await signUpService(firstName, lastName, email, password);

    if (error) {
      return res.status(400).json({ message: error });
    }

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, signUp };
