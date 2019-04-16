
import useStorage from './useStorage';

export default function useLocalStorage(key, defaultValue, formatter, parser) {
	return typeof window === 'undefined'
		? useStorage(undefined, key, defaultValue, formatter, parser)
		: useStorage(window.localStorage, key, defaultValue, formatter, parser);
}
