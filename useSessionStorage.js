
import useStorage from './useStorage';

export default function useSessionStorage(key, defaultValue, formatter, parser) {
	return typeof window === 'undefined'
		? useStorage(undefined, key, defaultValue, formatter, parser)
		: useStorage(window.sessionStorage, key, defaultValue, formatter, parser);
}
