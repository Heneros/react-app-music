import React from 'react';
import { Grid, AppBar, Toolbar, Typography } from '@mui/material';
import { HeadsetTwoTone } from '@mui/icons-material';
import HeaderStyles from './styles/Header';


function Header() {
    return (
        <HeaderStyles>
            <AppBar color="secondary" position="fixed">
                <Toolbar>
                    <HeadsetTwoTone />
                    <Typography className="title" variant="h6" component="h1">
                        React App Music
                    </Typography>
                </Toolbar>
            </AppBar>
        </HeaderStyles>
    )
}

export default Header;