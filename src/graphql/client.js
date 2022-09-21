import { ApolloClient, gql, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { HASURA_KEY, HASURA_URL, HASURA_WS } from "./keys";
import { WebSocketLink } from 'apollo-link-ws';
import { GET_QUEUED_SONGS } from "./queries";

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



export const typeDefs = gql`
      type Song {
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
         type Query{
            queue: [Song]!
        }
          type Mutation{
            addOrRemoveFromQueue(input: SongInput): [Song]!
        }
      `;

export const resolvers = {
    Mutation: {
        /// 3 params. first optional, all arguments its input, last param cache
        addOrRemoveFromQueue: (_, { input }, { cache }) => {
           ///read query GET_QUEUED_SONGS
            const queryResult = cache.readQuery({
                query: GET_QUEUED_SONGS
            })
            if (queryResult) {
                const { queue } = queryResult
                ///check if song equel to input(queue)
                const isInQueue = queue.some(song => song.id === input.id)
         
                const newQueue = isInQueue ?
                    queue.filter(song => song.id !== input.id)       //if song in queue 
                    : [...queue, input];                             /// add song to queue.
                cache.writeQuery({
                    query: GET_QUEUED_SONGS,
                    data: { queue: newQueue }
                })
                return newQueue; //return new array
            }
            //if empty queryResult, return empty array
            return [];
        }
    }
}
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    typeDefs,
    resolvers
});



client.writeQuery({
    query: gql`
      query getQueuedSongs {
        queue
      }
    `,
    data: {
        queue: []
    }
});


// client.writeQuery()

// client.writeQuery({queue})

// client.writeData({data});
// client.writeQuery({ data });
// client.cache.evict({ data });
// console.log();

export default client;