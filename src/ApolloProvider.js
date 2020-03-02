import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
