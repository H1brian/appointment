import db from '../db.js';

// Function to fetch all locations
const getAllLocations = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM locations');
        return rows;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw new Error('Unable to fetch locations');
    }
};

export default getAllLocations;