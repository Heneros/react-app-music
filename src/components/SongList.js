import { PlayArrow } from '@mui/icons-material';
import { Card, CardActionArea, CardActions, CardContent, CircularProgress, IconButton, Typography } from '@mui/material';
import React from 'react';

function SongList() {
    let loading = false; ///if false not show spinner

    const song = {
        title: "Crystals",
        artist: "M.O.O.N.",
        thumbnail: "https://www.youtube.com/watch?v=AVblOqZBlJw"
    }

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


    return <div>{Array.from({ length: 10 }, () => song).map((song, i) => (
        <Song key={i} song={song} /> ///output 10 items song, song array
    ))} </div>
}
function Song({ song }) {
    const { title, artist, thumbnail } = song; ///destruction array song
    return <Card>
        <div>
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
            </CardActions>
        </div>
    </Card>
}

export default SongList;