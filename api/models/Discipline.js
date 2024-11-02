import db from '../db.js';

const getAllDisciplines = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM disciplines');
        return rows;
    } catch (error) {
        console.error('Error fetching disciplines:', error);
        throw new Error('Unable to fetch disciplines');
    }
};

export default getAllDisciplines;
