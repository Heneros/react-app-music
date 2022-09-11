import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Card, CardContent, CardMedia, IconButton, Slider, Typography } from '@mui/material';
import React from 'react';
import { SongContext } from '../App';
import QueuedSongList from './QueuedSongList';
import GlobalStyle from './styles/GlobalStyles';


function SongPlayer() {
    const { state } = React.useContext(SongContext);

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
                        <IconButton>
                            <PlayArrow className='playicon-songplayer' />
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
            <QueuedSongList />
        </>
    )

}

export default SongPlayer;