import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { ApolloLink, concat } from 'apollo-link';

// const customFetch = (uri, options) => {
//   const { body, ...newOptions } = options;
//   const queryString = objectToQuery(JSON.parse(body));
//   const requestedString = uri + queryString;
//   return fetch(requestedString, newOptions);
// };

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql/',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
       // authorization: localStorage.getItem('token') || null,
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
    }
  });

  return forward(operation);
})



const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  	<ApolloProvider client={client}>
	  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
	   <App />
    </ApolloProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
