import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Draggable } from 'react-beautiful-dnd';
import { UPDATE_ISSUE_PRIORITY } from '../queries/Issue';
import { usePrevious } from '../util/customHooks';

function Card({ item, index }) {
	const prevIssue = usePrevious(item);

	const [ updatePriority, { updatePriorityLoading } ] = useMutation(UPDATE_ISSUE_PRIORITY);

	useEffect(
		() => {
			async function saveData() {
				try {
					const response = await updatePriority({ variables: { issueId: item.id, newPriority: index } });
					console.log(response);
					//TODO: SAVE NEW PRIORITY TO CHACHE
				} catch (err) {
					console.log(err);
				}
			}
			if (prevIssue) {
				const oldPriority = prevIssue.priority;
				const newPriority = item.priority;
				console.log(oldPriority, newPriority);
				saveData();
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
