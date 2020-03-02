import gql from 'graphql-tag';

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

