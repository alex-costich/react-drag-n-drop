import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Container = ({ id, children, title, onAddItem }) => {
	const {
		attributes,
		listeners, // Listens to drag events
		transition,
		transform,
		isDragging,
		setNodeRef,
	} = useSortable({
		id: id,
		data: {
			type: 'container',
		},
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	return (
		<div
			{...attributes}
			style={style}
			ref={setNodeRef}
			className={`w-full h-full p-4 bg-gray-50 rounded-md flex flex-col gap-y-4 ${isDragging && 'opacity-50'}`}
		>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col gap-y-1'>
					<h1 className='text-gray-800 text-xl'>{title}</h1>
				</div>
				<button
					className='border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl'
					{...listeners}
				>
					Drag handle
				</button>
			</div>
			{children}
			<button onClick={onAddItem}>Add item</button>
		</div>
	);
};

export default Container;
