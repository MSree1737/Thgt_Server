import bcrypt from 'bcrypt';
import { db } from '../index.js';

export const create_userregister = async(req,res)=>{
    const { email, password, username } = req.body;
    try {
        const userExists = await db.query('SELECT id FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }
  
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        const userUsername = username || email.split('@')[0];
        const newUser = await db.query(
            'INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id, email, username, age',
            [email, hashedPassword, userUsername]
        );
  
        res.status(201).json({ user: newUser.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during registration' });
    }
};