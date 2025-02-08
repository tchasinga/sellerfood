import Poolconnector from "../db/connector.js";
import bcrypt from 'bcrypt';

const getAlldatafromtable = async (req, res) => {
    try {
        const { rows } = await Poolconnector.query('SELECT * FROM getdata');
        return res.status(200).json({ 
            data: rows,
            message: 'All users fetched successfully',
            success: true,
         });
    } catch (error) {
        let errorMessage = 'An error occurred while fetching users';
        if (error.code === '42P01') {
            errorMessage = 'The specified table does not exist';
        }
        return res.status(400).json({ 
            message: errorMessage, 
            error,
            success: false,
         });
    }
};

// Get data by his ID from the database
const getDatabyID = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await Poolconnector.query('SELECT * FROM getdata WHERE id = $1', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        return res.status(200).json({ data: rows[0], message: 'User fetched successfully', success: true });
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while fetching user', error, success: false });
    }
};

// Create a new user in the database
const createNewUser = async (req, res) => {
    try {
        const { name_user, postname, password_user, image_user } = req.body;

        // Validate input
        if (!name_user || !postname || !password_user) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // 🔍 Check if the user already exists (based on name_user)
           const existingUser = await Poolconnector.query(
            'SELECT * FROM getdata WHERE name_user = $1',
            [name_user]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password_user, saltRounds);

        // Insert user into the database
        const { rows } = await Poolconnector.query(
            'INSERT INTO getdata (name_user, postname, password_user, image_user) VALUES ($1, $2, $3, $4) RETURNING *',
            [name_user, postname, hashedPassword, image_user]
        );

        return res.status(201).json({
            data: rows[0],
            message: 'User created successfully',
            success: true
        });

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            message: 'An error occurred while creating the user',
            error: error.message,
            success: false
        });
    }
};

// Delete a user from the database
const deleteDataOfUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await Poolconnector.query('DELETE FROM getdata WHERE id = $1 RETURNING *', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        return res.status(200).json({ message: 'User deleted successfully', success: true });
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while deleting user', error, success: false });
    }
};


// Export the functions
export { getAlldatafromtable, getDatabyID, createNewUser, deleteDataOfUsers };