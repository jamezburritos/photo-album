import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login')
	}

	locals.account.deleteSession('current')
	locals.user = undefined

	throw redirect(303, '/login')
}
