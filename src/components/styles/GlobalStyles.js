import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .thumbnail{
    width: 90%;
  }
  .dialog{
    text-align: center;
}
.container-card{
 margin:  15px;
}
.songinfo-container{
  display: flex;
  align-items: center;
}
.songinfo{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.cardmedia-thumbnail{
  object-fit: cover;
  width: 140px;
  height: 140px;
}
.container-songplayer{
  display: flex;
  justify-content: space-between;
}
.details-songplayer{
 display: flex;
 flex-direction: column;
 padding: 0 15px;
}
.content-songplayer{
  flex: 1 0 auto;
}
.thumbnail-songplayer{
  width:150px;
}
.controls-songplayer{
  display: flex;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
}
.playicon-songplayer{
  width:38pc;
  height:38pc;
}

.queued-avatar{
  width: 44px;
  height: 44px;
}
.queued-text{
  text-overflow: ellipsis;
  overflow: hidden;
}
.queued-container{
display: grid;
grid-auto-flow: column;
grid-template-columns: 50px auto 50px;
grid-gap: 12;
align-items: center;
margin-top: 10px
}
.queued-infocontainer{
  overflow: hidden;
  white-space: nowrap;
}
`
export default GlobalStyle;