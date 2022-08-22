import React from 'react';
import { Grid, AppBar, Toolbar, Typography } from '@mui/material';
import { HeadsetTwoTone } from '@mui/icons-material';

function Header() {
    return (
        <AppBar>
            <Toolbar>
                <HeadsetTwoTone />
                <Typography variant="h6" component="h1">
                    React App Music
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;