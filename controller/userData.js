import { db } from '../index.js'; // Make sure db is exported from index.js

export const userdata = async (req, res) => {
  try {
    const { email } = req.params;

    const userResult = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const blogResult = await db.query(
      'SELECT * FROM blogs WHERE user_email = $1 ORDER BY created_at DESC',
      [email]
    );

    res.json({
      user: userResult.rows[0],
      blogs: blogResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
