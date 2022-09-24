import { useQuery } from '@apollo/client';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Card, CardContent, CardMedia, IconButton, Slider, Typography } from '@mui/material';
import React from 'react';
import { SongContext } from '../App';
import { GET_QUEUED_SONGS } from '../graphql/queries';
import QueuedSongList from './QueuedSongList';
import GlobalStyle from './styles/GlobalStyles';
import ReactPlayer from 'react-player';

function SongPlayer() {
    const { data } = useQuery(GET_QUEUED_SONGS);
    const { state, dispatch } = React.useContext(SongContext);
    const [played, setPlayed] = React.useState(0);
    const reactPlayerRef = React.useRef();


    const [seeking, setSeeking] = React.useState(false);



    function handleTogglePlay() {
        dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
    }

    function handleProgressChange(event, newValue) {
        setPlayed(newValue)
    }

    function handleSeekMouseDown() {
        setSeeking(true);

    }

    function handleSeekMouseUp() {
        setSeeking(false);
        reactPlayerRef.current.seekTo(played);
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
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        onChange={handleProgressChange}
                        value={played}
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <ReactPlayer
                    ref={reactPlayerRef}
                    onProgress={({ played, playedSeconds }) => {
                        setPlayed(played)
                    }}
                    url={state.song.url}
                    playing={state.isPlaying}
                    hidden />
                <CardMedia
                    className='thumbnail-songplayer'
                    image={state.song.thumbnail} />
            </Card>
            <QueuedSongList queue={data.queue} />
        </>
    )

}

export default SongPlayer;