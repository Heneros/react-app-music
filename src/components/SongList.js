import { PlayArrow, Save } from '@mui/icons-material';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from '@mui/material';
import React from 'react';
import { GET_SONGS } from '../graphql/subscriptions';
// import { GET_SONGS } from '../graphql/queries';
import GlobalStyles from './styles/GlobalStyles';
// import { useQuery } from '@apollo/client';
import { useQuery, useSubscription } from '@apollo/client';



function SongList({ created_at }) {
    // let loading = false; ///if false not show spinner
    const { data, loading, error } = useSubscription(
        GET_SONGS



    );
    console.log(data);


    // const { data, loading, error } = useQuery(GET_SONGS)
    // const song = {
    //     title: "Crystals",
    //     artist: "M.O.O.N.",
    //     thumbnail: "https://avatars.githubusercontent.com/u/25700704?v=4",
    // }

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50
            }}>
                <CircularProgress />
            </div>
        )
    }
    if (error) return <div>Error fetching songs</div>

    return <div>
        {/* /////// Array.from receive 10 items */}
        {/* {Array.from({ length: 10 }, () => song).map((song, i) => (  */}
        {data.songs.map(song => (
            <Song key={song.id} song={song} /> ///output 10 items song, song array
        ))}
    </div>
}
function Song({ song }) {
    const { title, artist, thumbnail } = song; ///destruction array song
    return <Card className='container-card'>
        <GlobalStyles />
        <div className='songinfo-container'>
            <CardMedia image={thumbnail} className="cardmedia-thumbnail" />
            <div className='songinfo'>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body1" component="p" color="textSecondary">
                        {artist}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton size="small" color="primary">
                        <PlayArrow />
                    </IconButton>
                    <IconButton size="small" color="secondary">
                        <Save color='secondary' />
                    </IconButton>
                </CardActions>
            </div>
        </div>
    </Card>
}

export default SongList;