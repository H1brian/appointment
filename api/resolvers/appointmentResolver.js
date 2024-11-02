import { getFilteredAppointments, createAppointment, updateAppointment, deleteAppointment } from '../models/Appointment.js';
import getAllLocations from '../models/Location.js';
import getAllProviders from '../models/Provider.js';
import getAllDisciplines from '../models/Discipline.js';
import getAllTreatments from '../models/Treatment.js';

const resolvers = {
  Query: {
      // Fetch all locations
      locations: async () => {
          try {
              return await getAllLocations();
          } catch (error) {
              throw new Error('Error fetching locations');
          }
      },
      // Fetch all providers
      providers: async () => {
          try {
              return await getAllProviders();
          } catch (error) {
              throw new Error('Error fetching providers');
          }
      },
      // Fetch all disciplines
      disciplines: async () => {
          try {
              return await getAllDisciplines();
          } catch (error) {
              throw new Error('Error fetching disciplines');
          }
      },
      // Fetch all treatments
      treatments: async () => {
          try {
              return await getAllTreatments();
          } catch (error) {
              throw new Error('Error fetching treatments');
          }
      },
      // Fetch filtered appointments
      appointments: async (_, filters) => {
          try {
              return await getFilteredAppointments(filters);
          } catch (error) {
              throw new Error('Error fetching appointments');
          }
      }
  },
  Mutation: {
      // Add a new appointment
      addAppointment: async (_, args) => {
          try {
              return await createAppointment(args);
          } catch (error) {
              throw new Error('Error creating appointment');
          }
      },
      // Update an existing appointment
      updateAppointment: async (_, args) => {
          try {
              return await updateAppointment(args);
          } catch (error) {
              throw new Error('Error updating appointment');
          }
      },
      // Delete an appointment
      deleteAppointment: async (_, { id }) => {
          try {
              return await deleteAppointment(id);
          } catch (error) {
              throw new Error('Error deleting appointment');
          }
      }
  }
};

export default resolvers;