import { Delete } from '@mui/icons-material';
import { Avatar, IconButton, Typography } from '@mui/material';
import React from 'react';
import GlobalStyles from './styles/GlobalStyles';

function QueuedSongList() {
    const song = {
        title: "Crystals",
        artist: "M.O.O.N.",
        thumbnail: "https://avatars.githubusercontent.com/u/25700704?v=4",
    }

    return <div style={{ margin: '10px 0' }}>
        <Typography color="textSecondary" variant="button">
            QUEUE(5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
            <QueuedSong key={i} song={song} />
        ))}
    </div>
}

function QueuedSong({ song }) {
    const { thumbnail, artist, title } = song;
    return (
    <div className='queued-container'>
        < GlobalStyles />
        <Avatar src={thumbnail} alt="Song name"  className='queued-avatar'/>
        <div className='queued-infocontainer'>
            <Typography variant='subtitle2' className='queued-text' >
                {title}
            </Typography>
            <Typography color="textSecondary" variant='body2' className='queued-text'>
                {artist}
            </Typography>
        </div>
        <IconButton>
            <Delete color="error" />
        </IconButton>
    </div>)
}

export default QueuedSongList;