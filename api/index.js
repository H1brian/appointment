import express from 'express'
import 'dotenv/config';
import { graphqlHTTP } from 'express-graphql';
import typeDefs from './schema/appointmentSchema.js';
import resolvers from './resolvers/appointmentResolver.js';
import { makeExecutableSchema } from '@graphql-tools/schema';


// Create the executable GraphQL schema using typeDefs and resolvers
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true // Enable GraphiQL interface for testing
    })
);
// Connect to the server
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});