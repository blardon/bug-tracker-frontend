import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { DragDropContext } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Column from './Column';

import { AuthContext } from '../context/Auth';
import { GET_PROJECT_BY_ID } from '../queries/Project';

const issuesFromBackend = [
	{
		id: uuid(),
		title: 'First task',
		category: 'todo',
		desc:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur'
	},
	{ id: uuid(), title: 'Second task', category: 'todo', desc: '' },
	{ id: uuid(), title: 'Third task', category: 'todo', desc: '' },
	{ id: uuid(), title: 'Fourth task', category: 'todo', desc: '' },
	{ id: uuid(), title: 'Fifth task', category: 'todo', desc: '' }
];

const columnsFromBackend = {
	[uuid()]: {
		name: 'To do',
		category: 'todo',
		issues: issuesFromBackend
	},
	[uuid()]: {
		name: 'In Progress',
		category: 'inprogress',
		issues: []
	},
	[uuid()]: {
		name: 'Done',
		category: 'done',
		issues: []
	}
};

const onDragEnd = (result, columns, setColumns) => {
	if (!result.destination) return;
	const { source, destination } = result;

	// DIFFERENT COLUMNS
	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const sourceIssues = [ ...sourceColumn.issues ];
		const destIssues = [ ...destColumn.issues ];
		const [ removed ] = sourceIssues.splice(source.index, 1);
		removed.category = destColumn.category;
		destIssues.splice(destination.index, 0, removed);
		setColumns({
			...columns,
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
		const column = columns[source.droppableId];
		const copiedIssues = [ ...column.issues ];
		const [ removed ] = copiedIssues.splice(source.index, 1);
		copiedIssues.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				issues: copiedIssues
			}
		});
	}
};

function Board(props) {
	const projectId = props.match.params.projectId;
	const { user } = useContext(AuthContext);
	const [ columns, setColumns ] = useState({});

	const { data: project, loading } = useQuery(GET_PROJECT_BY_ID, { variables: { id: projectId } });

	useEffect(
		() => {
			if (project) {
				const columnsFromBackend = {};
				project.project.types.map((type) => {
					columnsFromBackend[uuid()] = {
						name: type,
						category: type,
						issues: project.project.issues.filter((issue) => issue.type === type)
					};
				});
				setColumns(columnsFromBackend);
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
			<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
				{Object.entries(columns).map(([ columnId, column ], index) => {
					return <Column key={columnId} projectId={projectId} column={column} columnId={columnId} />;
				})}
			</DragDropContext>
		</div>
	);
}

export default Board;
