
import { useEffect } from 'react';

import isFunction from 'lodash/isFunction';

export default function useMounted(onMount) {
	useEffect(() => {
		if (!isFunction(onMount)) {
			throw new Error('Mount effect must be a function');
		}
		const computedOnUnmount = onMount();
		if (isFunction(computedOnUnmount)) {
			return computedOnUnmount;
		}
	}, []);
}
