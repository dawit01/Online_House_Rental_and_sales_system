const { generateToken } = require('./auth');

async function login(req, res, userModel) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { login };
