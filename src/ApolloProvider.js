import React from 'react';
import App from './App';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql'
});

const authLink = new ApolloLink((operation, forward) => {
	const token = '';
	operation.setContext({
		headers: {
			authorization: 'bearer'
		}
	});
	return forward(operation);
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
