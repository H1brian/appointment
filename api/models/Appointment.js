import db from '../db.js';

const getFilteredAppointments = async ({ locationId, providerId, disciplineId, treatmentId }) => {
    try {
        let query = 'SELECT * FROM appointments WHERE 1=1';
        const params = [];

        if (locationId) {
            query += ' AND location_id = $1';
            params.push(locationId);
        }
        if (providerId) {
            query += ` AND provider_id = $${params.length + 1}`;
            params.push(providerId);
        }
        if (disciplineId) {
            query += ` AND discipline_id = $${params.length + 1}`;
            params.push(disciplineId);
        }
        if (treatmentId) {
            query += ` AND treatment_id = $${params.length + 1}`;
            params.push(treatmentId);
        }

        const { rows } = await db.query(query, params);
        return rows;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw new Error('Unable to fetch appointments');
    }
};

const createAppointment = async ({ providerId, treatmentId, disciplineId, locationId, startTime, endTime }) => {
    try {
        const { rows } = await db.query(
            'INSERT INTO appointments (provider_id, treatment_id, discipline_id, location_id, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [providerId, treatmentId, disciplineId, locationId, startTime, endTime]
        );
        return rows[0];
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw new Error('Unable to create appointment');
    }
};

const updateAppointment = async ({ id, providerId, treatmentId, disciplineId, locationId, startTime, endTime }) => {
    try {
        const { rows } = await db.query(
            'UPDATE appointments SET provider_id = $1, treatment_id = $2, discipline_id = $3, location_id = $4, start_time = $5, end_time = $6 WHERE id = $7 RETURNING *',
            [providerId, treatmentId, disciplineId, locationId, startTime, endTime, id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw new Error('Unable to update appointment');
    }
};

const deleteAppointment = async (id) => {
    try {
        const { rowCount } = await db.query('DELETE FROM appointments WHERE id = $1', [id]);
        return rowCount > 0;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw new Error('Unable to delete appointment');
    }
};

export {
    getFilteredAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
};
