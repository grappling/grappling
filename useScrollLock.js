
import { useContext, useEffect, useMemo } from 'react';

import GrapplingContext from './context';

export default function useScrollLock(locked = true, element = document.body) {
	const { scrollLocks } = useContext(GrapplingContext);
	useEffect(() => {
		if (locked) {
			const locks = scrollLocks.get(element) || {
				overflow: window.getComputedStyle(element),
				count: 0
			};
			locks.count++;
			scrollLocks.set(element, locks);
			element.style.overflow = 'hidden';
		}
		else if (scrollLocks.has(element)) {
			const locks = scrollLocks.get(element);
			locks.count--;
			if (locks.count === 0) {
				scrollLocks.delete(element);
				element.style.overflow = locks.overflow;
			}
			else {
				scrollLocks.set(element, locks);
			}
		}
	}, [locked]);
	return locked || scrollLocks.has(element);
}
