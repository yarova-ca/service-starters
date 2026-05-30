import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    health: HealthStatus!
  }
  type HealthStatus {
    status: String!
    version: String!
  }
`;

const resolvers = {
  Query: {
    health: () => ({ status: "ok", version: "1.0.0" }),
  },
};

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const port = parseInt(process.env.PORT ?? "4000");
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`Apollo Server ready at ${url}`);
  console.log(`Health: GET http://localhost:${port}/health`);
}

start().catch(console.error);
