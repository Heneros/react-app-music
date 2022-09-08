import { gql } from '@apollo/client';

export const GET_SONGS = gql`
subscription getSongs{
    songs(order_by: {created_at: created_at}){
        artist
        duration
        id
        thumbnail
        title
        url
    }
}
`;