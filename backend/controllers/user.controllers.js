import Poolconnector from "../db/connector.js";

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

// Export the functions
export { getAlldatafromtable };