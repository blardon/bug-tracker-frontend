import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Card({ item, index }) {
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
