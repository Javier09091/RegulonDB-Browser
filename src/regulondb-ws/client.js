import { ApolloClient, InMemoryCache } from "@apollo/client";

export const URI_REGULONDB_WS = "https://regulondb.ccg.unam.mx/graphql"

export const CLIENT = new ApolloClient({
    uri: process.env.REACT_APP_WEB_SERVICE_URL,
    cache: new InMemoryCache()
  });