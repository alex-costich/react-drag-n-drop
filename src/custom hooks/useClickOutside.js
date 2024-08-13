import { useEffect, useRef } from 'react';

// Recibe una función
export const useClickOutside = handler => {
	let domNode = useRef(); // Genera una referencia al componente/nodo DOM que lo contenga

	// Observa al nodo
	useEffect(() => {
		let maybeHandler = e => {
			// Si un evento se genera, y el nodo no contiene al target del evento
			if (domNode.current && !domNode.current.contains(e.target)) {
				handler(); // Ejecuta la función
			}
		};

		document.addEventListener('mousedown', maybeHandler); // Se agrega un listener para mousedown

		// Borra el listener en caso de que el componente se desmonte
		return () => {
			document.removeEventListener('mousedown', maybeHandler);
		};
	});

	return domNode;
};
