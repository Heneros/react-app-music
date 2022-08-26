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
`
export default GlobalStyle;