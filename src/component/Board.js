import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Column from './Column';

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


// style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
function Board() {
	const [ columns, setColumns ] = useState(columnsFromBackend);
	return (
		<div className="d-flex" >
			<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
				{Object.entries(columns).map(([ columnId, column ], index) => {
					return <Column key={columnId} column={column} columnId={columnId} />;
				})}
			</DragDropContext>
		</div>
	);
}

export default Board;
