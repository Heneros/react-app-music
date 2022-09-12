// import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';
// import { WebSocketLink } from 'apollo-link-ws';

// import { Web } from '@mui/icons-material';
// import { getMainDefinition } from '@apollo/client/utilities';




// const httpLink = new HttpLink({
//     uri: HASURA_URL,
// });

// // const wsLink = new WebSocketLink({
// //     uri: HASURA_WS,
// //     options: {
// //         reconnect: true
// //     }
// // })


// const wsLink = new GraphQLWsLink(
//     createClient({
//         uri: HASURA_WS,
//         options: {
//             reconnect: true
//         }
//     }),
// );



// // const client = new ApolloClient({
// //     uri: HASURA_URL,
// //     cache: new InMemoryCache(),
// //     headers: {
// //         'x-hasura-admin-secret': 'HASURA_KEY
// //     }
// // });
// const splitLink = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     wsLink,
//     httpLink,
// );

// const client = new ApolloClient({
//     link: splitLink,
//     cache: new InMemoryCache(),
//     headers: {
//         'x-hasura-admin-secret': HASURA_KEY
//     }
// });

// export default client;









import { ApolloClient, gql, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { HASURA_KEY, HASURA_URL, HASURA_WS } from "./keys";
import { WebSocketLink } from 'apollo-link-ws';

// import { gql } from '@apollo/client';

// const wsLink = new GraphQLWsLink(createClient({
//     url: HASURA_WS,
// }));

// const httpLink = new HttpLink({
//     uri: HASURA_URL,
// });

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

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    options: {
        reconnect: true
    },
    // typeDefs: gql`

    // `
});

// const data = {
//     queue: []
// }


// client.writeQuery({
//     query: gql`
//       type Song {
//         id: uuid!
//         title: String!
//         artist: String!
//         thumbnail: String!
//         duration: Float!
//         url: String!
//     }

//     input SongInput{
//         id: uuid!
//         title: String!
//         artist: String!
//         thumbnail: String!
//         duration: Float!
//         url: String!
//     }

//     type Query{
//         queue: [Song]! 
//     }

//     type Mutation {
//         addOrRemoveFromQueue(input: SongInput!): [Song]!
//     }
//     `,
//     data: {
//       cartItems: []
//     }
//   });
// client.writeData({ data });

// cache.writeData({ id, data });
// type Query{
//     queue: [Song]! //////////// return al least url
// }
export default client;