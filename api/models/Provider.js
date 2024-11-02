import db from '../db.js';

const getAllProviders = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM providers');
        return rows;
    } catch (error) {
        console.error('Error fetching providers:', error);
        throw new Error('Unable to fetch providers');
    }
};

export default getAllProviders;

