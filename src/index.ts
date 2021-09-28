import { ApolloServer, ExpressContext } from "apollo-server-express";
import express from "express";
import User from "./User";
import Message from "./Message";
import { schema } from "./schema";
import resolvers from "./resolver";
import AuthDirective from "directives";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "cors"

const PORT = 4000;

const startApolloServer = async (): Promise<{
  app: express.Express;
  graphQLServer: ApolloServer<ExpressContext>;
}> => {
  const graphQLServer = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({}),
    ],
  });
  await graphQLServer.start();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  graphQLServer.applyMiddleware({ app })
  await new Promise<void>((resolve) => app.listen(PORT, resolve));
  console.log(`Running graphQLServer: http://localhost:${PORT}/graphql`)

  return { app, graphQLServer }
}

const server = startApolloServer();
export default server;
