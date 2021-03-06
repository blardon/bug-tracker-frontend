import React from 'react';
import App from './App';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { getAccessToken } from './accessToken';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include'
});

const authLink = new ApolloLink((operation, forward) => {
	const token = getAccessToken();
	operation.setContext({
		headers: {
			authorization: `bearer ${token}`
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
