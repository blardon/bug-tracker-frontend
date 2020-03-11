import React, { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DragDropContext } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Column from './Column';

import { AuthContext } from '../context/Auth';
import { GET_PROJECT_BY_ID } from '../queries/Project';

const onDragEnd = (result, categories, setCategories) => {
	if (!result.destination) return;
	const { source, destination } = result;

	// DIFFERENT categories
	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = categories[source.droppableId];
		const destColumn = categories[destination.droppableId];
		const sourceIssues = [ ...sourceColumn.issues ];
		const destIssues = [ ...destColumn.issues ];
		const [ removed ] = sourceIssues.splice(source.index, 1);
		removed.category = destColumn.category;
		destIssues.splice(destination.index, 0, removed);
		setCategories({
			...categories,
			[source.droppableId]: {
				...sourceColumn,
				issues: sourceIssues
			},
			[destination.droppableId]: {
				...destColumn,
				issues: destIssues
			}
		});
		// SAME COLUMNS
	} else {
		const category = categories[source.droppableId];
		const copiedIssues = [ ...category.issues ];
		const [ removed ] = copiedIssues.splice(source.index, 1);
		copiedIssues.splice(destination.index, 0, removed);
		setCategories({
			...categories,
			[source.droppableId]: {
				...category,
				issues: copiedIssues
			}
		});
	}
};

function Board(props) {
	const projectId = props.match.params.projectId;
	const { user } = useContext(AuthContext);
	const [ categories, setCategories ] = useState({});

	const { data: project, loading } = useQuery(GET_PROJECT_BY_ID, { variables: { id: projectId } });

	useEffect(
		() => {
			if (project) {
				const categoriesFromBackend = {};
				project.project.categories.map((category) => {
					categoriesFromBackend[category.id] = {
						id: category.id,
						title: category.title,
						issues: category.issues
					};
				});
				setCategories(categoriesFromBackend);
			}
		},
		[ project ]
	);

	//if (!user){
	//	return <div>not logged in</div>
	//}
	if (!project || loading) {
		return <div>Loading project...</div>;
	}

	return (
		<div className="d-flex">
			<DragDropContext onDragEnd={(result) => onDragEnd(result, categories, setCategories)}>
				{Object.entries(categories).map(([ categoryId, category ], index) => {
					return (
						<Column key={categoryId} projectId={projectId} category={category} categoryId={categoryId} />
					);
				})}
			</DragDropContext>
		</div>
	);
}

export default Board;
