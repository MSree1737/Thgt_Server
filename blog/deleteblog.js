import { db } from '../index.js';  // Adjust this based on your actual db file path

export const deleteblog = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Delete associated comments from blog_comments
    const deleteComments = await db.query(
      'DELETE FROM blog_comments WHERE blog_id = $1',
      [id]
    );

    

    // Step 3: Delete the blog itself from blogs table
    const deleteBlog = await db.query(
      'DELETE FROM blogs WHERE id = $1 RETURNING *',
      [id]
    );

    if (deleteBlog.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Return success response
    res.json({ message: 'Blog and associated comments and likes deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog, comments, and likes:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
