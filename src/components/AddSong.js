import React from 'react';
import { TextField, InputAdornment, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { AddBoxOutlined, Link } from '@mui/icons-material';
import AddSongStyles from './styles/AddSongStyles';

import GlobalStyle from './styles/GlobalStyles';
import SoundCloudPlayer from 'react-player/soundcloud';
import YouTubePlayer from 'react-player/youtube';




function AddSong() {
    const [dialog, setDialog] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [playable, setPlayable] = React.useState(false);

    React.useEffect(() => {
        const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
        setPlayable(isPlayable)
    }, [url]);



    function handleCloseDialog() {
        setDialog(false); ///false = on default popup hide
    }

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
                                src="https://avatars.githubusercontent.com/u/25700704?v=4" alt="Song thumbnail" />

                            <TextField
                                margin="dense"
                                name="title"
                                label="Title"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                name="artist"
                                label="Artist"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                name="thumbnail"
                                label="Thumbnail"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">
                                Cancel
                            </Button>
                            <Button variant="outlined" color="primary">
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
                </div>
            </AddSongStyles>
        </div>
    )
}

export default AddSong;