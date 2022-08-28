import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Card, CardContent, CardMedia, IconButton, Slider, Typography } from '@mui/material';
import React from 'react';
import QueuedSongList from './QueuedSongList';
import GlobalStyle from './styles/GlobalStyles';


function SongPlayer() {
    return <>
        <GlobalStyle />
        <Card variant="outlined" className='container-songplayer'>
            <div className='details-songplayer'>
                <CardContent className='details-content'>
                    <Typography variant="h5" component="h3">
                        Title
                    </Typography>
                    <Typography variant="subtitle1" component="p" color="textSecondary">
                        Artist
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
            image="https://avatars.githubusercontent.com/u/25700704?v=4" />
        </Card>
        <QueuedSongList />
    </>
}

export default SongPlayer;