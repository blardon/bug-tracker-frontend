import gql from 'graphql-tag';

export const ME = gql`
	query me {
		me {
			id
			username
			email
			createdAt
		}
	}
`;

export const REGISTER_USER = gql`
	mutation createUser($email: String!, $username: String!, $password: String!) {
		createUser(email: $email, username: $username, password: $password) {
			user {
				id
				username
				email
				createdAt
			}
			token
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			user {
				id
				username
				email
				createdAt
				projects {
					id
					title
					desc
					types
				}
			}
			token
		}
	}
`;
