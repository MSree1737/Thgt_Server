import { db } from '../index.js'; // adjust the path based on your project structure

export const readblog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM blogs WHERE id = $1',
      [blogId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
