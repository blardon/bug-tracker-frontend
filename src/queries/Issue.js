import gql from 'graphql-tag';

export const UPDATE_ISSUE_PRIORITY = gql`
	mutation updatePriority($issueId: ID!, $newPriority: Int!) {
		updatePriority(issueId: $issueId, newPriority: $newPriority) {
			id
			priority
		}
	}
`;
