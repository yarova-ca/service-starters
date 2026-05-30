import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `type Query { health: String! }`,
    resolvers: { Query: { health: () => "ok" } },
  }),
});

const port = parseInt(process.env.PORT ?? "4000");
createServer(yoga).listen(port, () => {
  console.log(`GraphQL Yoga ready at http://localhost:${port}/graphql`);
});
