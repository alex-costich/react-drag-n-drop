import { closestCenter, DndContext } from '@dnd-kit/core';
import {
	restrictToParentElement,
	restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useRef, useState } from 'react';
import { USERS } from '../../data/data';
import { User } from './User';

const UserList = () => {
	const [users, setUsers] = useState(USERS);
	const [inputValue, setInputValue] = useState('');

	const svgRefs = useRef([]); // Create an array of refs for user's drag handle SVGs

	const addUser = () => {
		if (inputValue) {
			const newUser = {
				id: users.length + 1,
				name: inputValue,
			};
			setInputValue('');
			setUsers(users => [...users, newUser]);
		}
	};

	const onDragEnd = e => {
		const { active, over } = e;
		if (over && active.id !== over.id) {
			setUsers(users => {
				const oldIndex = users.findIndex(user => user.id === active.id);
				const newIndex = users.findIndex(user => user.id === over.id);
				return arrayMove(users, oldIndex, newIndex);
			});
			// Blur the SVG when the drag ends (blur means take focus away)
			svgRefs.current.forEach(ref => ref.blur());
		} else {
			// If it didn't move, take the focus away anyways
			svgRefs.current.forEach(ref => ref.blur());
		}
		/*
        The two blurs ensure focus only remains while there is INTERACTION with
        the SVG, if these weren't present, there would be issues with focus.
        */
	};

	return (
		<div className='select-none pb-5 bg-slate-300 text-slate-800 w-max text-center'>
			<div className='z-50 shadow-md flex gap-2 p-2 max-w-max h-min justify-center'>
				<span className='select-text p-1 flex items-center bg-white font-semibold'>
					Total: {users.length}
				</span>
				<div className='flex gap-2'>
					<input
						placeholder='Type username...'
						type='text'
						className='p-1 focus:outline-dashed outline-slate-500'
						value={inputValue}
						onKeyDown={e => e.key === 'Enter' && addUser()}
						onChange={e => setInputValue(e.target.value)}
					/>
					<button
						className='px-1 hover:bg-cyan-700 font-semibold text-white transition bg-cyan-800 rounded-sm w-max shadow-md'
						onClick={addUser}
					>
						Add user
					</button>
				</div>
			</div>
			<DndContext
				modifiers={[restrictToParentElement, restrictToVerticalAxis]}
				collisionDetection={closestCenter}
				onDragEnd={onDragEnd}
				autoScroll={true}
			>
				<div className='p-1 h-40 overflow-y-auto grid text-left gap-1'>
					<SortableContext items={users} strategy={verticalListSortingStrategy}>
						{users.map((user, index) => (
							<User
								key={user.id}
								user={user}
								svgRef={element => (svgRefs.current[index] = element)}
							/>
						))}
					</SortableContext>
				</div>
			</DndContext>
		</div>
	);
};

export default UserList;
