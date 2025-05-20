import { db } from '../index.js';

export const createblog = async(req,res)=> {
    try {
        const { title, content, user_email, category, image_url, published } = req.body;
        
        if (!title || !content || !user_email) {
          return res.status(400).json({ error: 'Title, content and user email are required' });
        }
    
        const result = await db.query(
          'INSERT INTO blogs (title, content, user_email, category, image_url, published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [title, content, user_email, category, image_url, published]
        );
    
        res.status(201).json({ blog: result.rows[0] });
      } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ error: 'Server error creating blog' });
      }
}