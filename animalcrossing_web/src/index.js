import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// GraphQL
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link';
// GraphQL

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql/',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  localStorage.setItem('Authorization', 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InBhY28iLCJleHAiOjE1ODY2NzY3MTUsIm9yaWdJYXQiOjE1ODY2NzY0MTV9.xjpI81yiyHLoDnTn49A_sf7ouoUQ_jUOfRNo5AmTOhk')
  operation.setContext({
    headers: {
    	'Authorization': localStorage.getItem('Authorization') || null,
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
  	  <meta
		name="viewport"
		content="minimum-scale=1, initial-scale=1, width=device-width"
	  />
	  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
	  <ThemeProvider theme={theme}>
	    <App />
	  </ThemeProvider>,
    </ApolloProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
