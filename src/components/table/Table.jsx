const Table = () => {
	return (
		<div>
			<table className='w-full flex flex-col'>
				<tr className='flex text-left divide-x-4 divide-slate-700 w-full py-2 bg-slate-400 text-slate-800 rounded-md'>
					<th className='w-1/12 overflow-x-auto'>ID</th>
					<th className='w-2/12 overflow-x-auto'>Nombre</th>
					<th className='w-4/12 overflow-x-auto'>Descripción</th>
					<th className='w-2/12 overflow-x-auto'>Tipo</th>
					<th className='w-3/12 overflow-x-auto'>Relación</th>
				</tr>
				<tr className='flex w-full py-2 divide-x-4'>
					<td className='w-1/12 overflow-x-auto'>9832</td>
					<td className='w-2/12 overflow-x-auto'>Access Token</td>
					<td className='w-4/12 overflow-x-auto'>Security Token</td>
					<td className='w-2/12 overflow-x-auto'>Char</td>
					<td className='w-3/12 overflow-x-auto'>Sin relación</td>
				</tr>
			</table>
		</div>
	);
};

export default Table;
