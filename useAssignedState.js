
import { useState } from 'react';

import assign from 'lodash/assign';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';

export default function useAssignedState(initialState = {}) {
	const [ state, setState ] = useState(initialState);
	if (!isPlainObject(state)) {
		throw new Error('Initial state must be/return an object');
	}
	const setAssignedState = (newState) => {
		if (isPlainObject(newState)) {
			const updatedState = assign({}, state, newState);
			return setState(updatedState);
		}
		if (isFunction(newState)) {
			const updatedState = newState(state);
			return setAssignedState(updatedState);
		}
		throw new Error('State must be an object or an updater function');
	};
	return [ state, setAssignedState ];
}
