
import { useEffect, useState } from 'react';

import useMounted from './useMounted';

const getDimensions = () => ({
	width: window.innerWidth,
	height: window.innerHeight
});

export default function useWindowSize({ width, height } = getDimensions()) {
	const [ state, setState ] = useState({ width, height });
	useMounted(() => {
		const resizer = () => setState(getDimensions());
		window.addEventListener('resize', resizer);
		return () => window.removeEventListener('resize', resizer);
	});
}
