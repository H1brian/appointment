import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Location {
    id: ID!
    name: String!
  }

  type Provider {
    id: ID!
    name: String!
    location: Location!
  }

  type Discipline {
    id: ID!
    name: String!
  }

  type Treatment {
    id: ID!
    name: String!
    discipline: Discipline!
  }

  type Appointment {
    id: ID!
    provider: Provider!
    treatment: Treatment!
    discipline: Discipline!
    location: Location!
    startTime: String!
    endTime: String!
  }

  type Query {
    locations: [Location!]!
    providers: [Provider!]!
    disciplines: [Discipline!]!
    treatments: [Treatment!]!
    appointments(
      locationId: ID, 
      providerId: ID, 
      disciplineId: ID, 
      treatmentId: ID
    ): [Appointment!]!
  }

  type Mutation {
    addAppointment(
      providerId: ID!,
      treatmentId: ID!,
      disciplineId: ID!,
      locationId: ID!,
      startTime: String!,
      endTime: String!
    ): Appointment!
    
    updateAppointment(
      id: ID!,
      providerId: ID,
      treatmentId: ID,
      disciplineId: ID,
      locationId: ID,
      startTime: String,
      endTime: String
    ): Appointment!

    deleteAppointment(id: ID!): Boolean!
  }
`;

export default typeDefs;
