import { Delete } from '@mui/icons-material';
import { Avatar, IconButton, Typography } from '@mui/material';
import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@apollo/client';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

function QueuedSongList({ queue }) {

    console.log({ queue })

    const theme = useTheme();
    const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

    // const song = {
    //     title: "Crystals",
    //     artist: "M.O.O.N.",
    //     thumbnail: "https://avatars.githubusercontent.com/u/25700704?v=4",
    // };

    return greaterThanMd && (<div style={{ margin: '10px 0' }}>
        <Typography color="textSecondary" variant="button">
            QUEUE ({queue.length})
        </Typography>
        {/* {Array.from({ length: 5 }, () => song).map((song, i) => ( */}
        {queue.map((song, i) => (
            <QueuedSong key={i} song={song} />
        ))}
    </div>)
}

function QueuedSong({ song }) {
    const { thumbnail, artist, title } = song;
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => { //////Callback action save in local storage
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue)) ///set to local storage
        }
    });

    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: 'Song' } }///
        })
    }
    return (
        <div className='queued-container'>
            < GlobalStyles />
            <Avatar src={thumbnail} alt="Song name" className='queued-avatar' />
            <div className='queued-infocontainer'>
                <Typography variant='subtitle2' className='queued-text' >
                    {title}
                </Typography>
                <Typography color="textSecondary" variant='body2' className='queued-text'>
                    {artist}
                </Typography>
            </div>
            <IconButton onClick={handleAddOrRemoveFromQueue} >
                <Delete color="error" />
            </IconButton>
        </div>)
}

export default QueuedSongList;