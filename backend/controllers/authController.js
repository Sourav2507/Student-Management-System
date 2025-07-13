const User = require('../models/User');
const Log = require('../models/Log'); // ⬅️ Add this
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Register Controller
exports.register = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    role,
    rollNumber,
    branch,
    semester,
    facultyId,
    designation
  } = req.body;

  try {
    // Check for duplicate username
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      ...(role === 'student' && { rollNumber, branch, semester }),
      ...(role === 'faculty' && { facultyId, designation }),
    });

    await user.save();

    // ✅ Log the registration
    await Log.create({
      message: `${user.name} registered as ${role}`,
      category: 'User',
      user: user._id,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Register Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false, // Use true in production
    });

    res.json({ message: 'Login successful', role: user.role });
  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
