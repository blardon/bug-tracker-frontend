import gql from 'graphql-tag';

export const CREATE_PROJECT = gql`
	mutation createProject($title: String!, $desc: String!) {
		createProject(title: $title, desc: $desc) {
			id
			title
			desc
		}
	}
`;

export const GET_PROJECT_BY_ID = gql`
	query project($id: ID!) {
		project(id: $id) {
			id
			title
			desc
			issues {
				id
				title
				desc
				type
				priority
			}
			types
			createdAt
		}
	}
`;
