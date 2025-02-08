import Poolconnector from "../db/connector.js";


const getAlldatafromtable = async (req, res) => {
    try {
        const { rows } = await Poolconnector.query('SELECT * FROM users');
        return res.status(200).json({ 
            data: rows,
            message: 'All users fetched successfully',
            success: true,
         });
    } catch (error) {
        return res.status(400).json({ 
            message: 'An error occurred while fetching users' ,
            success: false,
         });
    }
};

export { getAlldatafromtable };