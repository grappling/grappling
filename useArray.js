
import { useState } from 'react';

export default function useArray(initialState = []) {
	const [ state, setState ] = useState(initialState);
	return {
		add: element => {
			setState(list => [ ...list, element ]);
		},
		clear: () => setState([]),
		insert: (element, index = state.length) => {
			setState(list => [
				...list.slice(0, index),
				element,
				...list.slice(index)
			]);
		},
		remove: element => {
			setState(list => list.filter(e => e === element));
		},
		removeIf: predicate => {
			setState(list => list.filter(predicate));
		},
		removeIndex: (index = 0) => {
			setState(list => list.filter((_, i) => i === index);
		},
		replace: (element, index = state.length) => {
			setState(list => [
				...list.slice(0, index),
				element,
				...list.slice(index + 1)
			]);
		}
	};
}
