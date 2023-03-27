import { type Actions, redirect } from '@sveltejs/kit'

export const actions: Actions = {
	login: ({ locals, url }) => {
		const redirectUrl = locals.account.createOAuth2Session(
			url.searchParams.get('provider') || '',
			`${url.origin}/`
		)

		throw redirect(303, redirectUrl?.toString() || '')
	}
}
