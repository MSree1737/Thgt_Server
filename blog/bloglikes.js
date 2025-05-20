
import { db } from '../index.js';
export const blog_likes =  async (req, res) => {
  const blogId = req.params.blogId;
  const userEmail = req.user?.email;

  if (!userEmail) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Check if the user has already liked this blog
    const check = await db.query(
      'SELECT id FROM blog_likes WHERE blog_id = $1 AND user_email = $2',
      [blogId, userEmail]
    );

    if (check.rows.length > 0) {
      // User already liked, remove like
      await db.query(
        'DELETE FROM blog_likes WHERE blog_id = $1 AND user_email = $2',
        [blogId, userEmail]
      );
    } else {
      // User has not liked yet, insert like
      await db.query(
        'INSERT INTO blog_likes (blog_id, user_email, created_at) VALUES ($1, $2, NOW())',
        [blogId, userEmail]
      );
    }

    // Get updated like count
    const countRes = await db.query(
      'SELECT COUNT(*) FROM blog_likes WHERE blog_id = $1',
      [blogId]
    );

    const likeCount = parseInt(countRes.rows[0].count);

    res.json({
      liked: check.rows.length === 0, // if user just liked it
      like_count: likeCount,
    });
  } catch (err) {
    console.error('Error in like route:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
