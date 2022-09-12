import { useQuery } from '@apollo/client';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Card, CardContent, CardMedia, IconButton, Slider, Typography } from '@mui/material';
import React from 'react';
import { SongContext } from '../App';
import { GET_QUEUED_SONGS } from '../graphql/queries';
import QueuedSongList from './QueuedSongList';
import GlobalStyle from './styles/GlobalStyles';


function SongPlayer() {
    // useQuery
    const { data } = useQuery(GET_QUEUED_SONGS);

    console.log( data );

    const { state, dispatch } = React.useContext(SongContext);

    function handleTogglePlay() {
        dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
    }

    return (
        <>
            <GlobalStyle />
            <Card variant="outlined" className='container-songplayer'>
                <div className='details-songplayer'>
                    <CardContent className='details-content'>
                        <Typography variant="h5" component="h3">
                            {state.song.title}
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div className='controls-songplayer'>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTogglePlay}>
                            {state.isPlaying ? <Pause className='playicon-songplayer' /> : <PlayArrow className='playicon-songplayer' />}
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            00:01:30
                        </Typography>
                    </div>
                    <Slider
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <CardMedia
                    className='thumbnail-songplayer'
                    image={state.song.thumbnail} />
            </Card>
            {/* <QueuedSongList queue={data.queue} /> */}
            <QueuedSongList />
        </>
    )

}

export default SongPlayer;