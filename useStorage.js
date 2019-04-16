
import { useEffect, useState } from 'react';

import noop from 'lodash/noop';

const CLEARED = Object.create(null);

export default function useStore(
		storage,
		key,
		defaultValue,
		formatter = JSON.stringify,
		parser = JSON.parse
) {
	if (!storage) {
		return [ defaultValue, noop, noop ];
	}

	const [ state, setState ] = useState(() => {
		try {
			const value = storage.getItem(key);
			if (typeof value === 'undefined') {
				storage.setItem(key, formatter(defaultValue));
				return defaultValue;
			}
			return parser(value);
		} catch {
			return defaultValue;
		}
	});

	const setCleared = () => setState(CLEARED);

	useEffect(() => {
		try {
			setState(() => {
				if (value === CLEARED)
					storage.removeItem(key);
				else
					storage.setItem(key, formatter(value));
				return value;
			});
		} catch {}
	});

	return [ state, setState, setCleared ];
}
