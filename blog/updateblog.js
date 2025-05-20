import { db } from '../index.js';

export const updateblog  = async (req,res) => {
    try {
        const { blogId } = req.params;
        const { title, content, category, imageUrl, published } = req.body;
        const result = await db.query(
          `UPDATE blogs 
           SET 
             title = COALESCE($1, title),
             content = COALESCE($2, content),
             category = COALESCE($3, category),
             image_url = COALESCE($4, image_url),
             published = COALESCE($5, published)
           WHERE id = $6
           RETURNING 
             id,title,content,category,image_url AS "imageUrl",published,created_at AS "createdAt"`,
          [title, content, category, imageUrl, published, blogId]
        );
    
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Blog not found' });
        }
    
        res.json({ blog: result.rows[0] });
      } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ 
          error: 'Server error updating blog',
          details: err.message 
        });
      }
}