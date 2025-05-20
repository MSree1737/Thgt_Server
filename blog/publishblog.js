import { db } from '../index.js'

export const publishblog = async (req,res)=>{
    try {
        const result = await db.query(
          `SELECT b.*, u.username 
           FROM blogs b
           JOIN users u ON b.user_email = u.email
           WHERE b.published = true 
           ORDER BY b.created_at DESC`
      );
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching published blogs:', err);
      res.status(500).json({ error: 'Server error fetching blogs' });
    }
}