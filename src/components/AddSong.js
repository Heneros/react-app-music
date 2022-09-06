import React from 'react';
import { TextField, InputAdornment, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { AddBoxOutlined, Link } from '@mui/icons-material';
import AddSongStyles from './styles/AddSongStyles';

import GlobalStyle from './styles/GlobalStyles';
import ReactPlayer from 'react-player';
import SoundCloudPlayer from 'react-player/soundcloud';
import YouTubePlayer from 'react-player/youtube';
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '../graphql/mutations';


const DEFAULT_SONG = {
    duration: 0,
    title: "",
    artist: "",
    thumbnail: ""
}

function AddSong() {
    const [dialog, setDialog] = React.useState(false);
    const [addSong, { error }] = useMutation(ADD_SONG);
    const [url, setUrl] = React.useState('');
    const [playable, setPlayable] = React.useState(false);
    const [song, setSong] = React.useState(DEFAULT_SONG)

    React.useEffect(() => {
        const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
        setPlayable(isPlayable)
    }, [url]);

    function handleChangeSong(event) {
        const { name, value } = event.target;///destruction value which typed in field
        setSong(prevSong => ({
            ...prevSong,///get all prev values song
            [name]: value//update property
        }))
    }



    function handleCloseDialog() {
        setDialog(false); ///false = on default popup hide
    }
    async function handleEditSong({ player }) {
        const nestedPlayer = player.player.player;
        let songData;
        if (nestedPlayer.getVideoData) {
            songData = getYoutubeInfo(nestedPlayer)
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundcloudInfo(nestedPlayer)
        }
        setSong({ ...songData, url });
    }
    async function handleAddSong() {
        try {
            const { url, thumbnail, duration, title, artist } = song

            ///check if not empty url, thumbnail, duration, title, artist
            await addSong({
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null,
                }
            })
            handleCloseDialog()
            setSong(DEFAULT_SONG)//clear out values after adding song 
            setUrl('');
        } catch (error) {
            console.log('Error adding song ' + error);
        }
    }

    function getYoutubeInfo(player) {
        const duration = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
        return {
            duration,
            title,
            artist: author,
            thumbnail
        }
    }
    function getSoundcloudInfo(player) {
        ///save with Promise condition object songData
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if (songData) {
                    resolve({
                        duration: Number(songData.duration / 1000), ////
                        title: songData.title,
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })

    }

    function handleError(field) {
        // return error && error.graphQLErrors[0].extensions.path.includes(field);//only if u caught error
        return error?.graphQLErrors[0]?.extensions?.path.includes(field);/// '?' check exists property or object
    }

    const { thumbnail, title, artist } = song;
    console.dir(error);//entire object
    return (
        <div>
            <GlobalStyle />
            <AddSongStyles>
                <div className='container'>
                    <Dialog
                        className='dialog'
                        open={dialog}
                        onClose={handleCloseDialog}
                    >
                        <DialogTitle>Edit Song</DialogTitle>
                        <DialogContent>

                            <img
                                className='thumbnail'
                                src={thumbnail}
                                alt="Song thumbnail" />

                            <TextField
                                value={title}
                                onChange={handleChangeSong}
                                margin="dense"
                                name="title"
                                label="Title"
                                fullWidth
                                error={handleError('title')}
                                helperText={handleError('title') && 'Fill out field'}
                            />
                            <TextField
                                value={artist}
                                onChange={handleChangeSong}
                                margin="dense"
                                name="artist"
                                label="Artist"
                                fullWidth
                                error={handleError('artist')}
                                helperText={handleError('artist') && 'Fill out field'}
                            />
                            <TextField
                                value={thumbnail}
                                onChange={handleChangeSong}
                                margin="dense"
                                name="thumbnail"
                                label="Thumbnail"
                                fullWidth
                                error={handleError('thumbnail')}
                                helperText={handleError('thumbnail') && 'Fill out field'}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleAddSong} variant="outlined" color="primary">
                                Add Song
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <TextField
                        className='url-input'
                        onChange={event => setUrl(event.target.value)} ///receive data
                        value={url}
                        placeholder='Add Youtube or Soundcloud'
                        fullWidth
                        margin="normal"
                        type="url"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Link />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        disabled={!playable}///diable if not playable
                        className='addSongButton'
                        onClick={() => setDialog(true)}
                        variant='contained' color="primary" endIcon={<AddBoxOutlined />}>
                        Add
                    </Button>
                    <ReactPlayer url={url} hidden onReady={handleEditSong} />
                </div>
            </AddSongStyles>
        </div>
    )
}

export default AddSong;