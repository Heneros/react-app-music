import { ApolloClient, gql, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { HASURA_KEY, HASURA_URL, HASURA_WS } from "./keys";
import { WebSocketLink } from 'apollo-link-ws';


const httpLink = new HttpLink({
    uri: HASURA_URL,
    headers: {
        'x-hasura-admin-secret': HASURA_KEY
    }
});

const wsLink = new WebSocketLink({
    uri: HASURA_WS,
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                'x-hasura-admin-secret': HASURA_KEY
            }
        }
    }
});


const link =
    typeof window !== "undefined" && wsLink != null
        ? split(
            ({ query }) => {
                const def = getMainDefinition(query);
                return (
                    def.kind === "OperationDefinition" &&
                    def.operation === "subscription"
                );
            },
            wsLink,
            httpLink
        )
        : httpLink;

const typeDefs = gql`
     extend type Song {
            id: uuid!,
            title: String!,
            artist: String!,
            thumbnail: String!,
            url: String!,
            duration: Float!
        }
        input SongInput {
            id: uuid!,
            title: String!,
            artist: String!,
            thumbnail: String!,
            url: String!,
            duration: Float!
        }
        extend type Query{
            queue: [Song]!
        }
        extend  type Mutation{
            addOrRemoveFromQueue(input: SongInput): [Song]!
        }
      `;


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    typeDefs,
    // typeDefs: gql`

    // `
});

// const data = {
//     queue: []
// }
const localQueue = localStorage.getItem('queue')
const hasQueue = Boolean(localQueue);

const data = {
    queue: hasQueue ? JSON.parse(localQueue) : []
}
// client.writeData({data});
// client.writeQuery({ data });
// client.cache.evict({ data });
// console.log();
client.cache.gc({data});

export default client;