import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const User = ({ user, svgRef }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: user.id });

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className='flex shadow-sm bg-white justify-between py-1 pr-1 pl-2'
		>
			<span>{user.name}</span>
			<button>
				<svg
					ref={svgRef} // For focus control onDragEnd
					className='size-6 outline-slate-400 focus:outline-none focus:bg-slate-200 transition-color duration-300'
					{...attributes}
					{...listeners}
					viewBox='0 0 25 25'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
					<g
						id='SVGRepo_tracerCarrier'
						strokeLinecap='round'
						strokeLinejoin='round'
					></g>
					<g id='SVGRepo_iconCarrier'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z'
							fill='#121923'
						></path>
					</g>
				</svg>
			</button>
		</div>
	);
};
