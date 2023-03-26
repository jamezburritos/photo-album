import type { Handle } from '@sveltejs/kit';
import { Account, Client } from 'appwrite';

const PROJECT_ID = '641ef1dc8914497e30e6';

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, url, cookies } = event;

	locals.client = new Client().setEndpoint('http://localhost/v1').setProject(PROJECT_ID);

	// Pass authentication cookie to client
	locals.client.headers['X-Fallback-Cookies'] = `{ \
        "a_session_${PROJECT_ID}": "${cookies.get(`a_session_${PROJECT_ID}`)}" \
    }`;

	locals.account = new Account(event.locals.client);

	try {
		locals.user = await locals.account.get();

		// User is logged in
		// if (url.pathname === '/login') {
		//           return Response.redirect(`${url.origin}/`, 303);
		// }
	} catch {
		// User not logged in
		if (url.pathname !== '/login') {
		          return Response.redirect(`${url.origin}/login`, 303);
		}
	}

    return resolve(event);
};
