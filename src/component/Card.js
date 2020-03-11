import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Draggable } from 'react-beautiful-dnd';
import { UPDATE_ISSUE_PRIORITY } from '../queries/Issue';

function Card({ item, index }) {
	const [ updatePriority, { updatePriorityPending } ] = useMutation(UPDATE_ISSUE_PRIORITY);

	useEffect(
		() => {
			async function saveData() {
				try {
					console.log('SAVING PRIORITY');
					const response = await updatePriority({ variables: { issueId: item.id, newPriority: index } });
					console.log(response);
					//TODO: SAVE NEW PRIORITY TO CACHE
				} catch (err) {
					console.log(err);
				}
			}
			if (item.priority !== index) {
				//saveData();
			}
		},
		[ item ]
	);

	return (
		<Draggable key={item.id} draggableId={item.id} index={index}>
			{(provided, snapshot) => {
				return (
					<div
						className={`text-muted pt-1 ${snapshot.isDragging ? 'border-dark' : ''}`}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={{
							...provided.draggableProps.style,
							backgroundColor: snapshot.isDragging ? 'gainsboro' : ''
						}}
					>
						<p className="pb-3 m-2 small lh-125 border-bottom border-gray">
							<strong className="d-block mb-1 text-gray-dark">
								{item.title}
								{item.category} - {index}
							</strong>
							{item.desc}
						</p>
					</div>
				);
			}}
		</Draggable>
	);
}

export default Card;
