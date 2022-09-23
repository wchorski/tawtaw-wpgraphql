import { getSession } from './cart-session';
import { isEmpty } from 'lodash';

export const getApiCartConfig = () => {
	
	const config = {
		headers: {
      'Content-Type': 'application/json',
			'X-Headless-CMS': true,
		},
	}
	
	const storedSession = getSession();
	
	if ( !isEmpty( storedSession ) ) {
		config.headers['x-wc-session'] = storedSession;
	}
	
	return config;
}