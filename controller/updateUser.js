import {db} from "../index.js";

export const updateUser = async (req,res) => {
    try {
        const { email } = req.params;
        const { username, age } = req.body;
    
        const result = await db.query(
          'UPDATE users SET username = $1, age = $2 WHERE email = $3 RETURNING *',
          [username, age, email]
        );
    
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.json({ user: result.rows[0] });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
}