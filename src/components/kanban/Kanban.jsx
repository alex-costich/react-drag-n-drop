import {
	closestCorners,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from './Container';
import Item from './Item';

const Kanban = () => {
	const [containers, setContainers] = useState([]);
	const [activeId, setActiveId] = useState(undefined);
	const [currentContainerId, setCurrentContainerId] = useState();
	const [containerName, setContainerName] = useState('');
	const [itemName, setItemName] = useState('');
	const [showAddContainerModal, setShowAddContainerModal] = useState(false);
	const [showAddItemModal, setShowAddItemModal] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const onAddContainer = () => {
		if (!containerName) return;
		const id = `container-${uuidv4()}`;
		setContainers([
			...containers,
			{
				id,
				title: containerName,
				items: [],
			},
		]);
		setContainerName('');
		setShowAddContainerModal(false);
	};

	const onAddItem = () => {
		if (!itemName) return;
		const id = `item-${uuidv4()}`;
		const container = containers.find(item => item.id === currentContainerId);
		if (!container) return;
		container.items.push({ id, title: itemName });
		setContainers([...containers]);
		setItemName('');
		setShowAddItemModal(false);
	};

	const findValueOfItems = (id, type) => {
		if (type === 'container') {
			return containers.find(container => container.id === id);
		}
		if (type === 'item') {
			return containers.find(container =>
				container.items.find(item => item.id === id),
			);
		}
	};

	const findItemTitle = id => {
		const container = findValueOfItems(id, 'item');
		if (!container) return '';
		const item = container.items.find(item => item.id === id);
		if (!item) return '';
		return item.title;
	};

	const findContainerTitle = id => {
		const container = containers.find(item => item.id === id);
		if (!container) return '';
		return container.title;
	};

	const findContainerItems = id => {
		const container = containers.find(item => item.id === id);
		if (!container) return [];
		return container.items;
	};

	const handleDragStart = e => {
		const { active } = e;
		const { id } = active;
		setActiveId(id);
	};

	const handleDragMove = e => {
		const { active, over } = e;

		// Handle item sorting
		if (
			active.id.toString().includes('item') &&
			over?.id.toString().includes('item') &&
			active &&
			over &&
			active.id !== over.id
		) {
			// Find the active and over containers
			const activeContainer = findValueOfItems(active.id, 'item');
			const overContainer = findValueOfItems(over.id, 'item');

			// If active or over containers are undefined, return
			if (!activeContainer || !overContainer) return;

			// Find active and over container index
			const activeContainerIndex = containers.findIndex(
				container => container.id === activeContainer.id,
			);
			const overContainerIndex = containers.findIndex(
				container => container.id === overContainer.id,
			);

			// Find index of active and over item
			const activeItemIndex = activeContainer.items.findIndex(
				item => item.id === active.id,
			);
			const overItemIndex = overContainer.items.findIndex(
				item => item.id === over.id,
			);

			// Dragging in the same container
			if (activeContainerIndex === overContainerIndex) {
				let newItems = [...containers];
				newItems[activeContainerIndex].items = arrayMove(
					newItems[activeContainerIndex].items,
					activeItemIndex,
					overItemIndex,
				);

				setContainers(newItems);
			} else {
				// Dragging in a different container
				let newItems = [...containers];
				const [removedItem] = newItems[activeContainerIndex].items.splice(
					activeItemIndex,
					1,
				);
				newItems[overContainerIndex].items.splice(
					overItemIndex,
					0,
					removedItem,
				);
				setContainers(newItems);
			}
		}

		// Handling item drop into a container
		if (
			active.id.toString().includes('item') &&
			over?.id.toString().includes('container') &&
			active &&
			over &&
			active.id !== over.id
		) {
			// Find active and over container
			const activeContainer = findValueOfItems(active.id, 'item');
			const overContainer = findValueOfItems(over.id, 'container');

			// If the active or over container is undefined, return
			if (!activeContainer || !overContainer) return;

			// Find index of active and over container
			const activeContainerIndex = containers.findIndex(
				container => container.id === activeContainer.id,
			);
			const overContainerIndex = containers.findIndex(
				container => container.id === overContainer.id,
			);

			// Find the index of active item in active container
			const activeItemIndex = activeContainer.items.findIndex(
				item => item.id === active.id,
			);

			// Remove active item from active container and add to over container
			let newItems = [...containers];
			const [removedItem] = newItems[activeContainerIndex].items.splice(
				activeItemIndex,
				1,
			);
			newItems[overContainerIndex].items.push(removedItem);

			setContainers(newItems);
		}
	};

	const handleDragEnd = e => {
		const { active, over } = e;

		// Handle container sorting
		if (
			active.id.toString().includes('container') &&
			over?.id.toString().includes('container') &&
			active &&
			over &&
			active.id !== over.id
		) {
			const activeContainerIndex = containers.findIndex(
				container => container.id === active.id,
			);
			const overContainerIndex = containers.findIndex(
				container => container.id === over.id,
			);

			// Swap active and over container
			let newItems = [...containers];
			newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);

			setContainers(newItems);
		}

		// Handle item sorting
		if (
			active.id.toString().includes('item') &&
			over?.id.toString().includes('item') &&
			active &&
			over &&
			active.id !== over.id
		) {
			// Find active and over containers
			const activeContainer = findValueOfItems(active.id, 'item');
			const overContainer = findValueOfItems(over.id, 'item');

			// If the active or over container is undefined, return
			if (!activeContainer || !overContainer) return;

			// Find active and over container indexes
			const activeContainerIndex = containers.findIndex(
				container => container.id === activeContainer.id,
			);
			const overContainerIndex = containers.findIndex(
				container => container.id === overContainer.id,
			);

			// Find active and over item indexes
			const activeItemIndex = activeContainer.findIndex(
				item => item.id === active.id,
			);
			const overItemIndex = overContainer.findIndex(
				item => item.id === over.id,
			);

			// In the same container
			if (activeContainerIndex === overContainerIndex) {
				let newItems = [...containers];
				newItems[activeContainerIndex].items = arrayMove(
					newItems[activeContainerIndex].items,
					activeItemIndex,
					overItemIndex,
				);

				setContainers(newItems);
			} else {
				// In different container
				let newItems = [...containers];
				const [removedItem] = newItems[activeContainerIndex].items.splice(
					activeItemIndex,
					1,
				);
				newItems[overContainerIndex].items.splice(
					overItemIndex,
					0,
					removedItem,
				);
				setContainers(newItems);
			}

			// Handling item drop into a container
			if (
				active.id.toString().includes('item') &&
				over?.id.toString().includes('container') &&
				active &&
				over &&
				active.id !== over.id
			) {
				const activeContainer = findValueOfItems(active.id, 'item');
				const overContainer = findValueOfItems(over.id, 'container');

				// If the active or over container is undefined, return
				if (!activeContainer || !overContainer) return;

				// Find active and over container indexes
				const activeContainerIndex = containers.findIndex(
					container => container.id === activeContainer.id,
				);
				const overContainerIndex = containers.findIndex(
					container => container.id === overContainer.id,
				);

				// Find the index of the active item in the active container
				const activeItemIndex = activeContainer.items.findIndex(
					item => item.id === active.id,
				);

				let newItems = [...containers];
				const [removedItem] = newItems[activeContainerIndex].items.splice(
					activeItemIndex,
					1,
				);

				newItems[overContainerIndex].items.push(removedItem);
				setContainers(newItems);
			}
			setActiveId(null);
		}
	};

	return (
		<>
			{showAddItemModal && (
				<div className='fixed flex items-center justify-center backdrop-blur-sm -m-4 z-50 size-full'>
					<div className='flex flex-col gap-y-2 items-center bg-cyan-950 shadow-md py-2 px-4 rounded-sm'>
						<input
							type='text'
							placeholder='Write new item title...'
							name='itemname'
							value={itemName}
							className='shadow-md text-slate-800 focus:outline-none bg-slate-200 rounded-sm py-1 px-2'
							onChange={e => setItemName(e.target.value)}
						/>
						<button
							className='bg-cyan-800 hover:bg-cyan-700 transition-colors font-semibold rounded-md px-2 py-1 text-white w-max'
							onClick={onAddItem}
						>
							Add item
						</button>
					</div>
				</div>
			)}
			{showAddContainerModal && (
				<div className='fixed flex items-center justify-center backdrop-blur-sm -m-4 z-50 size-full'>
					<div className='flex flex-col gap-y-2 items-center bg-cyan-950 shadow-md py-2 px-4 rounded-sm'>
						<input
							type='text'
							placeholder='Write new container title...'
							name='itemname'
							value={containerName}
							className='shadow-md text-slate-800 focus:outline-none bg-slate-200 rounded-sm py-1 px-2'
							onChange={e => setContainerName(e.target.value)}
						/>
						<button
							className='bg-cyan-800 hover:bg-cyan-700 transition-colors font-semibold rounded-md px-2 py-1 text-white w-max'
							onClick={onAddContainer}
						>
							Add item
						</button>
					</div>
				</div>
			)}
			<div className='mx-auto py-10 select-none'>
				<div className='flex items-center justify-between gap-y-2'>
					<h1 className='text-gray-800 text-3xl font-bold'>Kanban board</h1>
					<button
						onClick={() => setShowAddContainerModal(true)}
						className='bg-black px-2 py-1 font-semibold rounded-md text-white'
					>
						Add container
					</button>
				</div>
				<div className='mt-10'>
					<div className='grid grid-cols-3 gap-6'>
						<DndContext
							sensors={sensors}
							collisionDetection={closestCorners}
							onDragStart={handleDragStart}
							onDragMove={handleDragMove}
							onDragEnd={handleDragEnd}
						>
							<SortableContext items={containers.map(i => i.id)}>
								{containers.map(container => (
									<Container
										key={container.id}
										id={container.id}
										title={container.title}
										onAddItem={() => {
											setShowAddItemModal(true);
											setCurrentContainerId(container.id);
										}}
									>
										<SortableContext items={container.items.map(i => i.id)}>
											<div className='flex items-start flex-col gap-y-4'>
												{container.items.map(item => (
													<Item key={item.id} id={item.id} title={item.title} />
												))}
											</div>
										</SortableContext>
									</Container>
								))}
							</SortableContext>
							<DragOverlay>
								{activeId && activeId.toString().includes('item') && (
									<Item id={activeId} title={findItemTitle(activeId)} />
								)}
								{activeId && activeId.toString().includes('container') && (
									<Container id={activeId} title={findContainerTitle(activeId)}>
										{findContainerItems(activeId).map(i => (
											<Item key={i.id} id={i.id} title={i.title} />
										))}
									</Container>
								)}
							</DragOverlay>
						</DndContext>
					</div>
				</div>
			</div>
		</>
	);
};

export default Kanban;
