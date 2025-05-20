import bcrypt from 'bcrypt';
import { db } from '../index.js';
import crypto from "crypto";

export const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
    
        const result = await db.query(
          'SELECT id, email, username, password_hash FROM users WHERE email = $1',
          [email]
        );
        
        if (result.rows.length === 0) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        const user = result.rows[0];
        
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
        await db.query(
          'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)',
          [user.id, token, expiresAt]
        );
    
        res.json({ 
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username
          },
          redirect: '/home'
        });
        
      } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
      }
}