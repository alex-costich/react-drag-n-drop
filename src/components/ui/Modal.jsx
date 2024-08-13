const Modal = ({ name, isShown, inputValue, onInputChange, onButtonClick }) => {
	// showAddItemModal
	return (
		<>
			{isShown && (
				<div className='fixed flex items-center justify-center backdrop-blur-sm -m-4 z-50 size-full'>
					<div className='flex flex-col gap-y-2 items-center bg-cyan-950 shadow-md py-2 px-4 rounded-sm'>
						<input
							type='text'
							placeholder={`Write new ${name} title...`}
							value={inputValue}
							className='shadow-md text-slate-800 focus:outline-none bg-slate-200 rounded-sm py-1 px-2'
							onChange={e => onInputChange(e.target.value)}
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
