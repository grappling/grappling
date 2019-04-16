
import { useContext } from 'react';

import noop from 'lodash/noop';

export default function useI18n(Context, loader = noop) {
	const { locale, locales, setLocale } = useContext(Context);
	const loadLocale = (newLocale = 'en') => {
		loader(newLocale)
			.then(result => {
				LOCALES[newLocale] = result.default;
				setLocale(newLocale);
				return result;
			});
	};
	return [ locales[locale], loadLocale ];
}
