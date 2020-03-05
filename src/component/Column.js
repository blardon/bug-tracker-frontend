import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

function Column({ projectId, column, columnId }) {
	return (
		<div className="col my-3 m-2 p-3 bg-white rounded box-shadow" key={columnId}>
			<h6 className="border-bottom border-gray pb-2 mb-1">{column.name}</h6>
			<Droppable droppableId={columnId} key={columnId}>
				{(provided, snapshot) => {
					return (
						<div
							className=""
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{
								background: snapshot.isDraggingOver ? '#f8f9fa' : '#fff',

								minHeight: '90%'
							}}
						>
							{column.issues.map((item, index) => {
								return <Card key={index} item={item} index={index} />;
							})}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
			<button
				type="button"
				class="btn btn-secondary btn-sm btn-block mt-2"
				onClick={() => console.log(column, projectId)}
			>
				Add new issue
			</button>
		</div>
	);
}

export default Column;
