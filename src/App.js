import React from "react";
import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, Hidden } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import songReducer from "./reducer";

export const SongContext = React.createContext({
  song: {
    id: "befb440f-1c91-400e-a4f6-37b04702c5bf",
    title: "Hydrogen",
    artist: "M.O.O.N.",
    thumbnail: "https://i.ytimg.com/vi/SNE2oCZH_4k/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=SNE2oCZH_4k",
    duration: 4.5
  },
  isPlaying: false ///property 
});


function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);



  const theme = useTheme();
  const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSm ? 80 : 10 ////If smaller sm show 10, if not 80 
          }}
          item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd ? {
              position: 'fixed',
              width: '100%',
              right: 0,
              top: 70
            } : {
              position: 'fixed',
              width: '100%',
              left: 0,
              bottom: 0
            }}
          item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}


export default App;
