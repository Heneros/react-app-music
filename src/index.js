import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /////////client={client} property which connected to db app. 
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
