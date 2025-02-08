import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Poolconnector from './db.js'; // Import PostgreSQL connection

dotenv.config(); // Load environment variables

// Initialize express
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// 🔹 GET all users
app.get('/users', async (req, res) => {
    try {
        const result = await Poolconnector.query('SELECT * FROM getData');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 🔹 GET a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Poolconnector.query('SELECT * FROM getData WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 🔹 POST: Add a new user
app.post('/users', async (req, res) => {
    try {
        const { Name_user, postName, Password_user, Image_user } = req.body;
        const result = await Poolconnector.query(
            'INSERT INTO getData (Name_user, postName, Password_user, Image_user) VALUES ($1, $2, $3, $4) RETURNING *',
            [Name_user, postName, Password_user, Image_user]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 🔹 DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Poolconnector.query('DELETE FROM getData WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
