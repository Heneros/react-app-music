import React from 'react';
import { TextField, InputAdornment, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { AddBoxOutlined, Link } from '@mui/icons-material';
function AddSong() {
    const [dialog, setDialog] = React.useState(false);


    function handleSetDialog() {
        setDialog(false);
    }

    return (
        <div>
            <Dialog
                open={dialog}
                onClose={handleSetDialog}
            >
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                   <img src="https://avatars.githubusercontent.com/u/25700704?v=4" alt="Song thumbnail" />
                   <TextField
                   margin="dense"
                   name="title"
                   label="Title"
                   fullWidth
                   />
                </DialogContent>
            </Dialog>
            <TextField
                placeholder='Add Youtube or Soundcloud'
                fullWidth
                margin="normal"
                type="url"
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <Link />
                        </InputAdornment>
                    )
                }}
            />
            <Button
                onClick={() => setDialog(true)}
                variant='contained' color="primary" endIcon={<AddBoxOutlined />}>
                Add
            </Button>
        </div>
    )
}

export default AddSong;