import React, { useState } from 'react';
import {
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	IconButton,
	ListItemSecondaryAction,
} from '@material-ui/core';
import RootRef from '@material-ui/core/RootRef';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InboxIcon from '@material-ui/icons/Inbox';
import EditIcon from '@material-ui/icons/Edit';

const data = require('../../dataset/ps1list_2020.json');
data.splice(0, 100);

// fake data generator
const getItems = (count) =>
	Array.from({ length: count }, (v, k) => k).map((k) => ({
		id: `item-${k}`,
		primary: `item ${k}`,
		secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
	// styles we need to apply on draggables
	...draggableStyle,

	...(isDragging && {
		background: 'rgb(39,39,39)',
	}),
});

const getListStyle = (isDraggingOver) => ({
	//background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const Column = () => {
	const [items, setItems] = useState(data);

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const newItems = reorder(
			items,
			result.source.index,
			result.destination.index
		);

		setItems(newItems);
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<RootRef rootRef={provided.innerRef}>
						<List style={getListStyle(snapshot.isDraggingOver)}>
							{items.map((item, index) => (
								<Draggable
									key={item['Station ID']}
									draggableId={item['Station ID']}
									index={index}
								>
									{(provided, snapshot) => (
										<ListItem
											ContainerComponent="li"
											ContainerProps={{
												ref: provided.innerRef,
											}}
											{...provided.draggableProps}
											style={getItemStyle(
												snapshot.isDragging,
												provided.draggableProps.style
											)}
										>
											<ListItemIcon
												{...provided.dragHandleProps}
											>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText
												primary={item['Company Name']}
												secondary={item['Location']}
											/>
											<ListItemSecondaryAction>
												<IconButton>
													<EditIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</List>
					</RootRef>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Column;
