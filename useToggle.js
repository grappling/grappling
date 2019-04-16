
import { useState } from 'react';

import isFunction from 'lodash/isFunction';

export default function useToggle(initialState = false) {
	const [ state, setState ] = useState(initialState);
	if (typeof state !== 'boolean') {
		throw new Error('Initial state must be/return a boolean');
	}
	const setToggle = (newState) => {
		if (typeof newState === 'boolean') {
			return setState(newState);
		}
		if (typeof newState === 'undefined') {
			return setState(!state);
		}
		if (isFunction(newState)) {
			const updatedState = newState(state);
			return setToggle(updatedState);
		}
		throw new Error('State must be a boolean or an updater function');
	};
	return [ state, setToggle ];
}
