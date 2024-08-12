import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Item = ({ id, title }) => {
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
			type: 'item',
		},
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	console.log(transform);

	return (
		<div
			style={style}
			{...attributes}
			ref={setNodeRef}
			className={`px-2 py-4 bg-white shadow-md rounded-md w-full border border-transparent hover:border-cyan-300 ${isDragging && 'opacity-50'}`}
		>
			<div className='flex items-center justify-between'>
				{title}
				<button
					{...listeners}
					className='border p-2 text-xs rounded-mdy shadow-lg hover:shadow-xl'
				>
					Drag handle
				</button>
			</div>
		</div>
	);
};

export default Item;
