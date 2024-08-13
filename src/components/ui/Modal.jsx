import { useEffect, useRef } from 'react';
import { useClickOutside } from '../../custom hooks/useClickOutside';

const Modal = ({
	name,
	isShown,
	setIsShown,
	inputValue,
	onInputChange,
	onButtonClick,
}) => {
	const handleClickOutside = () => {
		setIsShown(false);
	};

	const domNode = useClickOutside(handleClickOutside);
	const inputRef = useRef(null);

	useEffect(() => {
		if (isShown) {
			inputRef.current?.focus(); // Focus input when modal is shown

			const handleKeyDown = e => {
				if (e.key === 'Escape') {
					setIsShown(false); // Close modal on Escape key press
				}
			};

			document.addEventListener('keydown', handleKeyDown);

			// Clean up event listener when modal is hidden
			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [isShown, setIsShown]);

	return (
		<>
			{isShown && (
				<div className='fixed flex items-center justify-center backdrop-blur-sm -m-4 z-50 size-full'>
					<div
						ref={domNode}
						className='flex flex-col gap-y-2 items-center bg-cyan-950 shadow-md py-2 px-4 rounded-sm'
					>
						<input
							ref={inputRef}
							type='text'
							placeholder={`Write new ${name} title...`}
							value={inputValue}
							className='shadow-md text-slate-800 focus:outline-none bg-slate-200 rounded-sm py-1 px-2'
							onChange={e => onInputChange(e.target.value)}
							onKeyDown={e => e.key === 'Enter' && onButtonClick()}
						/>
						<button
							className='bg-cyan-800 hover:bg-cyan-700 transition-colors font-semibold rounded-md px-2 py-1 text-white w-max'
							onClick={onButtonClick}
						>
							Add item
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
