import db from '../db.js';

const getAllTreatments = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM treatments');
        return rows;
    } catch (error) {
        console.error('Error fetching treatments:', error);
        throw new Error('Unable to fetch treatments');
    }
};

export default getAllTreatments;
